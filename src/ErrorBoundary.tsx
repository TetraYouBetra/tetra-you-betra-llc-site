import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import WindowFrame from './components/WindowFrame';
import errorIcon from './assets/Chicago95/icons/32/dialog-error.png';
import { Task } from './contexts/TaskContext';

type AppError = {
  id: string;
  error: Error;
};

type ErrorContextValue = {
  showError: (error: unknown) => void;
  clearErrors: () => void;
};

export const ErrorContext = React.createContext<ErrorContextValue | null>(null);

export function useErrorDialog() {
  const context = React.useContext(ErrorContext);

  if (!context) {
    throw new Error('useErrorDialog must be used inside ErrorBoundary.');
  }

  return context;
}

type Props = {
  children: React.ReactNode;
};

type State = {
  errors: AppError[];
  errorStack: string[];
  activeErrorId: string | null;
};

const ERROR_WINDOW_WIDTH = 420;
const ERROR_OFFSET = 28;
const ERROR_BASE_Z_INDEX = 9999;

function normalizeError(error: unknown): Error {
  if (error instanceof Error) return error;

  if (typeof error === 'string') {
    return new Error(error);
  }

  try {
    return new Error(JSON.stringify(error, null, 2));
  } catch {
    return new Error('An unknown error occurred.');
  }
}

function createErrorTask(error: AppError, index: number): Task {
  const centerX =
    typeof window === 'undefined'
      ? 120
      : Math.max(16, window.innerWidth / 2 - ERROR_WINDOW_WIDTH / 2);

  const centerY =
    typeof window === 'undefined'
      ? 120
      : Math.max(48, window.innerHeight / 2 - 120 / 2);

  return {
    href: `application-error-${error.id}`,
    label: 'Application Error',
    icon: errorIcon,
    open: true,
    minimized: false,
    maximized: false,
    mobileDialog: true,
    defaultPosition: {
      x: centerX + index * ERROR_OFFSET,
      y: centerY + index * ERROR_OFFSET,
    },
    defaultSize: {
      width: ERROR_WINDOW_WIDTH,
      height: 'auto',
    },
  };
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    errors: [],
    errorStack: [],
    activeErrorId: null,
  };

  static getDerivedStateFromError(error: Error): Partial<State> {
    const id = crypto.randomUUID();

    return {
      errors: [{ id, error }],
      errorStack: [id],
      activeErrorId: id,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application error boundary caught:', error, errorInfo);
  }

  showError = (error: unknown) => {
    const normalizedError = normalizeError(error);
    const id = crypto.randomUUID();

    console.error('Application error dialog shown:', normalizedError);

    this.setState((current) => ({
      errors: [...current.errors, { id, error: normalizedError }],
      errorStack: [...current.errorStack, id],
      activeErrorId: id,
    }));
  };

  bringErrorToFront = (id: string) => {
    this.setState((current) => ({
      activeErrorId: id,
      errorStack: [
        ...current.errorStack.filter((errorId) => errorId !== id),
        id,
      ],
    }));
  };

  getErrorZIndex = (id: string) => {
    const index = this.state.errorStack.indexOf(id);

    return index === -1 ? ERROR_BASE_Z_INDEX : ERROR_BASE_Z_INDEX + index;
  };

  dismissError = (id: string) => {
    this.setState((current) => {
      const nextErrors = current.errors.filter((item) => item.id !== id);
      const nextStack = current.errorStack.filter((errorId) => errorId !== id);

      return {
        errors: nextErrors,
        errorStack: nextStack,
        activeErrorId:
          current.activeErrorId === id
            ? (nextStack[nextStack.length - 1] ?? null)
            : current.activeErrorId,
      };
    });
  };

  clearErrors = () => {
    this.setState({
      errors: [],
      errorStack: [],
      activeErrorId: null,
    });
  };

  render() {
    const contextValue: ErrorContextValue = {
      showError: this.showError,
      clearErrors: this.clearErrors,
    };

    return (
      <ErrorContext.Provider value={contextValue}>
        {this.props.children}

        {this.state.errors.map((item, index) => (
          <WindowFrame
            key={item.id}
            task={createErrorTask(item, index)}
            active={this.state.activeErrorId === item.id}
            zIndex={this.getErrorZIndex(item.id)}
            onFocusWindow={() => this.bringErrorToFront(item.id)}
            onClose={() => this.dismissError(item.id)}
          >
            <Box
              role="alertdialog"
              aria-labelledby={`application-error-title-${item.id}`}
              aria-describedby={`application-error-message-${item.id}`}
              sx={{
                p: 2,
                minWidth: 360,
                maxWidth: 520,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box
                  component="img"
                  src={errorIcon}
                  alt=""
                  sx={{
                    width: 32,
                    height: 32,
                    imageRendering: 'pixelated',
                    flexShrink: 0,
                  }}
                />

                <Box sx={{ minWidth: 0 }}>
                  <Typography
                    id={`application-error-title-${item.id}`}
                    sx={{ fontSize: 13, fontWeight: 700, mb: 1 }}
                  >
                    This program has performed an illegal operation.
                  </Typography>

                  <Typography
                    id={`application-error-message-${item.id}`}
                    sx={{
                      fontSize: 12,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {item.error.message || 'An unknown error occurred.'}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button
                  onClick={() => this.dismissError(item.id)}
                  autoFocus={this.state.activeErrorId === item.id}
                  sx={{
                    minWidth: 76,
                    px: 2,
                    py: '2px',
                    borderRadius: 0,
                    fontSize: 12,
                  }}
                >
                  OK
                </Button>
              </Box>
            </Box>
          </WindowFrame>
        ))}
      </ErrorContext.Provider>
    );
  }
}
