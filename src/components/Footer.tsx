import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Copyright() {
  return (
    <Typography variant="body1" sx={{ mt: 1 }}>
      {'© '}
      {new Date().getFullYear()}{' '}
      <Link href="https://tetrayoubetra.com/">Tetra You Betra LLC</Link>. All
      rights reserved.
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      <Container
        id="footer"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: { xs: 4, sm: 8 },
          textAlign: 'left',
        }}
      >
        <div>
          <Link variant="body1" href="#privacy-policy">
            Privacy Policy
          </Link>
          <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
            &nbsp;•&nbsp;
          </Typography>
          <Link variant="body1" href="#terms-of-service">
            Terms of Service
          </Link>
          <Copyright />

          <Link variant="body1" href="https://github.com/grassmunk/Chicago95">
            Pixel icons based on the Chicago95 project.
          </Link>
        </div>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ justifyContent: 'left', color: 'text.primary' }}
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
    </>
  );
}
