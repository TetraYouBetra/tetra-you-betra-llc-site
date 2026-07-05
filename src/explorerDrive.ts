import driveIcon from './assets/Chicago95/icons/32/drive-harddisk.png';
import briefcaseIcon from './assets/Chicago95/icons/32/folder-documents.png';
import briefcaseOpenIcon from './assets/Chicago95/icons/32/folder-documents-open.png';
import folderIcon from './assets/Chicago95/icons/32/folder.png';
import folderOpenIcon from './assets/Chicago95/icons/32/folder-drag-accept.png';
import fileIcon from './assets/Chicago95/icons/32/emblem-documents.png';
import txtIcon from './assets/Chicago95/icons/32/text-x-readme.png';
import pictureIcon from './assets/Chicago95/icons/32/folder-pictures.png';
import pictureOpenIcon from './assets/Chicago95/icons/32/folder-pictures-open.png';
import gameIcon from './assets/Chicago95/icons/32/applications-accessories.png';
import recycleBinIcon from './assets/Chicago95/icons/32/user-trash.png';
import planIcon from './assets/Chicago95/icons/32/plan.png';
// import recycleBinFullIcon from './assets/Chicago95/icons/32/user-trash-full.png';

export type ExplorerDocument = {
  type: 'document';
  title: string;
  summary?: string;
  body: string;
  icon: string;
};

export type ExplorerViewMode = 'list' | 'icon';

export type ExplorerDirectory = {
  type: 'directory';
  title: string;
  summary?: string;
  icon: string;
  activeIcon: string;
  defaultView?: ExplorerViewMode;
  children: Record<string, ExplorerNode>;
};

export type ExplorerNode = ExplorerDirectory | ExplorerDocument;

export const explorerDrive: ExplorerDirectory = {
  type: 'directory',
  title: 'C:',
  icon: driveIcon,
  activeIcon: driveIcon,
  summary: 'Local Disk',
  children: {
    'Engagement Options': {
      type: 'directory',
      title: 'Engagement Options',
      defaultView: 'list',
      icon: briefcaseIcon,
      activeIcon: briefcaseOpenIcon,
      summary:
        "Whether you need help solving a specific technical problem or a long-term engineering partner, engagements can be tailored to fit your team's workflow, priorities, and budget.",
      children: {
        'Project-Based Development.rtf': {
          type: 'document',
          title: 'Project-Based Development',
          summary: 'Well-defined projects with a clearly scoped outcome.',
          icon: planIcon,
          body: `Ideal for new applications, major features, migrations, integrations, infrastructure projects, or other initiatives with well-defined requirements. We establish project goals, define the scope together, and work toward agreed-upon deliverables with clear communication throughout the engagement.`,
        },
        'Prepaid Engineering Time.rtf': {
          type: 'document',
          title: 'Prepaid Engineering Time',
          summary:
            'Flexible engineering support that adapts to your priorities.',
          icon: planIcon,
          body: `Purchase a block of engineering hours to use as needed. This option works well for organizations that have a steady stream of development work but do not require a fixed monthly commitment. Hours can be used for development, cloud engineering, debugging, architecture, code reviews, or technical guidance.`,
        },
        'Fractional Engineering Partner.rtf': {
          type: 'document',
          title: 'Fractional Engineering Partner',
          summary: 'Senior engineering expertise without a full-time hire.',
          icon: planIcon,
          body: `Designed for startups and growing teams that need ongoing technical leadership. This engagement provides consistent engineering support, architectural guidance, mentoring, feature development, and long-term planning while remaining flexible as your business evolves.`,
        },
        'Hourly Consulting.rtf': {
          type: 'document',
          title: 'Hourly Consulting',
          summary: 'Expert guidance for focused technical challenges.',
          icon: planIcon,
          body: `Perfect for architecture reviews, production incidents, difficult debugging sessions, code reviews, technical due diligence, cloud strategy, or other short-term advisory engagements where you need experienced engineering input without a longer commitment.`,
        },
      },
    },

    Documents: {
      type: 'directory',
      title: 'Documents',
      defaultView: 'icon',
      icon: folderIcon,
      activeIcon: folderOpenIcon,
      summary: 'Assorted documents, notes, and digital pocket lint.',
      children: {
        'README.txt': {
          type: 'document',
          title: 'README',
          summary: 'A tiny note from the filesystem.',
          icon: txtIcon,
          body: `Welcome to the faux hard drive.

This Explorer app is reusable. Other window apps can launch directly into any folder by passing an initialPath prop.`,
        },
      },
    },

    Pictures: {
      type: 'directory',
      title: 'Pictures',
      defaultView: 'icon',
      icon: pictureIcon,
      activeIcon: pictureOpenIcon,
      summary: 'Pixel treasures and suspiciously crunchy image files.',
      children: {},
    },

    Games: {
      type: 'directory',
      title: 'Games',
      defaultView: 'icon',
      icon: gameIcon,
      activeIcon: gameIcon,
      summary: 'Tiny distractions may appear here later.',
      children: {},
    },
    'Recycle Bin': {
      type: 'directory',
      title: 'Recycle Bin',
      defaultView: 'icon',
      icon: recycleBinIcon,
      activeIcon: recycleBinIcon,
      summary: 'Tiny distractions may appear here later.',
      children: {
        'Old Site.tsx': {
          type: 'document',
          title: 'Old Site',
          summary: 'A tiny note from Tara.',
          icon: fileIcon,
          body: `Here lies the old source for the Tetra You Betra LLC website. It was painfuly generic and had to go.`,
        },
      },
    },
  },
};
