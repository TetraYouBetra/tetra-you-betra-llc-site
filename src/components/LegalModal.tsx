import type { PropsWithChildren } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface LegalModalProps extends PropsWithChildren {
  open: boolean;
  onClose: () => void;
  title: string;
}

export default function LegalModal({
  open,
  onClose,
  title,
  children,
}: LegalModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pr: 1,
        }}
      >
        <Typography variant="h5" component="span">
          {title}
        </Typography>

        <IconButton onClick={onClose} aria-label="Close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,

            '& h2': {
              typography: 'h5',
              mt: 2,
            },

            '& h3': {
              typography: 'h6',
              mt: 1,
            },

            '& p': {
              typography: 'body1',
              color: 'text.secondary',
            },

            '& ul': {
              pl: 3,
            },

            '& li': {
              mb: 1,
            },
          }}
        >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
