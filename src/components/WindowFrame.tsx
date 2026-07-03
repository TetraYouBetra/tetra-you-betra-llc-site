import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import {
  pressed,
  raised,
  win95,
  win95FontFamily,
  win95TitleBarHeight,
  win95TaskBarHeight,
} from '../theme/win95Theme';
import { Task } from '../YouBetraOS';
import TaskIcon from './TaskIcon';

const TOP_BAR_HEIGHT = win95TaskBarHeight;
let topZIndex = 100;

type WindowFrameProps = {
  task: Task;
  children: React.ReactNode;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  sx?: SxProps<Theme>;
};

export default function WindowFrame({
  task,
  children,
  onClose,
  onMinimize,
  onMaximize,
  sx,
}: WindowFrameProps) {
  const {
    defaultPosition = { x: 24, y: TOP_BAR_HEIGHT + 24 },
    defaultSize = { width: 420 },
    initialFocused = false,
    mobileDialog = false,
  } = task;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const frameRef = React.useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = React.useState(() => ({
    x: defaultPosition.x,
    y: Math.max(TOP_BAR_HEIGHT, defaultPosition.y),
  }));
  const [focused, setFocused] = React.useState(initialFocused);
  const [zIndex, setZIndex] = React.useState(() => ++topZIndex);

  const dragState = React.useRef({
    dragging: false,
    startPointerX: 0,
    startPointerY: 0,
    startX: position.x,
    startY: position.y,
  });

  const focusWindow = React.useCallback(() => {
    setFocused(true);
    setZIndex(++topZIndex);
    task.onClick?.();
  }, []);

  const clampPosition = React.useCallback((x: number, y: number) => {
    const rect = frameRef.current?.getBoundingClientRect();

    const width = rect?.width ?? 0;
    const height = rect?.height ?? 0;

    const maxX = Math.max(0, window.innerWidth - width);
    const maxY = Math.max(TOP_BAR_HEIGHT, window.innerHeight - height);

    return {
      x: Math.min(Math.max(0, x), maxX),
      y: Math.min(Math.max(TOP_BAR_HEIGHT, y), maxY),
    };
  }, []);

  React.useEffect(() => {
    if (isMobile) return;

    setPosition((current) => clampPosition(current.x, current.y));
  }, [clampPosition, isMobile]);

  React.useEffect(() => {
    if (isMobile) return;

    const handleResize = () => {
      setPosition((current) => clampPosition(current.x, current.y));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clampPosition, isMobile]);

  const handlePointerDown = (event: React.PointerEvent) => {
    if (isMobile) return;

    focusWindow();

    dragState.current = {
      dragging: true,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent) => {
    if (isMobile || !dragState.current.dragging) return;

    const nextX =
      dragState.current.startX +
      event.clientX -
      dragState.current.startPointerX;

    const nextY =
      dragState.current.startY +
      event.clientY -
      dragState.current.startPointerY;

    setPosition(clampPosition(nextX, nextY));
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (isMobile) return;

    dragState.current.dragging = false;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (isMobile && mobileDialog && !task.open) {
    return null;
  }

  if (!isMobile && (!task.open || task.minimized)) {
    return null;
  }

  const mobileDialogSx: SxProps<Theme> =
    isMobile && mobileDialog
      ? {
          position: 'fixed',
          left: 0,
          top: `${TOP_BAR_HEIGHT}px`,
          width: '100vw',
          height: `calc(100dvh - ${TOP_BAR_HEIGHT}px)`,
          zIndex: (theme) => theme.zIndex.modal,
        }
      : {};

  const mobileInlineSx: SxProps<Theme> =
    isMobile && !mobileDialog
      ? {
          position: 'relative',
          left: 'auto',
          top: 'auto',
          width: '100%',
          height: 'auto',
          zIndex: 'auto',
        }
      : {};

  const maximizedSx =
    task.maximized && !isMobile
      ? {
          position: 'fixed',
          left: 0,
          top: `${TOP_BAR_HEIGHT}px`,
          width: '100vw',
          height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
          zIndex,
        }
      : {};

  const desktopSx: SxProps<Theme> = !isMobile
    ? {
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: defaultSize.width,
        height: defaultSize.height,
        zIndex,
      }
    : {};

  const rootSx: SxProps<Theme> = [
    {
      backgroundColor: win95.face,
      color: win95.text,
      boxShadow: raised,
      fontFamily: win95FontFamily,
      outline: 'none',
      userSelect: 'none',
      overflow: 'hidden',
      maxWidth: !isMobile ? '100vw' : undefined,
      maxHeight: !isMobile ? `calc(100vh - ${TOP_BAR_HEIGHT}px)` : undefined,
      display: 'flex',
      flexDirection: 'column',
    },
    desktopSx,
    maximizedSx,
    mobileInlineSx,
    mobileDialogSx,
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];

  return (
    <Box
      ref={frameRef}
      tabIndex={0}
      onMouseDown={focusWindow}
      onFocus={focusWindow}
      onBlur={(event: React.FocusEvent<HTMLDivElement>) => {
        if (!frameRef.current?.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      role={mobileDialog ? 'dialog' : undefined}
      aria-modal={mobileDialog && isMobile ? true : undefined}
      sx={rootSx}
    >
      <Box
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        sx={{
          height: win95TitleBarHeight,
          minHeight: win95TitleBarHeight,
          mx: '3px',
          mt: '3px',
          px: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
          gap: '4px',
          cursor: isMobile ? 'default' : 'move',
          backgroundColor: focused ? win95.title : win95.inactiveTitle,
          color: focused ? win95.titleText : win95.inactiveTitleText,
        }}
      >
        {task.icon && <TaskIcon src={task.icon} alt="" />}
        <Typography
          component="div"
          sx={{
            fontSize: 12,
            fontWeight: 700,
            lineHeight: 1,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {task.label}
        </Typography>

        <Box sx={{ display: 'flex', gap: '2px', marginLeft: 'auto' }}>
          {onMinimize && !isMobile && (
            <WindowButton label="_" onClick={onMinimize} />
          )}
          {onMaximize && !isMobile && (
            <WindowButton label="□" onClick={onMaximize} />
          )}
          {onClose && <WindowButton label="×" onClick={onClose} />}
        </Box>
      </Box>

      <Box
        sx={{
          p: '10px',
          userSelect: 'text',
          minHeight: 0,
          flex: 1,
          overflow: mobileDialog && isMobile ? 'auto' : undefined,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function WindowButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <IconButton
      size="small"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onClick}
      sx={{
        width: 14,
        height: 14,
        minWidth: 14,
        p: 0,
        fontSize: 10,
        lineHeight: 1,
        fontFamily: win95FontFamily,
        color: win95.text,
        backgroundColor: win95.face,
        boxShadow: raised,
        '&:hover': {
          backgroundColor: win95.face,
          boxShadow: raised,
        },
        '&:active': {
          boxShadow: pressed,
          transform: 'translate(1px, 1px)',
        },
      }}
    >
      {label}
    </IconButton>
  );
}
