import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ScrollViewport from './ScrollViewport';
import { sunken, win95 } from '../theme/win95Theme';
import logo32px from '../assets/logo_32px.png';
import folderIcon from '../assets/Chicago95/icons/32/folder.png';
import folderOpenIcon from '../assets/Chicago95/icons/32/folder-drag-accept.png';
import mailIcon from '../assets/Chicago95/icons/32/mail-unread.png';
import mailOpenIcon from '../assets/Chicago95/icons/32/mail-read.png';

import sanjayAvatar from '../assets/Headshots/sanjay.png';
import shahbazAvatar from '../assets/Headshots/shahbaz.png';
import kelynnAvatar from '../assets/Headshots/kelynn.png';

type TreeBranch = {
  hasParentLine?: boolean;
  hasElbow?: boolean;
  isLastChild?: boolean;
};

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
    id: 'sanjay',
    group: 'colleagues',
    avatar: sanjayAvatar,
    name: 'Sanjay R V',
    occupation: 'Senior Full Stack Engineer',
    testimonial: `Tara is the kind of technical leader who makes everyone around her better.

Over two years, I watched her architect and deliver an enterprise-scale React and TypeScript platform processing 50,000+ daily requests with zero downtime - owning decisions across the full stack, from frontend architecture to AWS infrastructure.

What makes her exceptional as a consultant isn't just her technical range - it's her composure. She's clear-headed under pressure, decisive when it matters, and brings out strong work in the people she collaborates with. I'd recommend her without hesitation.`,
  },
  {
    id: 'shahbaz',
    group: 'colleagues',
    avatar: shahbazAvatar,
    name: 'Mohd Shahbaz',
    occupation: 'Full Stack Developer',
    testimonial: `Working with Tara on the Digit project was an awesome opportunity. Collaboration became easy due to her amazing ability to communicate effectively, to be well-organized, and to help people whenever needed.

She delivered her projects without problems, always being sure that all the processes were documented properly. Tara was very important for the smooth running of the project, and I would definitely recommend her as an efficient consultant.`,
  },
  {
    id: 'kelynn',
    group: 'clients',
    avatar: kelynnAvatar,
    name: 'Kelynn Nowakowski',
    occupation: 'Assistant Director',
    testimonial: `TBD`,
  },
];

const placeholderIcons = {
  root: {
    icon: logo32px,
    iconActive: logo32px,
  },
  folder: {
    icon: folderIcon,
    iconActive: folderOpenIcon,
  },
  testimonial: {
    icon: mailIcon,
    iconActive: mailOpenIcon,
  },
};

export default function Testimonials() {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({
    root: true,
    testimonials: true,
    clients: true,
    colleagues: true,
  });

  const selected = testimonials.find((item) => item.id === selectedId) ?? null;
  const clients = testimonials.filter((item) => item.group === 'clients');
  const colleagues = testimonials.filter((item) => item.group === 'colleagues');

  const toggleExpanded = (id: string) => {
    setExpanded((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <Container id="testimonials">
      <Typography component="h2" variant="h4" gutterBottom>
        Testimonials
      </Typography>

      <Typography variant="body1" sx={{ mb: 2 }}>
        The best measure of my work comes from the people I've had the
        opportunity to build alongside. Here are a few words from colleagues and
        clients about their experience working with me.
      </Typography>

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
            <TreeDirectory
              id="root"
              label="Tetra You Betra LLC"
              level={0}
              expanded={expanded.root}
              icon={placeholderIcons.root.icon}
              iconActive={placeholderIcons.root.iconActive}
              onClick={() => toggleExpanded('root')}
            />

            <Collapse in={expanded.root} timeout="auto" unmountOnExit>
              <TreeDirectory
                id="testimonials"
                label="Testimonials"
                level={1}
                expanded={expanded.testimonials}
                icon={placeholderIcons.folder.icon}
                iconActive={placeholderIcons.folder.iconActive}
                onClick={() => toggleExpanded('testimonials')}
                branch={{
                  hasParentLine: true,
                  hasElbow: true,
                  isLastChild: true,
                }}
              />

              <Collapse in={expanded.testimonials} timeout="auto" unmountOnExit>
                <TreeDirectory
                  id="clients"
                  label="Clients"
                  level={2}
                  expanded={expanded.clients}
                  icon={placeholderIcons.folder.icon}
                  iconActive={placeholderIcons.folder.iconActive}
                  onClick={() => toggleExpanded('clients')}
                  branch={{ hasParentLine: true, hasElbow: true }}
                />

                <Collapse in={expanded.clients} timeout="auto" unmountOnExit>
                  {clients.length === 0 ? (
                    <TreeEmpty level={3} label="No client testimonials yet" />
                  ) : (
                    clients.map((testimonial, index) => (
                      <TreeLeaf
                        key={testimonial.id}
                        level={3}
                        label={testimonial.name}
                        selected={selectedId === testimonial.id}
                        icon={placeholderIcons.testimonial.icon}
                        iconActive={placeholderIcons.testimonial.iconActive}
                        onClick={() => setSelectedId(testimonial.id)}
                        branch={{
                          hasParentLine: true,
                          hasElbow: true,
                          isLastChild: index === clients.length - 1,
                        }}
                      />
                    ))
                  )}
                </Collapse>

                <TreeDirectory
                  id="colleagues"
                  label="Colleagues"
                  level={2}
                  expanded={expanded.colleagues}
                  icon={placeholderIcons.folder.icon}
                  iconActive={placeholderIcons.folder.iconActive}
                  onClick={() => toggleExpanded('colleagues')}
                  branch={{
                    hasParentLine: true,
                    hasElbow: true,
                    isLastChild: true,
                  }}
                />

                <Collapse in={expanded.colleagues} timeout="auto" unmountOnExit>
                  {colleagues.map((testimonial, index) => (
                    <TreeLeaf
                      key={testimonial.id}
                      level={3}
                      label={testimonial.name}
                      selected={selectedId === testimonial.id}
                      icon={placeholderIcons.testimonial.icon}
                      iconActive={placeholderIcons.testimonial.iconActive}
                      onClick={() => setSelectedId(testimonial.id)}
                      branch={{
                        hasParentLine: true,
                        hasElbow: true,
                        isLastChild: index === colleagues.length - 1,
                      }}
                    />
                  ))}
                </Collapse>
              </Collapse>
            </Collapse>
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
                    Select a testimonial on the left to view it.
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
                        width: 96,
                        height: 40,
                        boxShadow: sunken,
                        backgroundColor: win95.light,
                        flexShrink: 0,
                      }}
                    >
                      {selected.companyLogo ? (
                        <Box
                          component="img"
                          src={selected.companyLogo}
                          alt=""
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
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

function TreeDirectory({
  label,
  level,
  expanded,
  icon,
  iconActive,
  onClick,
  branch,
}: {
  id: string;
  label: string;
  level: number;
  expanded: boolean;
  icon: string;
  iconActive: string;
  onClick: () => void;
  branch?: TreeBranch;
}) {
  return (
    <TreeRow
      label={label}
      level={level}
      icon={expanded ? iconActive : icon}
      selected={false}
      prefix={expanded ? '▾' : '▸'}
      onClick={onClick}
      branch={branch}
    />
  );
}

function TreeLeaf({
  label,
  level,
  selected,
  icon,
  iconActive,
  onClick,
  branch,
}: {
  label: string;
  level: number;
  selected: boolean;
  icon: string;
  iconActive: string;
  onClick: () => void;
  branch?: TreeBranch;
}) {
  return (
    <TreeRow
      label={label}
      level={level}
      icon={selected ? iconActive : icon}
      selected={selected}
      prefix=""
      onClick={onClick}
      branch={branch}
    />
  );
}

function TreeEmpty({ label, level }: { label: string; level: number }) {
  return (
    <Typography
      sx={{
        pl: `${level * 18 + 18}px`,
        py: '2px',
        fontSize: 12,
        color: win95.disabledText,
        textShadow: `1px 1px 0 ${win95.light}`,
      }}
    >
      {label}
    </Typography>
  );
}

function TreeRow({
  label,
  level,
  icon,
  selected,
  prefix,
  onClick,
  branch,
}: {
  label: string;
  level: number;
  icon: string;
  selected: boolean;
  prefix: string;
  onClick: () => void;
  branch?: TreeBranch;
}) {
  const branchX = level * 18 - 7;

  return (
    <Box
      role="treeitem"
      aria-selected={selected}
      onClick={onClick}
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        minHeight: 22,
        pl: `${level * 18 + 4}px`,
        pr: '4px',
        cursor: 'default',
        userSelect: 'none',
        color: win95.text,
        backgroundColor: selected ? win95.title : 'transparent',

        '&:hover': {
          cursor: 'pointer',
          backgroundColor: selected ? win95.title : win95.light,
        },

        ...(level > 0 &&
          branch?.hasParentLine && {
            '&::before': {
              content: '""',
              position: 'absolute',
              left: `${branchX}px`,
              top: 0,
              bottom: branch.isLastChild ? '50%' : 0,
              borderLeft: `1px dotted ${win95.shadow}`,
            },
          }),

        ...(level > 0 &&
          branch?.hasElbow && {
            '&::after': {
              content: '""',
              position: 'absolute',
              left: `${branchX}px`,
              top: '50%',
              width: 13,
              borderTop: `1px dotted ${win95.shadow}`,
            },
          }),
      }}
    >
      <Box
        component="span"
        sx={{
          width: 12,
          fontSize: 11,
          lineHeight: 1,
          color: selected ? win95.titleText : win95.text,
          position: 'relative',
          zIndex: 1,
          backgroundColor: selected ? win95.title : 'transparent',
        }}
      >
        {prefix}
      </Box>

      <Box
        component="img"
        src={icon}
        alt=""
        sx={{
          width: 16,
          height: 16,
          imageRendering: 'pixelated',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      />

      <Typography
        component="span"
        sx={{
          fontSize: 12,
          lineHeight: 1.2,
          fontWeight: selected ? 700 : 400,
          color: selected ? win95.titleText : win95.text,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
