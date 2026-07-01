import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from './theme/AppTheme';
import AppAppBar from './components/AppAppBar';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import About from './components/About';
import EngagementOptions from './components/EngagementOptions';
import Contact from './components/Contact';

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <Services />
        <Divider />
        <Testimonials />
        <Divider />
        <About />
        <Divider />
        <EngagementOptions />
        <Divider />
        <Contact />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
