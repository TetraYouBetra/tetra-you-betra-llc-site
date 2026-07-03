import type { Components, Theme } from '@mui/material/styles';

export const win95 = {
  black: '#000000',
  white: '#ffffff',
  mid: '#808080',
  desktop: '#008080',
  face: '#c0c0c0',
  highlight: '#ffffff',
  light: '#dfdfdf',
  shadow: '#808080',
  darkShadow: '#404040',
  title: '#000080',
  titleGradientEnd: '#1084d0',
  inactiveTitle: '#808080',
  inactiveTitleText: '#c0c0c0',
  titleText: '#ffffff',
  text: '#000000',
  disabledText: '#808080',
  link: '#0000ff',
  error: '#ff0000',
  yellow: '#ffff00',
  green: '#008000',
  cyan: '#00ffff',
  magenta: '#ff00ff',
};

export const raised = `
  inset 1px 1px 0 ${win95.highlight},
  inset 2px 2px 0 ${win95.light},
  inset -1px -1px 0 ${win95.darkShadow},
  inset -2px -2px 0 ${win95.shadow}
`;

export const sunken = `
  inset 1px 1px 0 ${win95.darkShadow},
  inset 2px 2px 0 ${win95.shadow},
  inset -1px -1px 0 ${win95.highlight},
  inset -2px -2px 0 ${win95.light}
`;

export const pressed = sunken;

export const titleBarActive = {
  background: win95.title,
  color: win95.titleText,
};

export const titleBarInactive = {
  background: win95.inactiveTitle,
  color: win95.inactiveTitleText,
};

export const win95FontFamily = `"MS Sans Serif", Tahoma, Arial, sans-serif`;
export const win95TitleBarHeight = 18;
export const win95TaskBarHeight = 34;

export const win95ThemeOptions = {
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: `"MS Sans Serif", Tahoma, Arial, sans-serif`,
    button: {
      textTransform: 'none',
      fontWeight: 400,
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: win95.title,
          contrastText: win95.titleText,
        },
        background: {
          default: win95.desktop,
          paper: win95.face,
        },
        text: {
          primary: win95.text,
          secondary: win95.text,
        },
        divider: win95.mid,
      },
    },
    dark: {
      palette: {
        primary: {
          main: win95.title,
          contrastText: win95.titleText,
        },
        background: {
          default: win95.desktop,
          paper: win95.face,
        },
        text: {
          primary: win95.text,
          secondary: win95.text,
        },
        divider: win95.mid,
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: win95.desktop,
        },
        '*': {
          borderRadius: '0 !important',
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: win95.face,
          color: win95.text,
          border: 'none',
          boxShadow: raised,
          backgroundImage: 'none',
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          padding: 0,
          gap: 0,
          backgroundColor: win95.face,
          color: win95.text,
          border: 'none',
          boxShadow: raised,
          overflow: 'hidden',
        },
      },
    },

    MuiCardHeader: {
      styleOverrides: {
        root: {
          margin: 3,
          padding: '3px 6px',
          minHeight: 24,
          backgroundColor: win95.title,
          color: win95.titleText,
        },
        title: {
          fontSize: '0.875rem',
          fontWeight: 700,
          lineHeight: 1.2,
        },
        subheader: {
          color: win95.titleText,
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 12,
          '&:last-child': {
            paddingBottom: 12,
          },
        },
      },
    },

    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: 8,
        },
      },
    },

    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 28,
          padding: '4px 12px',
          color: win95.text,
          backgroundColor: win95.face,
          border: 'none',
          boxShadow: raised,
          textTransform: 'none',
          fontWeight: 400,
          '&:hover': {
            backgroundColor: win95.face,
            boxShadow: raised,
          },
          '&:active': {
            boxShadow: sunken,
            transform: 'translate(1px, 1px)',
          },
          '&.Mui-disabled': {
            color: win95.mid,
            backgroundColor: win95.face,
            boxShadow: raised,
          },
        },
        contained: {
          backgroundColor: win95.face,
          color: win95.text,
        },
        outlined: {
          border: 'none',
          backgroundColor: win95.face,
        },
        text: {
          backgroundColor: win95.face,
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          width: 28,
          height: 28,
          color: win95.text,
          backgroundColor: win95.face,
          border: 'none',
          boxShadow: raised,
          '&:hover': {
            backgroundColor: win95.face,
          },
          '&:active': {
            boxShadow: sunken,
            transform: 'translate(1px, 1px)',
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: win95.light,
          color: win95.text,
          border: 'none',
          boxShadow: sunken,
          padding: '6px 8px',
          '&.Mui-focused': {
            outline: '1px dotted black',
            outlineOffset: -4,
          },
        },
        notchedOutline: {
          border: 'none',
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: win95.light,
          boxShadow: sunken,
          border: 'none',
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: win95.face,
          boxShadow: raised,
          border: 'none',
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: 24,
          color: win95.text,
          '&.Mui-selected, &.Mui-selected:hover, &:hover': {
            backgroundColor: win95.title,
            color: win95.titleText,
          },
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          background: '#c0c0c0',
          borderRadius: 0,
          border: 'none',
          boxShadow: raised,
          overflow: 'hidden',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          ...titleBarActive,
          height: win95TitleBarHeight,
          minHeight: win95TitleBarHeight,
          padding: '0 6px',
          display: 'flex',
          alignItems: 'center',
          fontSize: 12,
          fontWeight: 700,
          fontFamily: win95FontFamily,
          userSelect: 'none',
        },
      },
    },
  } satisfies Components<Theme>,
};
