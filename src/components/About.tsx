import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

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
  return (
    <Container
      id="about"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ textAlign: { xs: 'left', md: 'center' } }}
        >
          About
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2 }}
          component="p"
          gutterBottom
        >
          I’m Tara, a senior software developer and engineering consultant with
          a background spanning IT support, networking, systems administration,
          solutions consulting, and full-stack software engineering. That
          breadth of experience allows me to approach problems from multiple
          perspectives, whether they're rooted in application code, cloud
          infrastructure, networking, or system architecture.
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: 'text.secondary', mb: 2 }}
          component="p"
          gutterBottom
        >
          I’m driven by curiosity and genuinely enjoy solving difficult
          technical problems. When something isn't working as expected, I don't
          stop at finding a workaround. I dig into the root cause, understand
          why it happened, and build solutions that are practical, maintainable,
          and aligned with the goals of the business.
        </Typography>

        <Typography
          variant="body2"
          component="p"
          gutterBottom
          sx={{ color: 'text.secondary', mb: 2 }}
        >
          Every project comes with tradeoffs, and I believe good engineering is
          about making informed decisions. I work closely with stakeholders to
          present thoughtful recommendations, explain the options, and help
          teams choose the approach that best fits their priorities, timeline,
          and budget.
        </Typography>

        <Box
          sx={{
            mt: 6,
            pt: 6,
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Why Work With Me?
          </Typography>

          <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
            Beyond technical expertise, I strive to be the kind of engineering
            partner who brings clarity, ownership, and thoughtful collaboration
            to every project.
          </Typography>

          <Grid container spacing={4}>
            {highlights.map((highlight) => (
              <Grid key={highlight.title} size={{ xs: 12, sm: 6 }}>
                <Typography variant="h6" gutterBottom>
                  {highlight.title}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {highlight.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
