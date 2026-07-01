import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function About() {
  return (
    <Container
      id="about"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          About
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          I’m Tara, a senior software developer and engineering consultant. I
          work with businesses that need experienced technical help without
          hiring a full-time engineer. My focus is practical software: clean
          architecture, reliable delivery, and systems that are easier to
          maintain after launch.
        </Typography>
      </Box>
    </Container>
  );
}
