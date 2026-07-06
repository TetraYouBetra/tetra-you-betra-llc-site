import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ScrollViewport from './ScrollViewport';
import { sunken, win95 } from '../theme/win95Theme';
import logo32px from '../assets/logo_32px.png';
import folderIcon from '../assets/Chicago95/icons/32/folder.png';
import folderOpenIcon from '../assets/Chicago95/icons/32/folder-drag-accept.png';
import mailIcon from '../assets/Chicago95/icons/32/mail-unread.png';
import mailOpenIcon from '../assets/Chicago95/icons/32/mail-read.png';

import sanjayAvatar from '../assets/Headshots/sanjay.png';
import shahbazAvatar from '../assets/Headshots/shahbaz.png';
import rachanaAvatar from '../assets/Headshots/rachana.png';
import kelynnAvatar from '../assets/Headshots/kelynn.png';

import asuLogo from '../assets/Logos/asu.png';
import oneOriginLogo from '../assets/Logos/oneorigin.png';
import dataslushLogo from '../assets/Logos/dataslush.png';

import TestimonialTree, { TreeNode } from './TestimonialTree';
import { useMediaQuery, useTheme } from '@mui/material';

type Testimonial = {
  id: string;
  group: 'clients' | 'colleagues';
  name: string;
  occupation: string;
  avatar?: string;
  companyLogo?: string;
  testimonial: string;
};

const testimonials: Testimonial[] = [
  {
    id: 'shahbaz',
    group: 'colleagues',
    avatar: shahbazAvatar,
    name: 'Mohd Shahbaz',
    companyLogo: dataslushLogo,
    occupation: 'Full Stack Developer',
    testimonial: `Working with Tara on the Digit project was an awesome opportunity. Collaboration became easy due to her amazing ability to communicate effectively, to be well-organized, and to help people whenever needed.

She delivered her projects without problems, always being sure that all the processes were documented properly. Tara was very important for the smooth running of the project, and I would definitely recommend her as an efficient consultant.`,
  },
  {
    id: 'rachana',
    group: 'colleagues',
    avatar: rachanaAvatar,
    name: 'Rachana Ramchandra Bandapalle',
    companyLogo: oneOriginLogo,
    occupation: 'Manager Solution Delivery',
    testimonial: `TBD`,
  },
  {
    id: 'sanjay',
    group: 'colleagues',
    avatar: sanjayAvatar,
    name: 'Sanjay R V',
    companyLogo: oneOriginLogo,
    occupation: 'Senior Full Stack Engineer',
    testimonial: `Tara is the kind of technical leader who makes everyone around her better.

Over two years, I watched her architect and deliver an enterprise-scale React and TypeScript platform processing 50,000+ daily requests with zero downtime - owning decisions across the full stack, from frontend architecture to AWS infrastructure.

What makes her exceptional as a consultant isn't just her technical range - it's her composure. She's clear-headed under pressure, decisive when it matters, and brings out strong work in the people she collaborates with. I'd recommend her without hesitation.`,
  },
  {
    id: 'kelynn',
    group: 'clients',
    avatar: kelynnAvatar,
    name: 'Kelynn Nowakowski',
    companyLogo: asuLogo,
    occupation: 'Assistant Director, Digit',
    testimonial: `TBD`,
  },
];

export default function Testimonials() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    root: true,
    testimonials: true,
    clients: true,
    colleagues: true,
  });

  const selected = testimonials.find((item) => item.id === selectedId) ?? null;

  const testimonialTree = {
    id: 'root',
    label: 'Tetra You Betra LLC',
    icon: logo32px,
    activeIcon: logo32px,
    children: [
      {
        id: 'testimonials',
        label: 'Testimonials',
        icon: folderIcon,
        activeIcon: folderOpenIcon,
        children: [
          {
            id: 'clients',
            label: 'Clients',
            icon: folderIcon,
            activeIcon: folderOpenIcon,
            children: testimonials
              .filter((item) => item.group === 'clients')
              .map((item) => ({
                id: `testimonial-${item.id}`,
                label: item.name,
                icon: mailIcon,
                activeIcon: mailOpenIcon,
                testimonialId: item.id,
              })),
          },
          {
            id: 'colleagues',
            label: 'Colleagues',
            icon: folderIcon,
            activeIcon: folderOpenIcon,
            children: testimonials
              .filter((item) => item.group === 'colleagues')
              .map((item) => ({
                id: `testimonial-${item.id}`,
                label: item.name,
                icon: mailIcon,
                activeIcon: mailOpenIcon,
                testimonialId: item.id,
              })),
          },
        ],
      },
    ],
  } satisfies TreeNode;

  return (
    <Container id="testimonials" sx={{ padding: '0px' }}>
      <Box sx={{ padding: '4px' }}>
        <Typography component="h2" variant="h4" gutterBottom>
          Testimonials
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          The best measure of my work comes from the people I've had the
          opportunity to build alongside. Here are a few words from colleagues
          and clients about their experience working with me.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '4px',
          minHeight: { xs: 520, sm: 430 },
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: 240 },
            height: { xs: 220, sm: 430 },
            minWidth: 0,
          }}
        >
          <ScrollViewport>
            <TestimonialTree
              tree={testimonialTree}
              selectedId={selectedId}
              expanded={expanded}
              onSelect={setSelectedId}
              onToggle={(id) =>
                setExpanded((current) => ({
                  ...current,
                  [id]: !current[id],
                }))
              }
            />
          </ScrollViewport>
        </Box>

        <Box
          sx={{
            flex: 1,
            height: { xs: 320, sm: 430 },
            minWidth: 0,
          }}
        >
          <ScrollViewport>
            <Box sx={{ p: 1 }}>
              {!selected ? (
                <Box
                  sx={{
                    minHeight: 280,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: win95.disabledText,
                    textShadow: `1px 1px 0 ${win95.light}`,
                  }}
                >
                  <Typography variant="body1">
                    Select a testimonial {isMobile ? 'above' : 'on the left'} to
                    view it.
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        boxShadow: sunken,
                        backgroundColor: win95.face,
                        p: '3px',
                        flexShrink: 0,
                      }}
                    >
                      {selected.avatar ? (
                        <Box
                          component="img"
                          src={selected.avatar}
                          alt=""
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      ) : null}
                    </Box>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h5">{selected.name}</Typography>
                      <Typography variant="body2">
                        {selected.occupation}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        ml: 'auto',
                        width: 'auto',
                        height: 32,
                        flexShrink: 0,
                      }}
                    >
                      {selected.companyLogo ? (
                        <Box
                          component="img"
                          src={selected.companyLogo}
                          alt=""
                          sx={{
                            display: 'block',
                          }}
                        />
                      ) : null}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      p: { xs: 1, sm: 2 },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {selected.testimonial}
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </ScrollViewport>
        </Box>
      </Box>
    </Container>
  );
}
