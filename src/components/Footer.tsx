import { useState } from 'react';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LegalModal from './LegalModal';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'© '}
      {new Date().getFullYear()}{' '}
      <Link
        href="https://tetrayoubetra.com/"
        sx={{
          color: 'text.secondary',
        }}
      >
        Tetra You Betra LLC. All rights reserved.
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [tosOpen, setTosOpen] = useState(false);

  return (
    <>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <div>
          <Link
            variant="body2"
            onClick={() => setPrivacyOpen(true)}
            href="#privacy-policy"
            sx={{
              color: 'text.secondary',
            }}
          >
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link
            variant="body2"
            onClick={() => setTosOpen(true)}
            href="#terms-of-service"
            sx={{
              color: 'text.secondary',
            }}
          >
            Terms of Service
          </Link>
          <Copyright />
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.secondary' }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="https://github.com/tetrayoubetra"
            aria-label="GitHub"
            sx={{ alignSelf: 'center' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="https://www.linkedin.com/in/tara-wilde-a8141041b/"
            aria-label="LinkedIn"
            sx={{ alignSelf: 'center' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Container>
      <LegalModal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicy />
      </LegalModal>
      <LegalModal
        open={tosOpen}
        onClose={() => setTosOpen(false)}
        title="Terms of Service"
      >
        <TermsOfService />
      </LegalModal>
    </>
  );
}
