import { useState } from 'react';
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
import iconAbout from './assets/Chicago95/icons/32/system-help.png';
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
  onClick?: () => void;
}

export default function YouBetraOS(props: { disableCustomTheme?: boolean }) {
  const [activeTask, setActiveTask] = useState<string | null>('#welcome');
  const [tasks, setTasks] = useState<Task[]>([
    {
      label: 'Welcome.exe',
      href: '#welcome',
      icon: iconHero,
      initialFocused: true,
      component: (
        <ScrollViewport>
          <Hero />
        </ScrollViewport>
      ),
      open: true,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 1 * 24,
        y: 64 + 1 * 24,
      },
      defaultSize: { width: 700, height: 500 },
      onClick: () => {
        setActiveTask('#welcome');
      },
    },
    {
      label: 'About.exe',
      href: '#about',
      icon: iconAbout,
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
      onClick: () => {
        setActiveTask('#about');
      },
    },
    {
      label: 'Services.exe',
      href: '#services',
      icon: iconServices,
      component: (
        <ScrollViewport>
          <Services />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 3 * 24,
        y: 64 + 3 * 24,
      },
      defaultSize: { width: 700, height: 500 },
      onClick: () => {
        setActiveTask('#services');
      },
    },
    {
      label: 'Testimonials.exe',
      href: '#testimonials',
      icon: iconTestimonials,
      component: (
        <ScrollViewport>
          <Testimonials />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 4 * 24,
        y: 64 + 4 * 24,
      },
      defaultSize: { width: 700, height: 500 },
      onClick: () => {
        setActiveTask('#testimonials');
      },
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
      onClick: () => {
        setActiveTask('#engagement-options');
      },
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
      onClick: () => {
        setActiveTask('#contact');
      },
    },
    {
      label: 'Footer.exe',
      href: '#footer',
      icon: iconContact,
      component: (
        <ScrollViewport>
          <Footer />
        </ScrollViewport>
      ),
      open: false,
      minimized: false,
      maximized: false,
      defaultPosition: {
        x: 64 + 7 * 24,
        y: 64 + 7 * 24,
      },
      defaultSize: { width: 700, height: 500 },
      onClick: () => {
        setActiveTask('#footer');
      },
    },
    {
      label: 'Privacy Policy.exe',
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
      onClick: () => {
        setActiveTask('#privacy-policy');
      },
    },
    {
      label: 'Terms of Service.exe',
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
      onClick: () => {
        setActiveTask('#terms-of-service');
      },
    },
  ]);

  const updateTask = (href: string, patch: Partial<Task>) => {
    setTasks((current) =>
      current.map((task) => (task.href === href ? { ...task, ...patch } : task))
    );
    if (patch.minimized === true) {
      setActiveTask(null);
    } else {
      setActiveTask(href);
    }
  };

  const restoreTask = (href: string) => {
    setActiveTask(href);
    updateTask(href, {
      open: true,
      minimized: false,
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar
        tasks={tasks}
        activeTask={activeTask}
        onTaskClick={restoreTask}
      />
      <Desktop tasks={tasks} onTaskOpen={restoreTask} />
      <Box sx={{ marginTop: `${win95TaskBarHeight}px` }}>
        {tasks.map((task) => (
          <WindowFrame
            key={task.href}
            task={task}
            onClose={() =>
              updateTask(task.href, {
                open: false,
                minimized: false,
                maximized: false,
              })
            }
            onMinimize={() =>
              updateTask(task.href, {
                minimized: true,
              })
            }
            onMaximize={() =>
              updateTask(task.href, {
                maximized: !task.maximized,
                minimized: false,
                open: true,
              })
            }
          >
            {task.component}
          </WindowFrame>
        ))}
      </Box>
    </AppTheme>
  );
}
