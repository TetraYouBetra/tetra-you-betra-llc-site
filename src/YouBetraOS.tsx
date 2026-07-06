import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

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
import Desktop from './components/Desktop';
import ErrorBoundary from './ErrorBoundary';
import Explorer from './components/Explorer';

import { win95TaskBarHeight } from './theme/win95Theme';
import { TaskProvider, useTasks, type Task } from './contexts/TaskContext';

import iconHero from './assets/Chicago95/icons/32/application-default-icon.png';
import iconAboutMe from './assets/Chicago95/icons/32/emblem-web.png';
import iconFooter from './assets/Chicago95/icons/32/system-help.png';
import iconServices from './assets/Chicago95/icons/32/emblem-system.png';
import iconTestimonials from './assets/Chicago95/icons/32/stock_people.png';
import iconMyComputer from './assets/Chicago95/icons/32/computer.png';
import iconEngagementOptions from './assets/Chicago95/icons/32/folder-documents.png';
import iconContact from './assets/Chicago95/icons/32/mail-outbox-old.png';
import recycleBinIcon from './assets/Chicago95/icons/32/user-trash.png';

const initialTasks: Task[] = [
  {
    label: 'My Computer',
    href: '#computer',
    icon: iconMyComputer,
    initialFocused: false,
    component: <Explorer />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    canMaximize: true,
    defaultPosition: { x: 64 + 1 * 24, y: 64 + 1 * 24 },
    defaultSize: { width: 700, height: 'auto' },
    desktopOnly: true,
  },
  {
    label: 'Welcome',
    href: '#welcome',
    icon: iconHero,
    initialFocused: true,
    component: <Hero />,
    open: true,
    minimized: false,
    maximized: false,
    canMinimize: true,
    defaultPosition: { x: 64 + 1 * 24, y: 64 + 1 * 24 },
    defaultSize: { width: 700, height: 'auto' },
  },
  {
    label: 'About Me',
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
    canMinimize: true,
    canMaximize: true,
    defaultPosition: { x: 64 + 2 * 24, y: 64 + 2 * 24 },
    defaultSize: { width: 700, height: 500 },
  },
  {
    label: 'Services',
    href: '#services',
    icon: iconServices,
    component: <Services />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    defaultPosition: { x: 64 + 3 * 24, y: 64 + 3 * 24 },
    defaultSize: { width: 700, height: 'auto' },
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
    icon: iconTestimonials,
    component: <Testimonials />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    defaultPosition: { x: 64 + 4 * 24, y: 64 + 4 * 24 },
    defaultSize: { width: 700, height: 'auto' },
  },
  {
    label: 'Engagement Options',
    href: '#engagement-options',
    icon: iconEngagementOptions,
    component: <EngagementOptions />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    canMaximize: true,
    defaultPosition: { x: 64 + 5 * 24, y: 64 + 5 * 24 },
    defaultSize: { width: 700, height: 'auto' },
  },
  {
    label: 'Contact',
    href: '#contact',
    icon: iconContact,
    component: <Contact />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    defaultPosition: { x: 64 + 6 * 24, y: 64 + 6 * 24 },
    defaultSize: { width: 700, height: 'auto' },
  },
  {
    label: 'Recycle Bin',
    href: '#recycle-bin',
    icon: recycleBinIcon,
    initialFocused: false,
    component: <Explorer initialPath="/Recycle Bin" />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    canMaximize: true,
    defaultPosition: { x: 64 + 2 * 24, y: 64 + 2 * 24 },
    defaultSize: { width: 700, height: 'auto' },
    desktopOnly: true,
  },
  {
    label: 'Footer',
    href: '#footer',
    icon: iconFooter,
    component: <Footer />,
    open: false,
    minimized: false,
    maximized: false,
    canMinimize: true,
    defaultPosition: { x: 64 + 7 * 24, y: 64 + 7 * 24 },
    defaultSize: { width: 700, height: 'auto' },
  },
  {
    label: 'Privacy Policy',
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
    canMinimize: true,
    canMaximize: true,
    defaultPosition: { x: 64 + 8 * 24, y: 64 + 8 * 24 },
    defaultSize: { width: 700, height: 500 },
    mobileDialog: true,
  },
  {
    label: 'Terms of Service',
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
    canMinimize: true,
    canMaximize: true,
    defaultPosition: { x: 64 + 9 * 24, y: 64 + 9 * 24 },
    defaultSize: { width: 700, height: 500 },
    mobileDialog: true,
  },
];

export default function YouBetraOS(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <ErrorBoundary>
        <TaskProvider initialTasks={initialTasks}>
          <YouBetraOSShell />
        </TaskProvider>
      </ErrorBoundary>
    </AppTheme>
  );
}

function YouBetraOSShell() {
  const {
    tasks,
    activeTask,
    closeTask,
    minimizeTask,
    toggleMaximizeTask,
    focusWindow,
    getTaskZIndex,
    lastMobileInlineTaskHref,
  } = useTasks();

  return (
    <>
      <CssBaseline enableColorScheme />

      <AppAppBar />

      <Desktop />

      <Box
        sx={{
          mt: `${win95TaskBarHeight}px`,
          display: { xs: 'flex', sm: 'block' },
          flexDirection: 'column',
          gap: { xs: 2, sm: 0 },
          pb: { xs: 2, sm: 0 },
        }}
      >
        {tasks.map((task) => (
          <WindowFrame
            key={task.href}
            task={task}
            active={activeTask === task.href}
            zIndex={getTaskZIndex(task.href)}
            onFocusWindow={() => focusWindow(task)}
            onClose={() => closeTask(task.href)}
            onMinimize={
              task.canMinimize ? () => minimizeTask(task.href) : undefined
            }
            onMaximize={
              task.canMaximize ? () => toggleMaximizeTask(task.href) : undefined
            }
            isLastMobileInlineTask={task.href === lastMobileInlineTaskHref}
          >
            {task.component}
          </WindowFrame>
        ))}
      </Box>
    </>
  );
}
