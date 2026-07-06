import * as React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { win95, win95TaskBarHeight } from '../theme/win95Theme';
import IconViewport, {
  arrangeIconPositions,
  type IconPosition,
  type IconViewportItem,
} from './IconViewport';
import Win95ContextMenu, {
  type ContextMenuPosition,
  type Win95ContextMenuItem,
} from './Win95ContextMenu';
import { useTasks } from '../contexts/TaskContext';

export default function Desktop() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { tasks, openTask } = useTasks();

  const [activeIcon, setActiveIcon] = React.useState<string | null>(null);
  const [positions, setPositions] = React.useState<
    Record<string, IconPosition>
  >({});

  const [contextMenu, setContextMenu] =
    React.useState<ContextMenuPosition | null>(null);

  const desktopItems = React.useMemo<IconViewportItem[]>(
    () =>
      tasks
        .filter((task) => task.icon && !task.mobileDialog)
        .map((task) => ({
          id: task.href,
          label: task.label.replace(/\.[^.]+$/i, ''),
          icon: task.icon!,
        })),
    [tasks]
  );

  if (isMobile) {
    return null;
  }

  const handleArrangeIcons = () => {
    setPositions(
      arrangeIconPositions(
        desktopItems,
        window.innerWidth,
        window.innerHeight - win95TaskBarHeight
      )
    );
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

  const contextMenuItems: Win95ContextMenuItem[] = [
    {
      label: 'Arrange Icons',
      onClick: handleArrangeIcons,
    },
    {
      label: 'Refresh',
      onClick: () => {},
    },
    { type: 'separator' },
    {
      label: 'Paste',
      disabled: true,
      onClick: () => {},
    },
    {
      label: 'Paste Shortcut',
      disabled: true,
      onClick: () => {},
    },
    { type: 'separator' },
    {
      label: 'New',
      disabled: true,
      onClick: () => {},
    },
    {
      label: 'Display Properties',
      disabled: true,
      onClick: () => {},
    },
  ];

  return (
    <Box
      onContextMenu={handleContextMenu}
      sx={{
        position: 'fixed',
        inset: `${win95TaskBarHeight}px 0 0 0`,
        backgroundColor: win95.desktop,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <IconViewport
        items={desktopItems}
        activeId={activeIcon}
        onActiveChange={setActiveIcon}
        onOpen={openTask}
        positions={positions}
        onPositionsChange={setPositions}
      />

      <Win95ContextMenu
        position={contextMenu}
        onClose={() => setContextMenu(null)}
        items={contextMenuItems}
      />
    </Box>
  );
}
