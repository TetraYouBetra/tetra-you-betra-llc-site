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
import Win95ScrollViewport from './components/Win95ScrollViewport';
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
export interface Task {
  label: string;
  href: string;
  icon?: string;
  component?: React.ReactNode;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
}

const initialTasks: Task[] = [
  {
    label: 'Welcome',
    href: '#welcome',
    icon: iconHero,
    component: (
      <Win95ScrollViewport>
        <Hero />
      </Win95ScrollViewport>
    ),
    open: true,
    minimized: false,
    maximized: false,
  },
  {
    label: 'About',
    href: '#about',
    icon: iconAbout,
    component: (
      <Win95ScrollViewport>
        <About />
      </Win95ScrollViewport>
    ),
    open: true,
    minimized: false,
    maximized: false,
  },
  {
    label: 'Services',
    href: '#services',
    icon: iconServices,
    component: (
      <Win95ScrollViewport>
        <Services />
      </Win95ScrollViewport>
    ),
    open: true,
    minimized: false,
    maximized: false,
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
    icon: iconTestimonials,
    component: (
      <Win95ScrollViewport>
        <Testimonials />
      </Win95ScrollViewport>
    ),
    open: true,
    minimized: false,
    maximized: false,
  },
  {
    label: 'Engagement Options',
    href: '#engagement-options',
    icon: iconEngagementOptions,
    component: (
      <Win95ScrollViewport>
        <EngagementOptions />
      </Win95ScrollViewport>
    ),
    open: true,
    minimized: false,
    maximized: false,
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: iconContact,
    component: (
      <Win95ScrollViewport>
        <Contact />
      </Win95ScrollViewport>
    ),
    open: true,
    minimized: false,
    maximized: false,
  },
];

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);

  const updateTask = (href: string, patch: Partial<Task>) => {
    setTasks((current) =>
      current.map((task) => (task.href === href ? { ...task, ...patch } : task))
    );
  };

  const restoreTask = (href: string) => {
    updateTask(href, {
      open: true,
      minimized: false,
    });
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar tasks={tasks} onTaskClick={restoreTask} />
      <Box sx={{ marginTop: `${win95TaskBarHeight}px` }}>
        {tasks.map((task, index) => (
          <WindowFrame
            key={task.href}
            title={`${task.label}.exe`}
            defaultPosition={{
              x: 64 + index * 24,
              y: 64 + index * 24,
            }}
            defaultSize={{ width: 700, height: 500 }}
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

        {/* Footer */}
        <WindowFrame
          task={{
            label: 'Footer',
            href: '#footer',
            open: true,
            minimized: false,
            maximized: false,
          }}
          title="Footer.exe"
          defaultPosition={{ x: 64, y: 64 }}
          defaultSize={{ width: 700, height: 300 }}
        >
          <Footer setPrivacyOpen={setPrivacyOpen} setTosOpen={setTosOpen} />
        </WindowFrame>
        {/* Legal Dialogs */}
        <WindowFrame
          task={{
            label: 'Privacy Policy',
            href: '#privacy',
            open: privacyOpen,
            minimized: false,
            maximized: false,
          }}
          dialogMode
          title="Privacy Policy.txt"
          defaultSize={{ width: 760, height: 500 }}
          onClose={() => setPrivacyOpen(false)}
        >
          <Win95ScrollViewport>
            <PrivacyPolicy />
          </Win95ScrollViewport>
        </WindowFrame>
        <WindowFrame
          task={{
            label: 'Terms of Service',
            href: '#tos',
            open: tosOpen,
            minimized: false,
            maximized: false,
          }}
          dialogMode
          title="Terms of Service.txt"
          defaultSize={{ width: 760, height: 500 }}
          onClose={() => setTosOpen(false)}
        >
          <Win95ScrollViewport>
            <TermsOfService />
          </Win95ScrollViewport>
        </WindowFrame>
      </Box>
    </AppTheme>
  );
}
