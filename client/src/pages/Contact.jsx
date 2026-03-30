import React, { useState } from "react";
import styled from "styled-components";
import { LocationOnRounded, EmailRounded, PhoneRounded } from "@mui/icons-material";

const Container = styled.div`
  min-height: 100%;
  overflow-y: scroll;
  background: #0a0a0f;
  display: flex;
  flex-direction: column;
`;

const Hero = styled.div`
  position: relative;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  background: linear-gradient(135deg, #0e0e16, #1a1a26);
  border-bottom: 1px solid #2a2a3a;

  &::before {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
`;

const HeroText = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroLabel = styled.div`
  font-size: 11px;
  letter-spacing: 5px;
  color: #c9a84c;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const HeroTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 12px;
`;

const HeroSub = styled.p`
  font-size: 15px;
  color: #9a9ab0;
`;

const Body = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  padding: 72px 32px;
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 60px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    padding: 40px 20px;
    gap: 40px;
  }
`;

const InfoSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const InfoLabel = styled.div`
  font-size: 11px;
  letter-spacing: 4px;
  color: #c9a84c;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const InfoTitle = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: 34px;
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 16px;
  line-height: 1.2;
`;

const InfoText = styled.p`
  font-size: 14px;
  line-height: 1.9;
  color: #9a9ab0;
  margin-bottom: 32px;
`;

const ContactCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: #12121a;
  border: 1px solid #2a2a3a;
  transition: border-color 0.3s ease;
  &:hover { border-color: rgba(201,168,76,0.3); }
`;

const ContactIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: rgba(201, 168, 76, 0.1);
  border: 1px solid rgba(201, 168, 76, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #c9a84c;
`;

const ContactCardTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 4px;
`;

const ContactCardValue = styled.div`
  font-size: 13px;
  color: #9a9ab0;
  line-height: 1.6;
`;

const FormSide = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #9a9ab0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`;

const Input = styled.input`
  background: #12121a;
  border: 1px solid #2a2a3a;
  color: #f0ede8;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  outline: none;
  transition: all 0.3s ease;
  &::placeholder { color: #3a3a4a; }
  &:focus {
    border-color: rgba(201,168,76,0.5);
    background: #14141e;
    box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
  }
`;

const Textarea = styled.textarea`
  background: #12121a;
  border: 1px solid #2a2a3a;
  color: #f0ede8;
  padding: 14px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  outline: none;
  resize: vertical;
  min-height: 140px;
  transition: all 0.3s ease;
  &::placeholder { color: #3a3a4a; }
  &:focus {
    border-color: rgba(201,168,76,0.5);
    background: #14141e;
    box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
  }
`;

const SubmitBtn = styled.button`
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  border: none;
  padding: 16px 32px;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 1px;
  border-radius: 8px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  align-self: flex-start;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 36px rgba(201,168,76,0.3);
    filter: brightness(1.05);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Success = styled.div`
  background: rgba(46, 204, 113, 0.08);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 10px;
  padding: 20px 24px;
  color: #2ecc71;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <Container>
      <Hero>
        <HeroText>
          <HeroLabel>Get In Touch</HeroLabel>
          <HeroTitle>Contact Us</HeroTitle>
          <HeroSub>We'd love to hear from you. Send us a message!</HeroSub>
        </HeroText>
      </Hero>

      <Body>
        <InfoSide>
          <div>
            <InfoLabel>Contact Information</InfoLabel>
            <InfoTitle>Let's Start a Conversation</InfoTitle>
            <InfoText>
              Have questions about your order, sizing, or anything else? Our
              dedicated support team is here to help you 7 days a week.
            </InfoText>
          </div>

          <ContactCard>
            <ContactIcon><LocationOnRounded sx={{ fontSize: "20px" }} /></ContactIcon>
            <div>
              <ContactCardTitle>Our Address</ContactCardTitle>
              <ContactCardValue>123 Fashion Street<br />New York, NY 10001, USA</ContactCardValue>
            </div>
          </ContactCard>

          <ContactCard>
            <ContactIcon><EmailRounded sx={{ fontSize: "20px" }} /></ContactIcon>
            <div>
              <ContactCardTitle>Email Us</ContactCardTitle>
              <ContactCardValue>support@krist.fashion<br />hello@krist.fashion</ContactCardValue>
            </div>
          </ContactCard>

          <ContactCard>
            <ContactIcon><PhoneRounded sx={{ fontSize: "20px" }} /></ContactIcon>
            <div>
              <ContactCardTitle>Call Us</ContactCardTitle>
              <ContactCardValue>+1 (800) 123-4567<br />Mon–Fri, 9am–6pm EST</ContactCardValue>
            </div>
          </ContactCard>
        </InfoSide>

        <FormSide>
          <InfoLabel style={{ marginBottom: "24px" }}>Send a Message</InfoLabel>
          {sent ? (
            <Success>
              ✓ Thank you! Your message has been sent. We'll reply within 24 hours.
            </Success>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Field>
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </Field>
                <Field>
                  <Label>Email Address</Label>
                  <Input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </Field>
              </Row>
              <Field>
                <Label>Subject</Label>
                <Input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </Field>
              <Field>
                <Label>Message</Label>
                <Textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  required
                />
              </Field>
              <SubmitBtn type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message →"}
              </SubmitBtn>
            </Form>
          )}
        </FormSide>
      </Body>
    </Container>
  );
};

export default Contact;
