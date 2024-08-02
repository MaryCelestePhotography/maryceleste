import React from 'react';
import styled from 'styled-components';

const Contact = () => {
  return (
    <ContactSection>
      <h1>Contact Mary Celeste</h1>
      <p>
        If you're interested in prints or have any inquiries, feel free to
        reach out.
      </p>
      <ContactInfo>
        <ContactItem>
          <strong>Email:</strong> Mary Celeste@example.com
        </ContactItem>
        <ContactItem>
          <strong>Phone:</strong> (123) 456-7890
        </ContactItem>
      </ContactInfo>
    </ContactSection>
  );
};

const ContactSection = styled.div`
  padding: 4rem;
  background: #f8f8f8;
  text-align: center;
`;

const ContactInfo = styled.div`
  margin-top: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

export default Contact;
