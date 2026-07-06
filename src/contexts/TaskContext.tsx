import * as React from 'react';

export interface Task {
  label: string;
  href: string;
  icon?: string;
  component?: React.ReactNode;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  canMaximize?: boolean;
  canMinimize?: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height?: number | string };
  initialFocused?: boolean;
  mobileDialog?: boolean;
  desktopOnly?: boolean;
}

type TaskContextValue = {
  tasks: Task[];
  activeTask: string | null;
  taskStack: string[];
  openTask: (href: string) => void;
  closeTask: (href: string) => void;
  minimizeTask: (href: string) => void;
  restoreTask: (href: string) => void;
  toggleMaximizeTask: (href: string) => void;
  bringTaskToFront: (href: string) => void;
  focusTask: (href: string) => void;
  focusWindow: (task: Task) => void;
  getTaskZIndex: (href: string) => number;
  lastMobileInlineTaskHref?: string;
};

const TaskContext = React.createContext<TaskContextValue | null>(null);

type Props = {
  initialTasks: Task[];
  children: React.ReactNode;
};

export function TaskProvider({ initialTasks, children }: Props) {
  const [tasks, setTasks] = React.useState<Task[]>(initialTasks);
  const [activeTask, setActiveTask] = React.useState<string | null>('#welcome');
  const [taskStack, setTaskStack] = React.useState<string[]>(['#welcome']);

  const taskHrefsRef = React.useRef<Set<string>>(new Set());
  const lastHandledHashRef = React.useRef<string | null>(null);

  const patchTask = React.useCallback(
    (href: string, patch: Partial<Task> = {}) => {
      setTasks((current) =>
        current.map((task) =>
          task.href === href ? { ...task, ...patch } : task
        )
      );
    },
    []
  );

  const bringTaskToFront = React.useCallback((href: string) => {
    setActiveTask(href);
    setTaskStack((current) => [
      ...current.filter((taskHref) => taskHref !== href),
      href,
    ]);
  }, []);

  const focusTask = React.useCallback((href: string) => {
    setActiveTask(href);
  }, []);

  const restoreTask = React.useCallback(
    (href: string) => {
      patchTask(href, {
        open: true,
        minimized: false,
      });

      bringTaskToFront(href);
    },
    [bringTaskToFront, patchTask]
  );

  const openTask = React.useCallback(
    (href: string) => {
      if (window.location.hash !== href) {
        lastHandledHashRef.current = href;
        history.pushState(null, '', href);
      }

      restoreTask(href);
    },
    [restoreTask]
  );

  const clearHashIfCurrent = React.useCallback((href: string) => {
    if (window.location.hash !== href) return;

    lastHandledHashRef.current = null;

    history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`
    );
  }, []);

  const closeTask = React.useCallback(
    (href: string) => {
      clearHashIfCurrent(href);

      patchTask(href, {
        open: false,
        minimized: false,
        maximized: false,
      });

      setTaskStack((current) =>
        current.filter((taskHref) => taskHref !== href)
      );

      setActiveTask((current) => (current === href ? null : current));
    },
    [clearHashIfCurrent, patchTask]
  );

  const minimizeTask = React.useCallback(
    (href: string) => {
      patchTask(href, {
        minimized: true,
      });

      setActiveTask((current) => (current === href ? null : current));
    },
    [patchTask]
  );

  const toggleMaximizeTask = React.useCallback(
    (href: string) => {
      setTasks((current) =>
        current.map((task) =>
          task.href === href
            ? {
                ...task,
                maximized: !task.maximized,
                minimized: false,
                open: true,
              }
            : task
        )
      );

      bringTaskToFront(href);
    },
    [bringTaskToFront]
  );

  const getTaskZIndex = React.useCallback(
    (href: string) => {
      const index = taskStack.indexOf(href);
      return index === -1 ? 100 : 100 + index;
    },
    [taskStack]
  );

  const focusWindow = React.useCallback(
    (task: Task) => {
      if (task.mobileDialog) {
        focusTask(task.href);
        return;
      }

      bringTaskToFront(task.href);
    },
    [bringTaskToFront, focusTask]
  );

  React.useEffect(() => {
    taskHrefsRef.current = new Set(tasks.map((task) => task.href));
  }, [tasks]);

  const launchFromHash = React.useCallback(() => {
    const rawHash = window.location.hash || '#welcome';
    const href = taskHrefsRef.current.has(rawHash) ? rawHash : '#welcome';

    if (lastHandledHashRef.current === href) return;

    lastHandledHashRef.current = href;
    restoreTask(href);
  }, [restoreTask]);

  React.useEffect(() => {
    launchFromHash();

    window.addEventListener('hashchange', launchFromHash);
    return () => window.removeEventListener('hashchange', launchFromHash);
  }, [launchFromHash]);

  const lastMobileInlineTaskHref = React.useMemo(
    () => [...tasks].reverse().find((task) => !task.mobileDialog)?.href,
    [tasks]
  );

  const value = React.useMemo<TaskContextValue>(
    () => ({
      tasks,
      activeTask,
      taskStack,
      openTask,
      closeTask,
      minimizeTask,
      restoreTask,
      toggleMaximizeTask,
      bringTaskToFront,
      focusTask,
      focusWindow,
      getTaskZIndex,
      lastMobileInlineTaskHref,
    }),
    [
      tasks,
      activeTask,
      taskStack,
      openTask,
      closeTask,
      minimizeTask,
      restoreTask,
      toggleMaximizeTask,
      bringTaskToFront,
      focusTask,
      focusWindow,
      getTaskZIndex,
      lastMobileInlineTaskHref,
    ]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = React.useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider.');
  }

  return context;
}
