import Typography, { TypographyProps } from '@mui/material/Typography';

export default function TermsOfService() {
  const headerProps: TypographyProps = { variant: 'h3', sx: { mt: 2, mb: 1 } };

  return (
    <>
      <Typography {...headerProps}>Terms of Service</Typography>

      <Typography>
        Welcome to the Tetra You Betra LLC website. By accessing or using this
        website, you agree to these Terms of Service. If you do not agree with
        these terms, please do not use this website.
      </Typography>

      <Typography {...headerProps}>Website Purpose</Typography>

      <Typography>
        This website is provided for informational purposes only. Its purpose is
        to describe the consulting services offered by Tetra You Betra LLC and
        provide a means for prospective clients to contact us.
      </Typography>

      <Typography {...headerProps}>Acceptable Use</Typography>

      <Typography>
        You agree not to use this website in any manner that could damage,
        disable, overburden, or impair the website or interfere with another
        person's use of it. You may not attempt to gain unauthorized access to
        the website, its infrastructure, or any related systems.
      </Typography>

      <Typography {...headerProps}>Intellectual Property</Typography>

      <Typography>
        Unless otherwise stated, all content on this website, including text,
        graphics, logos, images, source code, and other materials, is the
        property of Tetra You Betra LLC and is protected by applicable
        intellectual property laws. You may not reproduce, distribute, or modify
        any content without prior written permission.
      </Typography>

      <Typography {...headerProps}>No Professional Relationship</Typography>

      <Typography>
        Contacting us through this website does not create a client, consulting,
        or professional relationship. Any engagement for consulting services
        will be governed by a separate written agreement.
      </Typography>

      <Typography {...headerProps}>No Warranties</Typography>

      <Typography>
        This website and its content are provided "as is" and "as available"
        without warranties of any kind, whether express or implied. While we
        strive to keep information accurate and up to date, we do not guarantee
        that the content is complete, accurate, or free of errors.
      </Typography>

      <Typography {...headerProps}>Limitation of Liability</Typography>

      <Typography>
        To the fullest extent permitted by law, Tetra You Betra LLC shall not be
        liable for any direct, indirect, incidental, consequential, or special
        damages arising from or related to your use of this website.
      </Typography>

      <Typography {...headerProps}>Third-Party Links</Typography>

      <Typography>
        This website may contain links to third-party websites for your
        convenience. We are not responsible for the content, availability, or
        privacy practices of those websites.
      </Typography>

      <Typography {...headerProps}>Changes to These Terms</Typography>

      <Typography>
        We may update these Terms of Service from time to time. Continued use of
        this website after changes are posted constitutes acceptance of the
        revised terms.
      </Typography>

      <Typography {...headerProps}>Governing Law</Typography>

      <Typography>
        These Terms of Service are governed by the laws of the State of
        Connecticut, without regard to its conflict of law principles.
      </Typography>

      <Typography {...headerProps}>Contact</Typography>

      <Typography>
        Questions regarding these Terms of Service may be submitted through the
        contact form available on this website.
      </Typography>

      <Typography sx={{ mt: 2 }}>Effective Date: July 2, 2026</Typography>
    </>
  );
}
