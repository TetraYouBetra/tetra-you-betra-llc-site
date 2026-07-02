import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function EngagementOptions() {
  return (
    <Container
      id="engagement-options"
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
          width: { sm: '100%', md: '70%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Engagement Options
        </Typography>

        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          Whether you need help solving a specific technical problem or a
          long-term engineering partner, engagements can be tailored to fit your
          team's workflow and budget.
        </Typography>

        <List sx={{ textAlign: 'left' }}>
          <ListItem>
            <ListItemText
              primary="Project-Based Development"
              secondary="Ideal for well-defined features, new applications, migrations, integrations, or infrastructure projects. A fixed estimate is provided based on the agreed scope."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Prepaid Engineering Time"
              secondary="Purchase blocks of engineering hours that can be used as needed for development, architecture, debugging, cloud engineering, technical guidance, or ongoing enhancements."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Fractional Engineering Partner"
              secondary="Ongoing monthly support for organizations that need senior engineering leadership without hiring a full-time employee. Perfect for startups, growing teams, or companies with evolving technical needs."
            />
          </ListItem>

          <ListItem>
            <ListItemText
              primary="Hourly Consulting"
              secondary="Best suited for architecture reviews, technical strategy, code reviews, troubleshooting, due diligence, or short-term advisory work."
            />
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
