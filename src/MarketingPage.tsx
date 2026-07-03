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

export default function MarketingPage(props: { disableCustomTheme?: boolean }) {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <WindowFrame
        title="Welcome Wizard.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 500 }}
      >
        <Hero />
      </WindowFrame>
      <WindowFrame
        title="About.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 'auto' }}
      >
        <Win95ScrollViewport maxHeight={500}>
          <About />
        </Win95ScrollViewport>
      </WindowFrame>
      <WindowFrame
        title="Services.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 500 }}
      >
        <Services />
      </WindowFrame>
      <WindowFrame
        title="Testimonials.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 500 }}
      >
        <Testimonials />
      </WindowFrame>
      <WindowFrame
        title="Engagement Options.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 500 }}
      >
        <EngagementOptions />
      </WindowFrame>
      <WindowFrame
        title="Contact.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 'auto' }}
      >
        <Win95ScrollViewport maxHeight={500}>
          <Contact />
        </Win95ScrollViewport>
      </WindowFrame>
      <WindowFrame
        title="Footer.exe"
        defaultPosition={{ x: 64, y: 64 }}
        defaultSize={{ width: 700, height: 500 }}
      >
        <Footer setPrivacyOpen={setPrivacyOpen} setTosOpen={setTosOpen} />
      </WindowFrame>
      {/* Legal Dialogs */}
      <WindowFrame
        dialogMode
        open={privacyOpen}
        title="Privacy Policy.txt"
        defaultSize={{ width: 760, height: 500 }}
        onClose={() => setPrivacyOpen(false)}
      >
        <Win95ScrollViewport>
          <PrivacyPolicy />
        </Win95ScrollViewport>
      </WindowFrame>
      <WindowFrame
        dialogMode
        open={tosOpen}
        title="Terms of Service.txt"
        defaultSize={{ width: 760, height: 500 }}
        onClose={() => setTosOpen(false)}
      >
        <Win95ScrollViewport>
          <TermsOfService />
        </Win95ScrollViewport>
      </WindowFrame>
    </AppTheme>
  );
}
