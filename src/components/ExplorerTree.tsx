import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { win95 } from '../theme/win95Theme';
import type { ExplorerDirectory, ExplorerNode } from '../explorerDrive';

type ExplorerTreeNode = {
  id: string;
  label: string;
  icon: string;
  activeIcon: string;
  path: string[];
  node: ExplorerNode;
  children?: ExplorerTreeNode[];
};

type Props = {
  drive: ExplorerDirectory;
  selectedPath: string[];
  expanded: Record<string, boolean>;
  onSelectPath: (path: string[]) => void;
  onToggle: (id: string) => void;
};

const INDENT = 18;
const ROW_HEIGHT = 22;

function pathId(path: string[]) {
  return path.length ? path.join('/') : 'root';
}

function buildExplorerTree(
  node: ExplorerNode,
  path: string[] = []
): ExplorerTreeNode {
  const isDirectory = node.type === 'directory';

  return {
    id: pathId(path),
    label: node.title,
    icon: node.icon,
    activeIcon: isDirectory ? node.activeIcon : node.icon,
    path,
    node,
    children: isDirectory
      ? Object.entries(node.children).map(([key, child]) =>
          buildExplorerTree(child, [...path, key])
        )
      : undefined,
  };
}

function samePath(a: string[], b: string[]) {
  return a.length === b.length && a.every((part, index) => part === b[index]);
}

export default function ExplorerTree({
  drive,
  selectedPath,
  expanded,
  onSelectPath,
  onToggle,
}: Props) {
  const tree = React.useMemo(() => buildExplorerTree(drive), [drive]);

  return (
    <Box role="tree">
      <TreeNodeRow
        node={tree}
        level={0}
        ancestorContinuationLines={[]}
        isLast
        selectedPath={selectedPath}
        expanded={expanded}
        onSelectPath={onSelectPath}
        onToggle={onToggle}
      />
    </Box>
  );
}

function TreeNodeRow({
  node,
  level,
  ancestorContinuationLines,
  isLast,
  selectedPath,
  expanded,
  onSelectPath,
  onToggle,
}: {
  node: ExplorerTreeNode;
  level: number;
  ancestorContinuationLines: boolean[];
  isLast: boolean;
  selectedPath: string[];
  expanded: Record<string, boolean>;
  onSelectPath: (path: string[]) => void;
  onToggle: (id: string) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = Boolean(expanded[node.id]);
  const isSelected = samePath(node.path, selectedPath);
  const useActiveIcon = isSelected || (hasChildren && isExpanded);

  const handleClick = () => {
    onSelectPath(node.path);
  };

  const handleExpandClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle(node.id);
  };

  return (
    <>
      <TreeRow
        label={node.label}
        icon={useActiveIcon ? node.activeIcon : node.icon}
        level={level}
        ancestorContinuationLines={ancestorContinuationLines}
        isLast={isLast}
        selected={isSelected}
        expanded={isExpanded}
        onClick={handleClick}
        onExpandClick={handleExpandClick}
        hasChildren={hasChildren}
      />

      {hasChildren && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          {node.children!.map((child, index) => {
            const childIsLast = index === node.children!.length - 1;

            return (
              <TreeNodeRow
                key={child.id}
                node={child}
                level={level + 1}
                ancestorContinuationLines={[
                  ...ancestorContinuationLines,
                  !childIsLast,
                ]}
                isLast={childIsLast}
                selectedPath={selectedPath}
                expanded={expanded}
                onSelectPath={onSelectPath}
                onToggle={onToggle}
              />
            );
          })}
        </Collapse>
      )}
    </>
  );
}

function TreeRow({
  label,
  icon,
  level,
  ancestorContinuationLines,
  isLast,
  selected,
  expanded,
  onClick,
  onExpandClick,
  hasChildren,
}: {
  label: string;
  icon: string;
  level: number;
  ancestorContinuationLines: boolean[];
  isLast: boolean;
  selected: boolean;
  expanded: boolean;
  onClick: () => void;
  onExpandClick: (event: React.MouseEvent) => void;
  hasChildren: boolean;
}) {
  const elbowX = level * INDENT - 7;

  return (
    <Box
      role="treeitem"
      aria-selected={selected}
      onClick={onClick}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        minHeight: ROW_HEIGHT,
        pl: `${level * INDENT + 4}px`,
        pr: '4px',
        cursor: 'pointer',
        userSelect: 'none',
        color: selected ? win95.titleText : win95.text,
        backgroundColor: selected ? win95.title : 'transparent',
        '&:hover': {
          backgroundColor: selected ? win95.title : win95.light,
        },
      }}
    >
      {ancestorContinuationLines.map((showLine, index) =>
        showLine ? (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              left: `${index * INDENT + 11}px`,
              top: 0,
              bottom: 0,
              borderLeft: `1px dotted ${win95.shadow}`,
            }}
          />
        ) : null
      )}

      {level > 0 && (
        <>
          <Box
            sx={{
              position: 'absolute',
              left: `${elbowX}px`,
              top: 0,
              bottom: isLast ? '50%' : 0,
              borderLeft: `1px dotted ${win95.shadow}`,
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              left: `${elbowX}px`,
              top: '50%',
              width: 13,
              borderTop: `1px dotted ${win95.shadow}`,
            }}
          />
        </>
      )}

      {hasChildren ? (
        <Box
          onClick={onExpandClick}
          sx={{
            width: 9,
            height: 9,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: win95.white,
            border: `1px solid ${win95.mid}`,
            fontSize: 9,
            fontFamily: 'monospace',
            fontWeight: 'bold',
            lineHeight: 1,
            color: win95.text,
            position: 'relative',
            zIndex: 2,
          }}
        >
          {expanded ? '-' : '+'}
        </Box>
      ) : (
        <Box sx={{ width: 9, height: 9, flexShrink: 0 }} />
      )}

      <Box
        component="img"
        src={icon}
        alt=""
        sx={{
          width: 16,
          height: 16,
          imageRendering: 'pixelated',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      />

      <Typography
        component="span"
        sx={{
          fontSize: 12,
          lineHeight: 1.2,
          fontWeight: selected ? 700 : 400,
          color: selected ? win95.titleText : win95.text,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          position: 'relative',
          zIndex: 1,
          backgroundColor: selected ? win95.title : 'transparent',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
