import * as React from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
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
import TaskIcon from './TaskIcon';
import { Task } from '../contexts/TaskContext';
import Win95ContextMenu, {
  ContextMenuPosition,
  Win95ContextMenuItem,
} from './Win95ContextMenu';

const TOP_BAR_HEIGHT = win95TaskBarHeight;

type PendingExitAction = 'close' | 'minimize' | null;

type WindowFrameProps = {
  task: Task;
  children: React.ReactNode;
  active: boolean;
  zIndex: number;
  onFocusWindow: () => void;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isLastMobileInlineTask?: boolean;
  sx?: SxProps<Theme>;
};

export default function WindowFrame({
  task,
  children,
  active,
  zIndex,
  onFocusWindow,
  onClose,
  onMinimize,
  onMaximize,
  isLastMobileInlineTask = false,
  sx,
}: WindowFrameProps) {
  const {
    defaultPosition = { x: 24, y: TOP_BAR_HEIGHT + 24 },
    defaultSize = { width: 420 },
    mobileDialog = false,
    desktopOnly = false,
  } = task;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const frameRef = React.useRef<HTMLDivElement | null>(null);

  const shouldBeVisible = isMobile
    ? (!mobileDialog && !desktopOnly) || task.open
    : task.open && !task.minimized;

  const [renderVisible, setRenderVisible] = React.useState(shouldBeVisible);
  const [pendingExitAction, setPendingExitAction] =
    React.useState<PendingExitAction>(null);
  const [animateFrame, setAnimateFrame] = React.useState(false);

  const [position, setPosition] = React.useState(() => ({
    x: defaultPosition.x,
    y: Math.max(TOP_BAR_HEIGHT, defaultPosition.y),
  }));
  const [titleBarContextMenu, setTitleBarContextMenu] =
    React.useState<ContextMenuPosition | null>(null);

  const dragState = React.useRef({
    dragging: false,
    startPointerX: 0,
    startPointerY: 0,
    startX: position.x,
    startY: position.y,
  });

  const focusWindow = React.useCallback(() => {
    onFocusWindow();
  }, [onFocusWindow]);

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
    if (pendingExitAction) return;
    setRenderVisible(shouldBeVisible);
  }, [shouldBeVisible, pendingExitAction]);

  const titleBarRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!isMobile || mobileDialog) return;

    const observedElement = isLastMobileInlineTask
      ? frameRef.current
      : titleBarRef.current;

    if (!observedElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        if (isLastMobileInlineTask && entry.intersectionRatio < 1) {
          return;
        }

        onFocusWindow();
      },
      {
        threshold: isLastMobileInlineTask ? 1 : 0,
        rootMargin: isLastMobileInlineTask
          ? `-${TOP_BAR_HEIGHT}px 0px 0px 0px`
          : `-${TOP_BAR_HEIGHT}px 0px -55% 0px`,
      }
    );

    observer.observe(observedElement);

    return () => observer.disconnect();
  }, [isMobile, mobileDialog, isLastMobileInlineTask, onFocusWindow]);

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
    if (isMobile || task.maximized) return;

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
    if (isMobile || task.maximized || !dragState.current.dragging) return;

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

  const startExit = (action: Exclude<PendingExitAction, null>) => {
    setPendingExitAction(action);
    setRenderVisible(false);
  };

  const handleExited = () => {
    const action = pendingExitAction;
    setPendingExitAction(null);

    if (action === 'close') onClose?.();
    if (action === 'minimize') onMinimize?.();
  };

  const handleMaximize = () => {
    setAnimateFrame(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        onMaximize?.();
      });
    });

    window.setTimeout(() => {
      setAnimateFrame(false);
    }, 240);
  };

  const handleTitleBarDoubleClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (isMobile || !onMaximize) return;

    if ((event.target as HTMLElement).closest('button')) {
      return;
    }

    handleMaximize();
  };

  const handleTitleBarContextMenu = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    focusWindow();

    setTitleBarContextMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
    });
  };

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

  const frameStyle: React.CSSProperties = !isMobile
    ? {
        position: 'fixed',
        left: task.maximized ? 0 : position.x,
        top: task.maximized ? TOP_BAR_HEIGHT : position.y,
        width: task.maximized ? '100vw' : defaultSize.width,
        height: task.maximized
          ? `calc(100vh - ${TOP_BAR_HEIGHT}px)`
          : defaultSize.height,
        zIndex,
        transition: animateFrame
          ? theme.transitions.create(['left', 'top', 'width', 'height'], {
              duration: 180,
              easing: theme.transitions.easing.easeInOut,
            })
          : undefined,
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
      transformOrigin:
        pendingExitAction === 'minimize' ? 'top center' : 'center center',
      transition: animateFrame
        ? (theme) =>
            theme.transitions.create(
              ['left', 'top', 'width', 'height', 'max-width', 'max-height'],
              {
                duration: 180,
                easing: theme.transitions.easing.easeInOut,
              }
            )
        : undefined,
    },
    mobileInlineSx,
    mobileDialogSx,
    ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
  ];

  const titleBarContextMenuItems: Win95ContextMenuItem[] = [
    {
      label: task.minimized ? 'Restore' : 'Minimize',
      disabled: isMobile || !onMinimize,
      onClick: () => startExit('minimize'),
    },
    {
      label: task.maximized ? 'Restore' : 'Maximize',
      disabled: isMobile || !onMaximize,
      onClick: handleMaximize,
    },
    { type: 'separator' },
    {
      label: 'Close',
      disabled: isMobile && !task.mobileDialog,
      onClick: () => startExit('close'),
    },
  ];

  return (
    <Grow
      in={renderVisible}
      timeout={{ enter: 120, exit: 120 }}
      mountOnEnter
      unmountOnExit
      onExited={handleExited}
      style={{
        transformOrigin:
          pendingExitAction === 'minimize' ? 'top center' : 'center center',
      }}
    >
      <Box
        ref={frameRef}
        tabIndex={0}
        onMouseDown={focusWindow}
        onFocus={focusWindow}
        role={mobileDialog ? 'dialog' : undefined}
        aria-modal={mobileDialog && isMobile ? true : undefined}
        sx={rootSx}
        style={frameStyle}
      >
        {/* title bar */}
        <Box
          ref={titleBarRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onDoubleClick={handleTitleBarDoubleClick}
          onContextMenu={handleTitleBarContextMenu}
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
            cursor: isMobile || task.maximized ? 'default' : 'move',
            backgroundColor: active ? win95.title : win95.inactiveTitle,
            color: active ? win95.titleText : win95.inactiveTitleText,
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
              <WindowButton label="_" onClick={() => startExit('minimize')} />
            )}

            {onMaximize && !isMobile && (
              <WindowButton label="□" onClick={handleMaximize} />
            )}

            {onClose && (
              <WindowButton
                label="×"
                disabled={isMobile && !task.mobileDialog}
                onClick={() => startExit('close')}
              />
            )}
          </Box>
        </Box>

        <Box
          sx={{
            p: '4px',
            userSelect: 'text',
            minHeight: 0,
            flex: 1,
            overflow: mobileDialog && isMobile ? 'auto' : undefined,
          }}
        >
          {children}
        </Box>
        <Win95ContextMenu
          position={titleBarContextMenu}
          onClose={() => setTitleBarContextMenu(null)}
          items={titleBarContextMenuItems}
        />
      </Box>
    </Grow>
  );
}

function WindowButton({
  label,
  onClick,
  disabled = false,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <IconButton
      size="small"
      onPointerDown={(event) => event.stopPropagation()}
      onClick={onClick}
      disabled={disabled}
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
