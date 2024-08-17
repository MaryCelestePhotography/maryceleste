import React, { useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';
import { Input, Textarea, Button } from '@nextui-org/react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    emailjs.sendForm('service_f9fuxqi', 'template_1c32d1a', e.target, 'ZV983fAShztGHKjdm')
      .then((result) => {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitStatus(null), 5000);
      }, (error) => {
        setSubmitStatus('error');
      });
  };

  return (
    <ContactSection>
      <h1>Contact Mary Celeste</h1>
      <p>If you're interested in prints or have any inquiries, feel free to reach out.</p>
      <ContactInfo>
        <ContactItem>
          <ContactLabel>Email:</ContactLabel>
          <ContactDetail>mary@marycelestephotography.com</ContactDetail>
        </ContactItem>
      </ContactInfo>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label htmlFor="name">Your Name:</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name ? true : false}
            />
            {errors.name && <Error>{errors.name}</Error>}
          </FormField>
          <FormField>
            <label htmlFor="email">Your Email:</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email ? true : false}
            />
            {errors.email && <Error>{errors.email}</Error>}
          </FormField>
          <FormField>
            <label htmlFor="message">Your Message:</label>
            <Textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              error={errors.message ? true : false}
            />
            {errors.message && <Error>{errors.message}</Error>}
          </FormField>
          {submitStatus === 'success' && (
            <StatusMessage success>
              Your message has been sent successfully!
            </StatusMessage>
          )}
          {submitStatus === 'error' && (
            <StatusMessage error>
              There was an error sending your message. Please try again.
            </StatusMessage>
          )}
          <Button type="submit" fullWidth>
            Send Message
          </Button>
        </form>
      </FormContainer>
    </ContactSection>
  );
};

const ContactSection = styled.div`
  padding: 1rem;
  text-align: center;
`;

const ContactInfo = styled.div`
  // margin-top: 2rem;
`;

const ContactItem = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactLabel = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const ContactDetail = styled.div`
  font-size: 1rem;
  word-break: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  text-align: center;
`;

const FormContainer = styled.div`
  margin-top: 1rem;
`;

const FormField = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  input, textarea {
    background-color: #f5f5f5;
    border: 1px solid transparent;
    border-radius: 0;
    padding: 0.5rem;
    font-size: 1rem;
    width: 100%;
    max-width: 500px;
  }

  input:focus, textarea:focus {
    border: 1px solid #333;
    outline: none;
  }
`;

const Error = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const StatusMessage = styled.p`
  margin-top: 1rem;
  color: ${({ success }) => (success ? 'green' : 'red')};
`;

export default Contact;
