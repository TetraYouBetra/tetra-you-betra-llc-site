import { useState } from 'react';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

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
  const [error, setError] = useState('');

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
    setError('');
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
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container
      id="contact"
      maxWidth="sm"
      sx={{
        pt: { xs: 1, sm: 2 },
        pb: { xs: 1, sm: 2 },
      }}
    >
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
            <TextField
              label="Name"
              required
              fullWidth
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
            />

            <TextField
              label="Email"
              type="email"
              required
              fullWidth
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
            />

            <TextField
              label="Company"
              fullWidth
              value={form.company}
              onChange={(e) => updateField('company', e.target.value)}
            />

            <TextField
              label="Phone"
              fullWidth
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
            />

            <TextField
              label="Project Details"
              required
              fullWidth
              multiline
              minRows={5}
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
            />

            {success && (
              <Alert severity="success">
                Thanks! Your consultation request has been submitted. I'll be in
                touch soon.
              </Alert>
            )}

            {error && <Alert severity="error">{error}</Alert>}

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
