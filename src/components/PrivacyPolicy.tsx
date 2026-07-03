import Typography, { TypographyProps } from '@mui/material/Typography';

export default function PrivacyPolicy() {
  const headerProps: TypographyProps = { variant: 'h3', sx: { mt: 2, mb: 1 } };
  return (
    <>
      <Typography {...headerProps}>Privacy Policy</Typography>

      <Typography>
        Tetra You Betra LLC ("we", "our", or "us") respects your privacy. This
        Privacy Policy explains what information we collect through this website
        and how it is used.
      </Typography>

      <Typography {...headerProps}>Information We Collect</Typography>

      <Typography>
        The only personal information we collect is the information you
        voluntarily provide when contacting us through the website, such as your
        name, email address, company, and the contents of your message.
      </Typography>

      <Typography>
        We use this information solely to respond to your inquiry and discuss
        potential business opportunities. We do not sell, rent, or share your
        personal information for marketing purposes.
      </Typography>

      <Typography {...headerProps}>Data Retention</Typography>

      <Typography>
        Information submitted through our contact form is retained only as long
        as reasonably necessary to respond to your inquiry or maintain a
        business relationship.
      </Typography>

      <Typography {...headerProps}>Cookies and Tracking</Typography>

      <Typography>
        This website does not intentionally use cookies or analytics to collect
        personal information from visitors.
      </Typography>

      <Typography {...headerProps}>Third-Party Services</Typography>

      <Typography>
        If you choose to contact us using services such as email, those services
        are governed by their own privacy policies.
      </Typography>

      <Typography {...headerProps}>Information Security</Typography>

      <Typography>
        We take reasonable measures to protect the information you submit.
        However, no method of transmitting or storing information electronically
        can be guaranteed to be completely secure.
      </Typography>

      <Typography {...headerProps}>Your Rights</Typography>

      <Typography>
        If you have submitted personal information and would like it corrected
        or deleted, you may contact us and we will make reasonable efforts to
        honor your request, subject to any legal or business obligations.
      </Typography>

      <Typography {...headerProps}>Changes to This Policy</Typography>

      <Typography>
        We may update this Privacy Policy from time to time. Any changes will be
        posted on this page with an updated effective date.
      </Typography>

      <Typography {...headerProps}>Contact</Typography>

      <Typography>
        If you have any questions about this Privacy Policy or how your
        information is handled, please contact Tetra You Betra LLC using the
        contact form on this website.
      </Typography>

      <Typography sx={{ mt: 2 }}>Effective Date: July 2, 2026</Typography>
    </>
  );
}
