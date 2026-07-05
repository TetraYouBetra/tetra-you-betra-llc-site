import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ScrollViewport from './ScrollViewport';
import ExplorerTree from './ExplorerTree';
import {
  explorerDrive,
  type ExplorerDirectory,
  type ExplorerDocument,
  type ExplorerNode,
  type ExplorerViewMode,
} from '../explorerDrive';
import { sunken, win95 } from '../theme/win95Theme';
import IconViewport, {
  type IconPosition,
  type IconViewportItem,
} from './IconViewport';

type ExplorerProps = {
  initialPath?: string;
};

function normalizePath(path: string) {
  const cleaned = path.trim().replaceAll('\\', '/');
  const withoutDrive = cleaned.replace(/^C:\/?/i, '');

  if (!withoutDrive || withoutDrive === '/') return [];

  return withoutDrive
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean);
}

function pathToString(parts: string[]) {
  return `C:\\${parts.join('\\')}`;
}

function pathId(parts: string[]) {
  return parts.length ? parts.join('/') : 'root';
}

function getNodeAtPath(parts: string[]): ExplorerNode | null {
  let current: ExplorerNode = explorerDrive;

  for (const part of parts) {
    if (current.type !== 'directory') return null;

    const next: ExplorerNode = current.children[part];
    if (!next) return null;

    current = next;
  }

  return current;
}

function isDirectory(node: ExplorerNode | null): node is ExplorerDirectory {
  return node?.type === 'directory';
}

function isDocument(node: ExplorerNode | null): node is ExplorerDocument {
  return node?.type === 'document';
}

function getExpandedForPath(parts: string[]) {
  const expanded: Record<string, boolean> = {
    root: true,
  };

  for (let index = 1; index <= parts.length; index += 1) {
    expanded[pathId(parts.slice(0, index))] = true;
  }

  return expanded;
}

export default function Explorer({ initialPath = '/' }: ExplorerProps) {
  const initialParts = React.useMemo(
    () => normalizePath(initialPath),
    [initialPath]
  );

  const [selectedPath, setSelectedPath] = React.useState(initialParts);
  const [addressValue, setAddressValue] = React.useState(
    pathToString(initialParts)
  );
  const [history, setHistory] = React.useState<string[][]>([initialParts]);
  const [historyIndex, setHistoryIndex] = React.useState(0);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>(() =>
    getExpandedForPath(initialParts)
  );
  const [viewOverrides, setViewOverrides] = React.useState<
    Record<string, ExplorerViewMode>
  >({});
  const [rightPaneActiveId, setRightPaneActiveId] = React.useState<
    string | null
  >(null);
  const [iconPositionsByPath, setIconPositionsByPath] = React.useState<
    Record<string, Record<string, IconPosition>>
  >({});

  const selectedNode = getNodeAtPath(selectedPath);
  const selectedPathKey = pathId(selectedPath);

  const currentView: ExplorerViewMode = isDirectory(selectedNode)
    ? (viewOverrides[selectedPathKey] ?? selectedNode.defaultView ?? 'list')
    : 'list';

  const currentIconPositions = iconPositionsByPath[selectedPathKey] ?? {};

  const setCurrentIconPositions: React.Dispatch<
    React.SetStateAction<Record<string, IconPosition>>
  > = React.useCallback(
    (nextPositions) => {
      setIconPositionsByPath((current) => {
        const currentForPath = current[selectedPathKey] ?? {};
        const resolvedPositions =
          typeof nextPositions === 'function'
            ? nextPositions(currentForPath)
            : nextPositions;

        return {
          ...current,
          [selectedPathKey]: resolvedPositions,
        };
      });
    },
    [selectedPathKey]
  );

  const navigateToPath = React.useCallback(
    (nextParts: string[], replaceHistory = false) => {
      setSelectedPath(nextParts);
      setAddressValue(pathToString(nextParts));
      setRightPaneActiveId(null);

      setExpanded((current) => ({
        ...current,
        ...getExpandedForPath(nextParts),
      }));

      if (replaceHistory) return;

      setHistory((current) => {
        const sliced = current.slice(0, historyIndex + 1);
        return [...sliced, nextParts];
      });

      setHistoryIndex((current) => current + 1);
    },
    [historyIndex]
  );

  const goBack = () => {
    if (historyIndex <= 0) return;

    const nextIndex = historyIndex - 1;
    const nextPath = history[nextIndex];

    setHistoryIndex(nextIndex);
    navigateToPath(nextPath, true);
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;
    const nextPath = history[nextIndex];

    setHistoryIndex(nextIndex);
    navigateToPath(nextPath, true);
  };

  const goUp = () => {
    if (selectedPath.length === 0) return;
    navigateToPath(selectedPath.slice(0, -1));
  };

  const submitAddress = (event: React.FormEvent) => {
    event.preventDefault();

    const nextParts = normalizePath(addressValue);
    const nextNode = getNodeAtPath(nextParts);

    if (!nextNode) return;

    navigateToPath(nextParts);
  };

  const handleSelectPath = (path: string[]) => {
    navigateToPath(path);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          backgroundColor: win95.face,
        }}
      >
        <IconButton
          size="small"
          disabled={historyIndex <= 0}
          onClick={goBack}
          sx={{ width: 24, height: 24 }}
        >
          ◄
        </IconButton>

        <IconButton
          size="small"
          disabled={historyIndex >= history.length - 1}
          onClick={goForward}
          sx={{ width: 24, height: 24 }}
        >
          ►
        </IconButton>

        <IconButton
          size="small"
          disabled={selectedPath.length === 0}
          onClick={goUp}
          sx={{ width: 24, height: 24 }}
        >
          ▲
        </IconButton>

        <Typography sx={{ fontSize: 12, ml: 1 }}>Address</Typography>

        <Box
          component="form"
          onSubmit={submitAddress}
          sx={{ flex: 1, minWidth: 0 }}
        >
          <TextField
            hiddenLabel
            fullWidth
            value={addressValue}
            onChange={(event) => setAddressValue(event.target.value)}
            size="small"
          />
        </Box>

        <Typography sx={{ fontSize: 12, ml: 1 }}>View</Typography>

        <Select
          size="small"
          value={currentView}
          disabled={!isDirectory(selectedNode)}
          onChange={(event) => {
            setViewOverrides((current) => ({
              ...current,
              [selectedPathKey]: event.target.value as ExplorerViewMode,
            }));
          }}
          sx={{
            width: 82,
            height: 26,
            fontSize: 12,
          }}
        >
          <MenuItem value="list">List</MenuItem>
          <MenuItem value="icon">Icon</MenuItem>
        </Select>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '4px',
          minHeight: { xs: 500, sm: 420 },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 260 },
            height: { xs: 190, sm: 420 },
            minWidth: 0,
          }}
        >
          <ScrollViewport>
            <ExplorerTree
              drive={explorerDrive}
              selectedPath={selectedPath}
              expanded={expanded}
              onSelectPath={handleSelectPath}
              onToggle={(id) =>
                setExpanded((current) => ({
                  ...current,
                  [id]: !current[id],
                }))
              }
            />
          </ScrollViewport>
        </Box>

        <Box sx={{ flex: 1, height: { xs: 320, sm: 420 }, minWidth: 0 }}>
          <ScrollViewport>
            <Box
              sx={{
                p: 2,
                height: '100%',
                minHeight: 0,
                boxSizing: 'border-box',
              }}
            >
              {!selectedNode ? (
                <EmptyExplorerMessage message="Path not found." />
              ) : isDocument(selectedNode) ? (
                <DocumentPreview document={selectedNode} />
              ) : (
                <DirectoryPreview
                  directory={selectedNode}
                  path={selectedPath}
                  view={currentView}
                  onOpenPath={navigateToPath}
                  activeId={rightPaneActiveId}
                  onActiveChange={setRightPaneActiveId}
                  iconPositions={currentIconPositions}
                  onIconPositionsChange={setCurrentIconPositions}
                />
              )}
            </Box>
          </ScrollViewport>
        </Box>
      </Box>

      <Box
        sx={{
          px: 1,
          py: '2px',
          boxShadow: sunken,
          backgroundColor: win95.face,
          fontSize: 12,
        }}
      >
        {isDirectory(selectedNode)
          ? `${Object.keys(selectedNode.children).length} object(s)`
          : isDocument(selectedNode)
            ? '1 document selected'
            : 'Invalid path'}
      </Box>
    </Box>
  );
}

function DirectoryPreview({
  directory,
  path,
  view,
  onOpenPath,
  activeId,
  onActiveChange,
  iconPositions,
  onIconPositionsChange,
}: {
  directory: ExplorerDirectory;
  path: string[];
  view: ExplorerViewMode;
  onOpenPath: (path: string[]) => void;
  activeId: string | null;
  onActiveChange: (id: string | null) => void;
  iconPositions: Record<string, IconPosition>;
  onIconPositionsChange: React.Dispatch<
    React.SetStateAction<Record<string, IconPosition>>
  >;
}) {
  const entries = React.useMemo(
    () => Object.entries(directory.children),
    [directory.children]
  );

  const iconItems = React.useMemo<IconViewportItem[]>(
    () =>
      entries.map(([name, node]) => ({
        id: name,
        label: node.title,
        icon: node.icon,
      })),
    [entries]
  );

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          mb: 2,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={directory.activeIcon}
          alt=""
          sx={{ width: 32, height: 32, imageRendering: 'pixelated' }}
        />

        <Box>
          <Typography variant="h5">{directory.title}</Typography>
          {directory.summary && (
            <Typography variant="body2" sx={{ color: win95.disabledText }}>
              {directory.summary}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: win95.white,
          p: view === 'list' ? 1 : 0,
          flex: 1,
          minHeight: 180,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {entries.length === 0 ? (
          <Typography sx={{ color: win95.disabledText, p: 1 }}>
            This folder is empty.
          </Typography>
        ) : view === 'icon' ? (
          <IconViewport
            items={iconItems}
            activeId={activeId}
            onActiveChange={onActiveChange}
            onOpen={(id) => onOpenPath([...path, id])}
            positions={iconPositions}
            onPositionsChange={onIconPositionsChange}
            labelColor="dark"
            sx={{
              minHeight: { xs: 220, sm: '100%' },
              overflow: 'auto',
            }}
          />
        ) : (
          entries.map(([name, node]) => (
            <Box
              key={name}
              // onClick={() => onActiveChange(name)}
              onClick={() => onOpenPath([...path, name])}
              sx={{
                display: 'grid',
                gridTemplateColumns: '24px minmax(0, 1fr)',
                gap: 1,
                alignItems: 'center',
                py: '3px',
                px: '4px',
                cursor: 'pointer',
                backgroundColor:
                  activeId === name ? win95.title : 'transparent',
                color: activeId === name ? win95.titleText : win95.text,

                '&:hover': {
                  backgroundColor:
                    activeId === name ? win95.title : win95.light,
                },
              }}
            >
              <Box
                component="img"
                src={node.icon}
                alt=""
                sx={{ width: 20, height: 20, imageRendering: 'pixelated' }}
              />

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: 12,
                    color: activeId === name ? win95.titleText : win95.text,
                  }}
                >
                  {node.title}
                </Typography>

                {'summary' in node && node.summary && (
                  <Typography
                    sx={{
                      fontSize: 11,
                      color:
                        activeId === name
                          ? win95.titleText
                          : win95.disabledText,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {node.summary}
                  </Typography>
                )}
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}

function DocumentPreview({ document }: { document: ExplorerDocument }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
        <Box
          component="img"
          src={document.icon}
          alt=""
          sx={{ width: 32, height: 32, imageRendering: 'pixelated' }}
        />

        <Box>
          <Typography variant="h5">{document.title}</Typography>
          {document.summary && (
            <Typography variant="body2" sx={{ color: win95.disabledText }}>
              {document.summary}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ boxShadow: sunken, backgroundColor: win95.white, p: 2 }}>
        <Typography sx={{ whiteSpace: 'pre-line' }}>{document.body}</Typography>
      </Box>
    </Box>
  );
}

function EmptyExplorerMessage({ message }: { message: string }) {
  return (
    <Box
      sx={{
        minHeight: 240,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: win95.disabledText,
        textShadow: `1px 1px 0 ${win95.light}`,
      }}
    >
      <Typography>{message}</Typography>
    </Box>
  );
}
