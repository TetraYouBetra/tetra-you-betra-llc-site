import { useCallback, useEffect, useRef, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppTheme from './theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import About from './components/About';
import EngagementOptions from './components/EngagementOptions';
import Contact from './components/Contact';
import WindowFrame from './components/WindowFrame';
import ScrollViewport from './components/ScrollViewport';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import iconHero from './assets/Chicago95/icons/32/application-default-icon.png';
import iconAboutMe from './assets/Chicago95/icons/32/emblem-web.png';
import iconFooter from './assets/Chicago95/icons/32/system-help.png';
import iconServices from './assets/Chicago95/icons/32/emblem-system.png';
import iconTestimonials from './assets/Chicago95/icons/32/stock_people.png';
import iconEngagementOptions from './assets/Chicago95/icons/32/folder-documents.png';
import iconContact from './assets/Chicago95/icons/32/mail-outbox-old.png';
import Box from '@mui/material/Box';
import { win95TaskBarHeight } from './theme/win95Theme';
import Desktop from './components/Desktop';

export interface Task {
  label: string;
  href: string;
  icon?: string;
  component?: React.ReactNode;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height?: number | string };
  initialFocused?: boolean;
  mobileDialog?: boolean;
}

export default function YouBetraOS(props: { disableCustomTheme?: boolean }) {
  const [activeTask, setActiveTask] = useState<string | null>('#welcome');
  const [tasks, setTasks] = useState<Task[]>([
    {
      label: 'Welcome.exe',
      href: '#welcome',
      icon: iconHero,
      initialFocused: true,
      component: <Hero />,
      open: true,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 1 * 24,
        y: 64 + 1 * 24,
      },
      defaultSize: { width: 700, height: 'auto' },
    },
    {
      label: 'About Me.html',
      href: '#about',
      icon: iconAboutMe,
      component: (
        <ScrollViewport>
          <About />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 2 * 24,
        y: 64 + 2 * 24,
      },
      defaultSize: { width: 700, height: 500 },
    },
    {
      label: 'Services.exe',
      href: '#services',
      icon: iconServices,
      component: <Services />,
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 3 * 24,
        y: 64 + 3 * 24,
      },
      defaultSize: { width: 700, height: 'auto' },
    },
    {
      label: 'Testimonials.exe',
      href: '#testimonials',
      icon: iconTestimonials,
      component: <Testimonials />,
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 4 * 24,
        y: 64 + 4 * 24,
      },
      defaultSize: { width: 700, height: 'auto' },
    },
    {
      label: 'Engagement Options.exe',
      href: '#engagement-options',
      icon: iconEngagementOptions,
      component: (
        <ScrollViewport>
          <EngagementOptions />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 5 * 24,
        y: 64 + 5 * 24,
      },
      defaultSize: { width: 700, height: 500 },
    },
    {
      label: 'Contact.exe',
      href: '#contact',
      icon: iconContact,
      component: (
        <ScrollViewport>
          <Contact />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 6 * 24,
        y: 64 + 6 * 24,
      },
      defaultSize: { width: 700, height: 500 },
    },
    {
      label: 'Footer.exe',
      href: '#footer',
      icon: iconFooter,
      component: <Footer />,
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 7 * 24,
        y: 64 + 7 * 24,
      },
      defaultSize: { width: 700, height: 'auto' },
    },
    {
      label: 'Privacy Policy.rtf',
      href: '#privacy-policy',
      icon: iconContact,
      component: (
        <ScrollViewport>
          <PrivacyPolicy />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 8 * 24,
        y: 64 + 8 * 24,
      },
      defaultSize: { width: 700, height: 500 },
      mobileDialog: true,
    },
    {
      label: 'Terms of Service.rtf',
      href: '#terms-of-service',
      icon: iconContact,
      component: (
        <ScrollViewport>
          <TermsOfService />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 9 * 24,
        y: 64 + 9 * 24,
      },
      defaultSize: { width: 700, height: 500 },
      mobileDialog: true,
    },
  ]);
  const taskHrefsRef = useRef<Set<string>>(new Set());
  const lastHandledHashRef = useRef<string | null>(null);

  const [taskStack, setTaskStack] = useState<string[]>(['#welcome']);

  const patchTask = useCallback((href: string, patch: Partial<Task> = {}) => {
    setTasks((current) =>
      current.map((task) => (task.href === href ? { ...task, ...patch } : task))
    );
  }, []);

  const bringToFront = useCallback((href: string) => {
    setActiveTask(href);

    setTaskStack((current) => [
      ...current.filter((taskHref) => taskHref !== href),
      href,
    ]);
  }, []);

  const focusTask = (href: string) => {
    setActiveTask(href);
  };

  const restoreTask = useCallback(
    (href: string) => {
      patchTask(href, {
        open: true,
        minimized: false,
      });

      bringToFront(href);
    },
    [bringToFront, patchTask]
  );

  useEffect(() => {
    taskHrefsRef.current = new Set(tasks.map((task) => task.href));
  }, [tasks]);

  const launchFromHash = useCallback(() => {
    const rawHash = window.location.hash || '#welcome';
    const href = taskHrefsRef.current.has(rawHash) ? rawHash : '#welcome';

    if (lastHandledHashRef.current === href) return;

    lastHandledHashRef.current = href;
    restoreTask(href);
  }, [restoreTask]);

  useEffect(() => {
    launchFromHash();

    window.addEventListener('hashchange', launchFromHash);
    return () => window.removeEventListener('hashchange', launchFromHash);
  }, [launchFromHash]);

  const getTaskZIndex = (href: string) => {
    const index = taskStack.indexOf(href);
    return index === -1 ? 100 : 100 + index;
  };

  const focusWindow = (task: Task) => {
    if (task.mobileDialog) {
      focusTask(task.href);
      return;
    }

    bringToFront(task.href);
  };

  const clearHashIfCurrent = (href: string) => {
    if (window.location.hash !== href) return;

    lastHandledHashRef.current = null;

    history.replaceState(
      null,
      '',
      `${window.location.pathname}${window.location.search}`
    );
  };

  const openTaskFromUi = useCallback(
    (href: string) => {
      if (window.location.hash !== href) {
        lastHandledHashRef.current = href;
        history.pushState(null, '', href);
      }

      restoreTask(href);
    },
    [restoreTask]
  );

  const lastMobileInlineTaskHref = [...tasks]
    .reverse()
    .find((task) => !task.mobileDialog)?.href;

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar
        tasks={tasks}
        activeTask={activeTask}
        onTaskClick={openTaskFromUi}
      />
      <Desktop tasks={tasks} onTaskOpen={openTaskFromUi} />
      <Box sx={{ marginTop: `${win95TaskBarHeight}px` }}>
        {tasks.map((task) => (
          <WindowFrame
            key={task.href}
            task={task}
            active={activeTask === task.href}
            zIndex={getTaskZIndex(task.href)}
            onFocusWindow={() => focusWindow(task)}
            onClose={() => {
              clearHashIfCurrent(task.href);

              patchTask(task.href, {
                open: false,
                minimized: false,
                maximized: false,
              });

              setTaskStack((current) =>
                current.filter((taskHref) => taskHref !== task.href)
              );

              setActiveTask((current) =>
                current === task.href ? null : current
              );
            }}
            onMinimize={() => {
              patchTask(task.href, {
                minimized: true,
              });

              setActiveTask((current) =>
                current === task.href ? null : current
              );
            }}
            onMaximize={() => {
              patchTask(task.href, {
                maximized: !task.maximized,
                minimized: false,
                open: true,
              });

              bringToFront(task.href);
            }}
            isLastMobileInlineTask={task.href === lastMobileInlineTaskHref}
          >
            {task.component}
          </WindowFrame>
        ))}
      </Box>
    </AppTheme>
  );
}
