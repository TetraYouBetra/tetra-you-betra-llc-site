import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="welcome"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',

        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 1, sm: 2 },
          pb: { xs: 1, sm: 2 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: 'clamp(2rem, 10vw, 2.5rem)',
            }}
          >
            Software Engineering Consulting for{' '}
            <Box
              component="span"
              sx={{
                display: 'inline',
                background:
                  'linear-gradient(90deg, #ff2bd6 35%, #7a2cff 55%, #22d9ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Web, Cloud, and Product Systems
            </Box>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            I help teams design, build, debug, and ship practical software, from
            React frontends to AWS-backed services and database-heavy systems.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            sx={{
              pt: 2,
              width: { xs: '100%', sm: '350px' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ minWidth: 'fit-content' }}
              href="#contact"
            >
              Book a consultation
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
