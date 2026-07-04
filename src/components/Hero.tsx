import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { win95, sunken } from '../theme/win95Theme';

export default function Hero() {
  return (
    <Box sx={{ width: '100%' }}>
      <Container>
        <Box
          id="welcome"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '220px 1fr' },
            gap: { xs: 2, sm: 4 },
            alignItems: 'start',
          }}
        >
          <Box
            sx={{
              height: { xs: 180, sm: 340 },
              backgroundColor: win95.desktop,
              boxShadow: sunken,
              border: `1px solid ${win95.highlight}`,
            }}
          />

          <Box sx={{ pt: { xs: 0, sm: 1 } }}>
            <Typography
              variant="h1"
              sx={{
                mb: 4,
                fontSize: { xs: 28, sm: 34 },
                lineHeight: 1.15,
              }}
            >
              Software Engineering Consulting for{' '}
              <b>Web, Cloud, and Product Systems</b>
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
              I help teams design, build, debug, and ship practical software,
              from React frontends to AWS-backed services and database-heavy
              systems.
            </Typography>

            <Button href="#contact" variant="outlined">
              Book consultation
            </Button>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <Button disabled sx={{ px: 3 }}>
            {'< Back'}
          </Button>
          <Button href="#about" autoFocus sx={{ px: 3 }}>
            {'Next >'}
          </Button>
          <Button href="#footer" sx={{ marginLeft: 2, px: 3 }}>
            Cancel
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
