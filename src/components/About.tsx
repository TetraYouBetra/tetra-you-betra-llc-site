import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import cloudsBg from '../assets/Backgrounds/clouds.png';
import { aboutFontFamily } from '../theme/win95Theme';
import type { SxProps, Theme } from '@mui/material/styles';
import flamingGif from '../assets/Gifs/flamingline.gif';
import questionMarkGif from '../assets/Gifs/question-mark.gif';
import maxwellGif from '../assets/Gifs/maxwell.gif';
import beesGif from '../assets/Gifs/bees.gif';

const highlights = [
  {
    title: 'End-to-End Perspective',
    description:
      'Experience spanning IT support, networking, systems administration, cloud infrastructure, and full-stack software engineering enables me to solve problems across the entire technology stack.',
  },
  {
    title: 'Ownership Mentality',
    description:
      'I naturally take ownership of the systems I build and support, often becoming the technical subject matter expert for the projects I’m involved with.',
  },
  {
    title: 'Pragmatic Solutions',
    description:
      'Every project has tradeoffs. I present clear recommendations alongside practical alternatives so stakeholders can make informed decisions that fit their goals, timeline, and budget.',
  },
  {
    title: 'Curiosity-Driven Engineering',
    description:
      'I genuinely enjoy understanding how technology works. When faced with a difficult problem, I dig into the root cause and work toward solutions that are reliable, maintainable, and built to last.',
  },
];

export default function About() {
  const h1Sx: SxProps<Theme> = {
    textAlign: 'center',
    fontFamily: aboutFontFamily,
    mb: '0px',
    textShadow: '-2px 2px #000000',
    fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
  };

  const h2Sx: SxProps<Theme> = {
    textAlign: 'center',
    fontFamily: aboutFontFamily,
    mb: '0px',
    textShadow: '-2px 2px #000000',
    fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem' },
  };

  const h3Sx: SxProps<Theme> = {
    textAlign: 'center',
    fontFamily: aboutFontFamily,
    fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
  };

  const bodySx: SxProps<Theme> = {
    textAlign: 'center',
    mb: 2,
  };

  const flamingDivider = (
    <Stack direction="row" sx={{ width: '100%' }}>
      {[0, 1].map((item) => (
        <Box
          key={`flamingDivider-${item}`}
          sx={{ position: 'relative', flex: 1 }}
        >
          <Box
            component="img"
            src={flamingGif}
            alt="flaming line gif"
            sx={{ height: 'auto', width: '100%' }}
          />
        </Box>
      ))}
    </Stack>
  );

  return (
    <Container
      id="about"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'background.paper',
        backgroundImage: `url(${cloudsBg})`,
        backgroundRepeat: 'repeat',
      }}
    >
      <Box
        sx={{
          width: { xs: '95%', md: '70%' },
          backgroundColor: '#bbccff',
          padding: 2,
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={maxwellGif}
            alt="maxwell gif"
            sx={{ height: '48px', width: 'auto' }}
          />
          <Typography
            className="rainbow-text"
            component="h2"
            variant="h4"
            gutterBottom
            sx={h1Sx}
          >
            <span>A</span>
            <span>b</span>
            <span>o</span>
            <span>u</span>
            <span>t</span>&nbsp;<span>M</span>
            <span>e</span>
          </Typography>
          <Box
            component="img"
            src={beesGif}
            alt="bees gif"
            sx={{ height: '48px', width: 'auto' }}
          />
        </Stack>

        {flamingDivider}

        <Typography variant="body1" sx={bodySx} component="p" gutterBottom>
          I’m <b>Tara</b>, a senior software developer and engineering
          consultant with a background spanning IT support, networking, systems
          administration, solutions consulting, and full-stack software
          engineering. That breadth of experience allows me to approach problems
          from multiple perspectives, whether they're rooted in application
          code, cloud infrastructure, networking, or system architecture.
        </Typography>

        <Typography variant="body2" sx={bodySx} component="p" gutterBottom>
          I’m driven by curiosity and genuinely enjoy solving difficult
          technical problems. When something isn't working as expected, I don't
          stop at finding a workaround. I dig into the root cause, understand
          why it happened, and build solutions that are practical, maintainable,
          and aligned with the goals of the business.
        </Typography>

        <Typography variant="body2" sx={bodySx} component="p" gutterBottom>
          Every project comes with tradeoffs, and I believe good engineering is
          about making informed decisions. I work closely with stakeholders to
          present thoughtful recommendations, explain the options, and help
          teams choose the approach that best fits their priorities, timeline,
          and budget.
        </Typography>

        {flamingDivider}

        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            width: '100%',
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={questionMarkGif}
            alt="question mark gif"
            sx={{ height: '32px', width: 'auto' }}
          />
          <Typography
            className="rainbow-text"
            component="h3"
            variant="h5"
            gutterBottom
            sx={h2Sx}
          >
            <span>W</span>
            <span>h</span>
            <span>y</span>
            <span>&nbsp;</span>
            <span>W</span>
            <span>o</span>
            <span>r</span>
            <span>k</span>
            <span>&nbsp;</span>
            <span>W</span>
            <span>i</span>
            <span>t</span>
            <span>h</span>
            <span>&nbsp;</span>
            <span>M</span>
            <span>e</span>
            <span>?</span>
          </Typography>
          <Box
            component="img"
            src={questionMarkGif}
            alt="question mark gif"
            sx={{ height: '32px', width: 'auto' }}
          />
        </Stack>

        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' }}>
          Beyond technical expertise, I strive to be the kind of engineering
          partner who brings clarity, ownership, and thoughtful collaboration to
          every project.
        </Typography>

        <Grid container spacing={4}>
          {highlights.map((highlight) => (
            <Grid key={highlight.title} size={{ xs: 12, sm: 6 }}>
              <Typography component="h3" variant="h5" gutterBottom sx={h3Sx}>
                {highlight.title}
              </Typography>

              <Typography sx={{ textAlign: 'center' }} variant="body1">
                {highlight.description}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
