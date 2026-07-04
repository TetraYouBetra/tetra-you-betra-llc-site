import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { raised, sunken, win95, win95TaskBarHeight } from '../theme/win95Theme';
import { Task } from '../YouBetraOS';

type DesktopProps = {
  tasks: Task[];
  onTaskOpen: (href: string) => void;
};

type IconPosition = {
  x: number;
  y: number;
};

const ICON_WIDTH = 88;
const ICON_HEIGHT = 78;

export default function Desktop({ tasks, onTaskOpen }: DesktopProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeIcon, setActiveIcon] = React.useState<string | null>(null);

  const GRID_X = 96;
  const GRID_Y = 86;
  const ICON_START_X = 8;
  const ICON_START_Y = 8;

  const getGridKey = (position: IconPosition) => `${position.x}:${position.y}`;

  const snapToGrid = (x: number, y: number) => ({
    x: ICON_START_X + Math.round((x - ICON_START_X) / GRID_X) * GRID_X,
    y: ICON_START_Y + Math.round((y - ICON_START_Y) / GRID_Y) * GRID_Y,
  });

  const desktopTasks = React.useMemo(
    () => tasks.filter((task) => task.icon && !task.mobileDialog),
    [tasks]
  );

  const [positions, setPositions] = React.useState<
    Record<string, IconPosition>
  >(() =>
    Object.fromEntries(
      desktopTasks.map((task, index) => [
        task.href,
        {
          x: ICON_START_X,
          y: ICON_START_Y + index * GRID_Y,
        },
      ])
    )
  );

  const [contextMenu, setContextMenu] = React.useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const dragState = React.useRef<{
    href: string;
    startPointerX: number;
    startPointerY: number;
    startX: number;
    startY: number;
    dragging: boolean;
  } | null>(null);

  React.useEffect(() => {
    setPositions((current) => {
      const next = { ...current };

      desktopTasks.forEach((task, index) => {
        if (!next[task.href]) {
          next[task.href] = {
            x: 16,
            y: 16 + index * ICON_HEIGHT,
          };
        }
      });

      return next;
    });
  }, [desktopTasks]);

  if (isMobile) {
    return null;
  }

  const clampPosition = (x: number, y: number) => {
    const maxX = window.innerWidth - ICON_WIDTH;
    const maxY = window.innerHeight - win95TaskBarHeight - ICON_HEIGHT;

    return {
      x: Math.min(Math.max(0, x), Math.max(0, maxX)),
      y: Math.min(Math.max(0, y), Math.max(0, maxY)),
    };
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

  const handleIconPointerDown =
    (task: Task) => (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setActiveIcon(task.href);

      const currentPosition = positions[task.href] ?? { x: 16, y: 16 };

      dragState.current = {
        href: task.href,
        startPointerX: event.clientX,
        startPointerY: event.clientY,
        startX: currentPosition.x,
        startY: currentPosition.y,
        dragging: false,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    };

  const handleIconPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag) return;

    const distanceX = event.clientX - drag.startPointerX;
    const distanceY = event.clientY - drag.startPointerY;

    if (Math.abs(distanceX) > 3 || Math.abs(distanceY) > 3) {
      drag.dragging = true;
    }

    if (!drag.dragging) return;

    const nextPosition = clampPosition(
      drag.startX + distanceX,
      drag.startY + distanceY
    );

    setPositions((current) => ({
      ...current,
      [drag.href]: nextPosition,
    }));
  };

  const findAvailableGridPosition = (
    requested: IconPosition,
    href: string,
    currentPositions: Record<string, IconPosition>
  ) => {
    const occupied = new Set(
      Object.entries(currentPositions)
        .filter(([otherHref]) => otherHref !== href)
        .map(([, position]) => getGridKey(position))
    );

    let candidate = requested;

    while (occupied.has(getGridKey(candidate))) {
      candidate = {
        x: candidate.x,
        y: candidate.y + GRID_Y,
      };

      if (candidate.y + ICON_HEIGHT > window.innerHeight - win95TaskBarHeight) {
        candidate = {
          x: candidate.x + GRID_X,
          y: ICON_START_Y,
        };
      }

      if (candidate.x + ICON_WIDTH > window.innerWidth) {
        candidate = {
          x: ICON_START_X,
          y: ICON_START_Y,
        };
        break;
      }
    }

    return candidate;
  };

  const handleIconPointerUp =
    (task: Task) => (event: React.PointerEvent<HTMLDivElement>) => {
      event.stopPropagation();

      const wasDragging = dragState.current?.dragging;
      const href = task.href;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragState.current = null;
      setActiveIcon(href);

      if (wasDragging) {
        setPositions((current) => {
          const currentPosition = current[href] ?? {
            x: ICON_START_X,
            y: ICON_START_Y,
          };

          const snappedRaw = snapToGrid(currentPosition.x, currentPosition.y);
          const snapped = clampPosition(snappedRaw.x, snappedRaw.y);
          const available = findAvailableGridPosition(snapped, href, current);

          return {
            ...current,
            [href]: available,
          };
        });

        return;
      }

      onTaskOpen(href);
    };

  return (
    <Box
      onContextMenu={handleContextMenu}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        handleCloseContextMenu();
        setActiveIcon(null);
      }}
      sx={{
        position: 'fixed',
        inset: `${win95TaskBarHeight}px 0 0 0`,
        backgroundColor: win95.desktop,
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {desktopTasks.map((task) => {
        const position = positions[task.href] ?? { x: 16, y: 16 };
        const isActive = activeIcon === task.href;

        return (
          <Box
            key={task.href}
            role="button"
            tabIndex={0}
            aria-label={`Open ${task.label}`}
            onPointerDown={handleIconPointerDown(task)}
            onPointerMove={handleIconPointerMove}
            onPointerUp={handleIconPointerUp(task)}
            onClick={(event) => {
              event.stopPropagation();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onTaskOpen(task.href);
              }
            }}
            sx={{
              cursor: 'pointer',
              position: 'absolute',
              left: position.x,
              top: position.y,
              width: ICON_WIDTH,
              minHeight: ICON_HEIGHT,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '4px',
              p: '4px',
              userSelect: 'none',
              outline: 'none',
              '&:focus .desktop-icon-label': {
                outline: `1px dotted ${win95.white}`,
              },
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 32,
                height: 32,
                backgroundColor: isActive ? win95.title : 'transparent',
                outline: isActive ? `1px dotted ${win95.white}` : 'none',
                '&::after': isActive
                  ? {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: win95.title,
                      opacity: 0.45,
                      pointerEvents: 'none',
                      mixBlendMode: 'multiply',
                    }
                  : undefined,
              }}
            >
              <Box
                component="img"
                src={task.icon}
                alt=""
                draggable={false}
                sx={{
                  width: 32,
                  height: 32,
                  display: 'block',
                  imageRendering: 'pixelated',
                }}
              />
            </Box>

            <Typography
              className="desktop-icon-label"
              sx={{
                px: '3px',
                py: '1px',
                maxWidth: '100%',
                textAlign: 'center',
                fontSize: 12,
                lineHeight: 1.15,
                color: isActive ? win95.titleText : win95.white,
                backgroundColor: isActive ? win95.title : win95.desktop,
                textShadow: isActive ? 'none' : `1px 1px ${win95.black}`,
                overflowWrap: 'anywhere',
                outline: isActive ? `1px dotted ${win95.white}` : 'none',
              }}
            >
              {task.label.replace(/\.[^.]+$/i, '')}{' '}
            </Typography>
          </Box>
        );
      })}

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
        <DesktopMenuItem onClick={handleCloseContextMenu}>
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
