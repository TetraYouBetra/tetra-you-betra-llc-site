import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import { raised, sunken, win95 } from '../theme/win95Theme';
import TaskIcon from './TaskIcon';
import logo32px from '../assets/logo_32px.png';
import { useTasks } from '../contexts/TaskContext';
import Win95ContextMenu, {
  ContextMenuPosition,
  Win95ContextMenuItem,
} from './Win95ContextMenu';

export default function AppAppBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    tasks,
    activeTask,
    openTask,
    closeTask,
    minimizeTask,
    restoreTask,
    toggleMaximizeTask,
  } = useTasks();

  const [taskContextMenu, setTaskContextMenu] = React.useState<{
    position: ContextMenuPosition;
    taskHref: string;
  } | null>(null);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleStartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTaskClick = (href: string) => {
    handleClose();
    openTask(href);
  };

  const taskContextMenuTask =
    tasks.find((task) => task.href === taskContextMenu?.taskHref) ?? null;

  const taskContextMenuItems: Win95ContextMenuItem[] = taskContextMenuTask
    ? [
        {
          label: taskContextMenuTask.minimized ? 'Restore' : 'Minimize',
          disabled:
            !taskContextMenuTask.open || !taskContextMenuTask.canMinimize,
          onClick: () => {
            if (taskContextMenuTask.minimized) {
              restoreTask(taskContextMenuTask.href);
              return;
            }

            minimizeTask(taskContextMenuTask.href);
          },
        },
        {
          label: taskContextMenuTask.maximized ? 'Restore' : 'Maximize',
          disabled:
            !taskContextMenuTask.open || !taskContextMenuTask.canMaximize,
          onClick: () => toggleMaximizeTask(taskContextMenuTask.href),
        },
        { type: 'separator' },
        {
          label: 'Close',
          disabled: !taskContextMenuTask.open,
          onClick: () => closeTask(taskContextMenuTask.href),
        },
      ]
    : [];

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        top: 0,
        left: 0,
        right: 0,
        height: 34,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        backgroundColor: win95.face,
        backgroundImage: 'none',
        color: win95.text,
        boxShadow: raised,
        px: '2px',
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          minWidth: 0,
        }}
      >
        <Button
          onClick={handleStartClick}
          aria-controls={open ? 'start-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{
            height: 28,
            minWidth: 0,
            flexShrink: 0,
            px: { xs: '6px', sm: '8px' },
            gap: '6px',
            fontWeight: 700,
            color: win95.text,
            backgroundColor: win95.face,
            boxShadow: open ? sunken : raised,
          }}
        >
          <img
            src={logo32px}
            alt="YouBetra Logo"
            style={{ width: 16, height: 16 }}
          />

          <Typography
            component="span"
            sx={{
              fontSize: 13,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Tetra You Betra
          </Typography>
        </Button>

        <Menu
          id="start-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          slotProps={{
            paper: {
              sx: {
                mt: '2px',
                width: 260,
                backgroundColor: win95.face,
                backgroundImage: 'none',
                boxShadow: raised,
                border: 'none',
                overflow: 'hidden',
              },
            },
            list: {
              sx: {
                p: '3px',
              },
            },
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Box
              sx={{
                width: 28,
                backgroundColor: win95.title,
                color: win95.titleText,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                py: 1,
              }}
            >
              <Typography
                sx={{
                  writingMode: 'vertical-rl',
                  transform: 'rotate(180deg)',
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                }}
              >
                YouBetra{' '}
                <Box component="span" sx={{ fontWeight: 400 }}>
                  1.0
                </Box>
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }}>
              {tasks.map((task) =>
                !task.desktopOnly && !task.mobileDialog ? (
                  <MenuItem
                    key={task.href}
                    component="a"
                    href={task.href}
                    onClick={() => handleTaskClick(task.href)}
                    sx={{
                      minHeight: 32,
                      gap: '6px',
                      fontSize: 13,
                      color: win95.text,
                      '&:hover, &.Mui-focusVisible': {
                        backgroundColor: win95.title,
                        color: win95.titleText,
                      },
                    }}
                  >
                    {task.icon && <TaskIcon src={task.icon} alt="" />}
                    {task.label}
                  </MenuItem>
                ) : undefined
              )}
            </Box>
          </Box>
        </Menu>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            minWidth: 0,
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {tasks.map((task) =>
            task.open ||
            (isMobile && !task.mobileDialog && !task.desktopOnly) ? (
              <Button
                key={task.href}
                href={task.href}
                title={task.label}
                onClick={() => openTask(task.href)}
                onContextMenu={(event) => {
                  event.preventDefault();

                  setTaskContextMenu({
                    taskHref: task.href,
                    position: {
                      mouseX: event.clientX + 2,
                      mouseY: event.clientY - 6,
                    },
                  });
                }}
                aria-label={task.label}
                sx={{
                  height: 26,
                  minWidth: { xs: 30, sm: 110 },
                  maxWidth: { xs: 30, sm: 170 },
                  width: { xs: 30, sm: 'auto' },
                  px: { xs: '4px', sm: '8px' },
                  gap: { xs: 0, sm: '6px' },
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  overflow: 'hidden',
                  flexShrink: 1,
                  color: win95.text,
                  backgroundColor: win95.face,
                  boxShadow: activeTask === task.href ? sunken : raised,
                }}
              >
                {task.icon && <TaskIcon src={task.icon} alt="" />}

                <Typography
                  component="span"
                  sx={{
                    display: { xs: 'none', sm: 'inline' },
                    fontSize: 12,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {task.label}
                </Typography>
              </Button>
            ) : (
              <Box key={task.href} sx={{ display: 'none' }} />
            )
          )}
        </Box>

        {!isMobile && (
          <Box
            sx={{
              height: 26,
              minWidth: { xs: 54, sm: 118 },
              px: { xs: '4px', sm: '8px' },
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: sunken,
              backgroundColor: win95.face,
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              12:00 PM
            </Typography>
          </Box>
        )}
      </Box>
      <Win95ContextMenu
        position={taskContextMenu?.position ?? null}
        onClose={() => setTaskContextMenu(null)}
        items={taskContextMenuItems}
      />
    </AppBar>
  );
}
