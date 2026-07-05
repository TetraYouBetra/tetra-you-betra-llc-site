import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { raised, sunken, win95 } from '../theme/win95Theme';
import Win95Tabs from './Win95Tabs';

import fullstackImage from '../assets/fullstack.png';
import cloudImage from '../assets/cloud.png';
import architectureImage from '../assets/architecture.png';
import debuggingImage from '../assets/debugging.png';
import edTechImage from '../assets/edtech.png';

const items = [
  {
    title: 'Full-Stack',
    value: 'full-stack',
    description:
      'React, TypeScript, Node.js, APIs, dashboards, and internal tools.',
    image: fullstackImage,
  },
  {
    title: 'Cloud',
    value: 'cloud',
    description:
      'AWS Lambda, API Gateway, RDS, deployment pipelines, and infrastructure cleanup.',
    image: cloudImage,
  },
  {
    title: 'Architecture',
    value: 'architecture',
    description:
      'System design, database modeling, integrations, scalability, and technical roadmaps.',
    image: architectureImage,
  },
  {
    title: 'Debugging',
    value: 'debugging',
    description:
      'Performance issues, broken deployments, production bugs, and brittle systems.',
    image: debuggingImage,
  },
  {
    title: 'EdTech',
    value: 'edtech',
    description:
      'LTI 1.3, Canvas, Blackboard, Moodle, grade passback, deep linking, and education platform integrations.',
    image: edTechImage,
  },
];

export default function Services() {
  const [selectedValue, setSelectedValue] = React.useState(items[0].value);
  const selected =
    items.find((item) => item.value === selectedValue) ?? items[0];

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

      <Box sx={{ backgroundColor: win95.face }}>
        <Win95Tabs
          value={selectedValue}
          onChange={setSelectedValue}
          tabs={items.map((item) => ({
            value: item.value,
            label: item.title,
          }))}
        />

        <Box
          role="tabpanel"
          sx={{
            position: 'relative',
            zIndex: 0,
            backgroundColor: win95.face,
            boxShadow: raised,
            minHeight: 360,
            p: 2,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: 'stretch',
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', sm: 260 },
              height: { xs: 180, sm: 'auto' },
              minHeight: { sm: 320 },
              backgroundColor: win95.light,
              boxShadow: sunken,
              p: '4px',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${selected.image})`,
                backgroundSize: 'cover',
                backgroundPositionX: 'center',
                backgroundPositionY: 'top',
                display: 'block',
                backgroundColor: win95.black,
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" gutterBottom>
              {selected.title}
            </Typography>

            <Typography variant="body1">{selected.description}</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
