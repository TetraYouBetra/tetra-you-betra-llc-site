import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
          Engagement Options
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ color: 'text.secondary' }}
        >
          <List>
            <ListItem>Hourly consulting</ListItem>
            <ListItem>Prepaid blocks of time</ListItem>
            <ListItem>Project-based estimates</ListItem>
            <ListItem>Ongoing fractional engineering support</ListItem>
          </List>
        </Typography>
      </Box>
    </Container>
  );
}
