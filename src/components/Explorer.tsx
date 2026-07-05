import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ScrollViewport from './ScrollViewport';
import ExplorerTree from './ExplorerTree';
import {
  explorerDrive,
  type ExplorerDirectory,
  type ExplorerDocument,
  type ExplorerNode,
} from '../explorerDrive';
import { sunken, win95 } from '../theme/win95Theme';

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

  const selectedNode = getNodeAtPath(selectedPath);

  const pushPath = (nextParts: string[]) => {
    setSelectedPath(nextParts);
    setAddressValue(pathToString(nextParts));
    setExpanded((current) => ({
      ...current,
      ...getExpandedForPath(nextParts),
    }));

    setHistory((current) => {
      const sliced = current.slice(0, historyIndex + 1);
      return [...sliced, nextParts];
    });

    setHistoryIndex((current) => current + 1);
  };

  const goBack = () => {
    if (historyIndex <= 0) return;

    const nextIndex = historyIndex - 1;
    const nextPath = history[nextIndex];

    setHistoryIndex(nextIndex);
    setSelectedPath(nextPath);
    setAddressValue(pathToString(nextPath));
    setExpanded((current) => ({
      ...current,
      ...getExpandedForPath(nextPath),
    }));
  };

  const goForward = () => {
    if (historyIndex >= history.length - 1) return;

    const nextIndex = historyIndex + 1;
    const nextPath = history[nextIndex];

    setHistoryIndex(nextIndex);
    setSelectedPath(nextPath);
    setAddressValue(pathToString(nextPath));
    setExpanded((current) => ({
      ...current,
      ...getExpandedForPath(nextPath),
    }));
  };

  const goUp = () => {
    if (selectedPath.length === 0) return;
    pushPath(selectedPath.slice(0, -1));
  };

  const submitAddress = (event: React.FormEvent) => {
    event.preventDefault();

    const nextParts = normalizePath(addressValue);
    const nextNode = getNodeAtPath(nextParts);

    if (!nextNode) return;

    pushPath(nextParts);
  };

  const handleSelectPath = (path: string[]) => {
    pushPath(path);
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
            <Box sx={{ p: 2 }}>
              {!selectedNode ? (
                <EmptyExplorerMessage message="Path not found." />
              ) : isDocument(selectedNode) ? (
                <DocumentPreview document={selectedNode} />
              ) : (
                <DirectoryPreview directory={selectedNode} />
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

function DirectoryPreview({ directory }: { directory: ExplorerDirectory }) {
  const entries = Object.entries(directory.children);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
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

      <Box sx={{ boxShadow: sunken, backgroundColor: win95.white, p: 1 }}>
        {entries.length === 0 ? (
          <Typography sx={{ color: win95.disabledText }}>
            This folder is empty.
          </Typography>
        ) : (
          entries.map(([name, node]) => (
            <Box
              key={name}
              sx={{
                display: 'grid',
                gridTemplateColumns: '24px minmax(0, 1fr)',
                gap: 1,
                alignItems: 'center',
                py: '3px',
              }}
            >
              <Box
                component="img"
                src={node.type === 'directory' ? node.icon : node.icon}
                alt=""
                sx={{ width: 20, height: 20, imageRendering: 'pixelated' }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontSize: 12 }}>{node.title}</Typography>
                {'summary' in node && node.summary && (
                  <Typography
                    sx={{
                      fontSize: 11,
                      color: win95.disabledText,
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
