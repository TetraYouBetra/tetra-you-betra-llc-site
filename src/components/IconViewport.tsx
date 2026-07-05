import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';
import { win95 } from '../theme/win95Theme';

export type IconViewportItem = {
  id: string;
  label: string;
  icon: string;
};

export type IconPosition = {
  x: number;
  y: number;
};

type IconViewportProps = {
  items: IconViewportItem[];
  activeId: string | null;
  labelColor?: 'desktop' | 'dark';
  onActiveChange: (id: string | null) => void;
  onOpen: (id: string) => void;
  positions: Record<string, IconPosition>;
  onPositionsChange: React.Dispatch<
    React.SetStateAction<Record<string, IconPosition>>
  >;
  sx?: SxProps<Theme>;
};

const ICON_WIDTH = 88;
const ICON_HEIGHT = 78;
const GRID_X = 96;
const GRID_Y = 86;
const ICON_START_X = 8;
const ICON_START_Y = 8;

export function arrangeIconPositions(
  items: IconViewportItem[],
  viewportWidth: number,
  viewportHeight: number
): Record<string, IconPosition> {
  const rows = Math.max(
    1,
    Math.floor((viewportHeight - ICON_START_Y) / GRID_Y)
  );

  const columns = Math.max(
    1,
    Math.floor((viewportWidth - ICON_START_X) / GRID_X)
  );

  return Object.fromEntries(
    items.map((item, index) => {
      const column = Math.floor(index / rows) % columns;
      const page = Math.floor(index / (rows * columns));
      const row = index % rows;

      return [
        item.id,
        {
          x: ICON_START_X + column * GRID_X + page * columns * GRID_X,
          y: ICON_START_Y + row * GRID_Y,
        },
      ];
    })
  );
}

export default function IconViewport({
  items,
  activeId,
  onActiveChange,
  onOpen,
  positions,
  onPositionsChange,
  sx,
  labelColor = 'desktop',
}: IconViewportProps) {
  const viewportRef = React.useRef<HTMLDivElement | null>(null);

  const dragState = React.useRef<{
    id: string;
    startPointerX: number;
    startPointerY: number;
    startX: number;
    startY: number;
    dragging: boolean;
  } | null>(null);

  const itemIds = React.useMemo(
    () => items.map((item) => item.id).join('|'),
    [items]
  );

  const getBounds = React.useCallback(() => {
    const rect = viewportRef.current?.getBoundingClientRect();

    return {
      width: rect?.width ?? window.innerWidth,
      height: rect?.height ?? window.innerHeight,
    };
  }, []);

  const getGridKey = (position: IconPosition) => `${position.x}:${position.y}`;

  const clampPosition = React.useCallback(
    (x: number, y: number) => {
      const bounds = getBounds();

      return {
        x: Math.min(Math.max(0, x), Math.max(0, bounds.width - ICON_WIDTH)),
        y: Math.min(Math.max(0, y), Math.max(0, bounds.height - ICON_HEIGHT)),
      };
    },
    [getBounds]
  );

  const snapToGrid = (x: number, y: number) => ({
    x: ICON_START_X + Math.round((x - ICON_START_X) / GRID_X) * GRID_X,
    y: ICON_START_Y + Math.round((y - ICON_START_Y) / GRID_Y) * GRID_Y,
  });

  const findAvailableGridPosition = React.useCallback(
    (
      requested: IconPosition,
      id: string,
      currentPositions: Record<string, IconPosition>
    ) => {
      const bounds = getBounds();

      const occupied = new Set(
        Object.entries(currentPositions)
          .filter(([otherId]) => otherId !== id)
          .map(([, position]) => getGridKey(position))
      );

      let candidate = requested;
      let safety = 0;

      while (occupied.has(getGridKey(candidate)) && safety < 1000) {
        safety += 1;

        candidate = {
          x: candidate.x,
          y: candidate.y + GRID_Y,
        };

        if (candidate.y + ICON_HEIGHT > bounds.height) {
          candidate = {
            x: candidate.x + GRID_X,
            y: ICON_START_Y,
          };
        }

        if (candidate.x + ICON_WIDTH > bounds.width) {
          candidate = {
            x: ICON_START_X,
            y: ICON_START_Y,
          };
        }
      }

      return candidate;
    },
    [getBounds]
  );

  React.useEffect(() => {
    onPositionsChange((current) => {
      const bounds = getBounds();
      const arranged = arrangeIconPositions(items, bounds.width, bounds.height);
      const next: Record<string, IconPosition> = {};

      items.forEach((item) => {
        next[item.id] = current[item.id] ?? arranged[item.id];
      });

      return next;
    });
  }, [itemIds, getBounds, items, onPositionsChange]);

  React.useEffect(() => {
    const handleResize = () => {
      onPositionsChange((current) => {
        const next = { ...current };

        Object.entries(next).forEach(([id, position]) => {
          next[id] = clampPosition(position.x, position.y);
        });

        return next;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition, onPositionsChange]);

  const handlePointerDown =
    (item: IconViewportItem) => (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      onActiveChange(item.id);

      const currentPosition = positions[item.id] ?? {
        x: ICON_START_X,
        y: ICON_START_Y,
      };

      dragState.current = {
        id: item.id,
        startPointerX: event.clientX,
        startPointerY: event.clientY,
        startX: currentPosition.x,
        startY: currentPosition.y,
        dragging: false,
      };

      event.currentTarget.setPointerCapture(event.pointerId);
    };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
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

    onPositionsChange((current) => ({
      ...current,
      [drag.id]: nextPosition,
    }));
  };

  const handlePointerUp =
    (item: IconViewportItem) => (event: React.PointerEvent<HTMLDivElement>) => {
      event.stopPropagation();

      const drag = dragState.current;
      const wasDragging = drag?.dragging;
      const id = item.id;

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      dragState.current = null;
      onActiveChange(id);

      if (wasDragging) {
        onPositionsChange((current) => {
          const currentPosition = current[id] ?? {
            x: ICON_START_X,
            y: ICON_START_Y,
          };

          const snappedRaw = snapToGrid(currentPosition.x, currentPosition.y);
          const snapped = clampPosition(snappedRaw.x, snappedRaw.y);
          const available = findAvailableGridPosition(snapped, id, current);

          return {
            ...current,
            [id]: available,
          };
        });

        return;
      }

      onOpen(id);
    };

  return (
    <Box
      ref={viewportRef}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        onActiveChange(null);
      }}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minWidth: 0,
        minHeight: ICON_START_Y + ICON_HEIGHT + ICON_START_Y,
        overflow: 'hidden',
        ...sx,
      }}
    >
      {items.map((item) => {
        const position = positions[item.id] ?? {
          x: ICON_START_X,
          y: ICON_START_Y,
        };

        const isActive = activeId === item.id;

        return (
          <Box
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={item.label}
            onPointerDown={handlePointerDown(item)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp(item)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onOpen(item.id);
              }
            }}
            sx={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              cursor: 'pointer',
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
                src={item.icon}
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
                color: isActive
                  ? win95.titleText
                  : labelColor === 'dark'
                    ? win95.text
                    : win95.white,
                backgroundColor: isActive
                  ? win95.title
                  : labelColor === 'dark'
                    ? 'transparent'
                    : win95.desktop,
                textShadow:
                  isActive || labelColor === 'dark'
                    ? 'none'
                    : `1px 1px ${win95.black}`,
                overflowWrap: 'anywhere',
                outline: isActive ? `1px dotted ${win95.white}` : 'none',
              }}
            >
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
