import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const engagements = [
  {
    title: 'Project-Based Development',
    summary: 'Well-defined projects with a clearly scoped outcome.',
    description:
      'Ideal for new applications, major features, migrations, integrations, infrastructure projects, or other initiatives with well-defined requirements. We establish project goals, define the scope together, and work toward agreed-upon deliverables with clear communication throughout the engagement.',
  },
  {
    title: 'Prepaid Engineering Time',
    summary: 'Flexible engineering support that adapts to your priorities.',
    description:
      'Purchase a block of engineering hours to use as needed. This option works well for organizations that have a steady stream of development work but do not require a fixed monthly commitment. Hours can be used for development, cloud engineering, debugging, architecture, code reviews, or technical guidance.',
  },
  {
    title: 'Fractional Engineering Partner',
    summary: 'Senior engineering expertise without a full-time hire.',
    description:
      'Designed for startups and growing teams that need ongoing technical leadership. This engagement provides consistent engineering support, architectural guidance, mentoring, feature development, and long-term planning while remaining flexible as your business evolves.',
  },
  {
    title: 'Hourly Consulting',
    summary: 'Expert guidance for focused technical challenges.',
    description:
      'Perfect for architecture reviews, production incidents, difficult debugging sessions, code reviews, technical due diligence, cloud strategy, or other short-term advisory engagements where you need experienced engineering input without a longer commitment.',
  },
];

export default function EngagementOptions() {
  return (
    <Container
      id="engagement-options"
      sx={{
        pt: { xs: 1, sm: 2 },
        pb: { xs: 1, sm: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '70%' },
          textAlign: { xs: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" gutterBottom>
          Engagement Options
        </Typography>

        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Whether you need help solving a specific technical problem or a
          long-term engineering partner, engagements can be tailored to fit your
          team's workflow, priorities, and budget.
        </Typography>

        <Box sx={{ textAlign: 'left' }}>
          {engagements.map((engagement) => (
            <Accordion key={engagement.title} disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
                <Box>
                  <Typography variant="h6">{engagement.title}</Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {engagement.summary}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Typography sx={{ color: 'text.secondary' }}>
                  {engagement.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
