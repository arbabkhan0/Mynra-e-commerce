import React, { useState } from "react";
import styled from "styled-components";

const Section = styled.div`
  width: 100%;
  padding: 80px 24px;
  background: linear-gradient(135deg, #0e0e16, #16161f);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #c9a84c15 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

const Inner = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #c9a84c;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

const Title = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 14px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #9a9ab0;
  margin-bottom: 40px;
  line-height: 1.7;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0;
  max-width: 480px;
  margin: 0 auto;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #2a2a3a;
  background: #12121a;
  transition: border-color 0.3s ease;
  &:focus-within {
    border-color: rgba(201, 168, 76, 0.5);
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 16px 20px;
  background: transparent;
  border: none;
  outline: none;
  color: #f0ede8;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  &::placeholder {
    color: #5a5a70;
  }
`;

const SubBtn = styled.button`
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  border: none;
  padding: 16px 28px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  white-space: nowrap;
  &:hover {
    filter: brightness(1.1);
  }
`;

const Success = styled.div`
  background: rgba(46, 204, 113, 0.1);
  border: 1px solid rgba(46, 204, 113, 0.3);
  color: #2ecc71;
  padding: 16px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const Privacy = styled.div`
  font-size: 12px;
  color: #5a5a70;
  margin-top: 16px;
`;

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <Section>
      <Inner>
        <Label>Newsletter</Label>
        <Title>Stay in the Loop</Title>
        <Subtitle>
          Subscribe and get exclusive deals, new arrivals, and style tips delivered
          to your inbox. No spam, ever.
        </Subtitle>
        {submitted ? (
          <Success>
            ✓ You're subscribed! Watch your inbox for exclusive offers.
          </Success>
        ) : (
          <form onSubmit={handleSubmit}>
            <InputRow>
              <EmailInput
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
              <SubBtn type="submit">Subscribe</SubBtn>
            </InputRow>
          </form>
        )}
        <Privacy>🔒 We respect your privacy. Unsubscribe anytime.</Privacy>
      </Inner>
    </Section>
  );
};

export default NewsletterSection;
