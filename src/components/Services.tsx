import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { raised, sunken, win95 } from '../theme/win95Theme';

const items = [
  {
    title: 'Full-Stack',
    description:
      'React, TypeScript, Node.js, APIs, dashboards, and internal tools.',
    image:
      'https://mui.com/static/images/templates/templates-images/dash-dark.png',
  },
  {
    title: 'Cloud',
    description:
      'AWS Lambda, API Gateway, RDS, deployment pipelines, and infrastructure cleanup.',
    image:
      'https://mui.com/static/images/templates/templates-images/mobile-dark.png',
  },
  {
    title: 'Architecture',
    description:
      'System design, database modeling, integrations, scalability, and technical roadmaps.',
    image:
      'https://mui.com/static/images/templates/templates-images/devices-dark.png',
  },
  {
    title: 'Debugging',
    description:
      'Performance issues, broken deployments, production bugs, and brittle systems.',
    image:
      'https://mui.com/static/images/templates/templates-images/devices-dark.png',
  },
  {
    title: 'EdTech',
    description:
      'LTI 1.3, Canvas, Blackboard, Moodle, grade passback, deep linking, and education platform integrations.',
    image:
      'https://mui.com/static/images/templates/templates-images/devices-dark.png',
  },
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const selected = items[selectedIndex];

  return (
    <Container id="services">
      <Typography component="h2" variant="h4" gutterBottom>
        Services
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        From strategy and architecture to implementation and long-term support,
        I provide hands-on software engineering expertise to help teams build
        reliable software, solve complex technical challenges, and deliver with
        confidence.
      </Typography>

      <Box
        sx={{
          backgroundColor: win95.face,
        }}
      >
        <Tabs
          value={selectedIndex}
          onChange={(_, value) => setSelectedIndex(value)}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="Services tabs"
          sx={{
            mb: '-1px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {items.map((item) => (
            <Tab key={item.title} label={item.title} />
          ))}
        </Tabs>

        <Box
          role="tabpanel"
          sx={{
            backgroundColor: win95.face,
            boxShadow: raised,
            minHeight: 360,
            p: 2,
          }}
        >
          <Box
            sx={{
              mx: 'auto',
              mb: 2,
              width: { xs: '100%', sm: 360 },
              maxWidth: '100%',
              height: { xs: 180, sm: 240 },
              backgroundColor: win95.light,
              boxShadow: sunken,
              p: '4px',
            }}
          >
            <Box
              component="img"
              src={selected.image}
              alt=""
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>

          <Typography variant="h5" gutterBottom>
            {selected.title}
          </Typography>

          <Typography variant="body1">{selected.description}</Typography>
        </Box>
      </Box>
    </Container>
  );
}
