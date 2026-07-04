import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useErrorDialog } from '../ErrorBoundary';
import nameIcon from '../assets/Chicago95/icons/32/stock_person.png';
import emailIcon from '../assets/Chicago95/icons/32/mail-unread.png';
import companyIcon from '../assets/Chicago95/icons/32/accessories-dictionary.png';
import phoneIcon from '../assets/Chicago95/icons/32/network-wireless.png';
import projectIcon from '../assets/Chicago95/icons/32/abiword.png';

const API_URL = 'https://api.tetrayoubetra.com';

interface ContactForm {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
}

const initialForm: ContactForm = {
  name: '',
  email: '',
  company: '',
  phone: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { showError } = useErrorDialog();

  function updateField<K extends keyof ContactForm>(
    key: K,
    value: ContactForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const json = await response.json();

      if (!response.ok || !json.ok) {
        throw new Error(json.error ?? 'Unable to submit form.');
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container id="contact" maxWidth="sm" sx={{}}>
      <Stack spacing={4}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography component="h2" variant="h4" gutterBottom>
            Let's Build Something Great
          </Typography>

          <Typography color="text.secondary">
            Tell me a little about your project and I'll get back to you as soon
            as I can.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <ContactField label="Name" icon={nameIcon}>
              <TextField
                placeholder="Name"
                required
                fullWidth
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </ContactField>

            <ContactField label="Email" icon={emailIcon}>
              <TextField
                placeholder="Email"
                type="email"
                required
                fullWidth
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
            </ContactField>

            <ContactField label="Company" icon={companyIcon}>
              <TextField
                placeholder="Company"
                fullWidth
                value={form.company}
                onChange={(e) => updateField('company', e.target.value)}
              />
            </ContactField>

            <ContactField label="Phone" icon={phoneIcon}>
              <TextField
                placeholder="Phone"
                fullWidth
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </ContactField>

            <ContactField label="Project Details" icon={projectIcon}>
              <TextField
                placeholder="Project Details"
                required
                fullWidth
                multiline
                minRows={5}
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
              />
            </ContactField>

            {success && (
              <Alert severity="success">
                Thanks! Your consultation request has been submitted. I'll be in
                touch soon.
              </Alert>
            )}

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              size="large"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Book consultation'
              )}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}

type ContactFieldProps = {
  icon?: string;
  label: string;
  children: React.ReactNode;
};

function ContactField({ icon, label, children }: ContactFieldProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '150px minmax(0, 1fr)',
        },
        gap: {
          xs: '4px',
          sm: 2,
        },
        alignItems: 'start',
      }}
    >
      <Typography
        component="label"
        variant="body1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          minHeight: 30,
          fontSize: 13,
        }}
      >
        {icon && (
          <Box
            component="img"
            src={icon}
            alt=""
            sx={{
              width: 16,
              height: 16,
              imageRendering: 'pixelated',
              flexShrink: 0,
            }}
          />
        )}

        {label}
      </Typography>

      {children}
    </Box>
  );
}
