import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { raised, sunken, win95, win95TaskBarHeight } from '../theme/win95Theme';
import { Task } from '../YouBetraOS';
import IconViewport, {
  arrangeIconPositions,
  type IconPosition,
  type IconViewportItem,
} from './IconViewport';

type DesktopProps = {
  tasks: Task[];
  onTaskOpen: (href: string) => void;
};

export default function Desktop({ tasks, onTaskOpen }: DesktopProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [activeIcon, setActiveIcon] = React.useState<string | null>(null);
  const [positions, setPositions] = React.useState<
    Record<string, IconPosition>
  >({});

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

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

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

    setContextMenu(null);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();

    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

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
        onOpen={onTaskOpen}
        positions={positions}
        onPositionsChange={setPositions}
      />

      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu
            ? {
                top: contextMenu.mouseY,
                left: contextMenu.mouseX,
              }
            : undefined
        }
        slotProps={{
          paper: {
            sx: {
              width: 190,
              backgroundColor: win95.face,
              backgroundImage: 'none',
              boxShadow: raised,
              border: 'none',
              color: win95.text,
            },
          },
          list: {
            sx: {
              p: '3px',
            },
          },
        }}
      >
        <DesktopMenuItem onClick={handleArrangeIcons}>
          Arrange Icons
        </DesktopMenuItem>

        <DesktopMenuItem onClick={handleCloseContextMenu}>
          Refresh
        </DesktopMenuItem>

        <Box sx={{ height: 2, my: '3px', boxShadow: sunken }} />

        <DesktopMenuItem onClick={handleCloseContextMenu}>
          Paste
        </DesktopMenuItem>

        <DesktopMenuItem onClick={handleCloseContextMenu}>
          Paste Shortcut
        </DesktopMenuItem>

        <Box sx={{ height: 2, my: '3px', boxShadow: sunken }} />

        <DesktopMenuItem onClick={handleCloseContextMenu}>New</DesktopMenuItem>

        <DesktopMenuItem onClick={handleCloseContextMenu}>
          Display Properties
        </DesktopMenuItem>
      </Menu>
    </Box>
  );
}

function DesktopMenuItem({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <MenuItem
      onClick={onClick}
      sx={{
        minHeight: 24,
        px: '18px',
        fontSize: 12,
        color: win95.text,

        '&:hover, &.Mui-focusVisible': {
          backgroundColor: win95.title,
          color: win95.titleText,
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
