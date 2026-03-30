import React from "react";
import styled, { keyframes } from "styled-components";
import { Rating } from "@mui/material";
import { testimonials } from "../utils/data";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 80px 24px;
`;

const Heading = styled.div`
  text-align: center;
  margin-bottom: 56px;
`;

const Label = styled.div`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 4px;
  color: #c9a84c;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const Title = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(28px, 4vw, 48px);
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 12px;
`;

const Divider = styled.div`
  width: 60px;
  height: 3px;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  border-radius: 2px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: #12121a;
  border: 1px solid #2a2a3a;
  border-radius: 16px;
  padding: 32px 28px;
  position: relative;
  transition: all 0.3s ease;
  animation: ${fadeUp} 0.6s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;

  &::before {
    content: '"';
    position: absolute;
    top: 20px;
    right: 24px;
    font-family: "Cormorant Garamond", serif;
    font-size: 80px;
    color: #c9a84c15;
    line-height: 1;
    pointer-events: none;
  }

  &:hover {
    border-color: rgba(201, 168, 76, 0.4);
    transform: translateY(-4px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  }
`;

const ReviewText = styled.p`
  font-size: 14px;
  line-height: 1.8;
  color: #9a9ab0;
  margin-bottom: 24px;
  font-style: italic;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(201, 168, 76, 0.4);
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #f0ede8;
`;

const AuthorRole = styled.div`
  font-size: 12px;
  color: #9a9ab0;
  margin-top: 2px;
`;

const TestimonialsSection = () => {
  return (
    <Section>
      <Heading>
        <Label>Testimonials</Label>
        <Title>What Our Customers Say</Title>
        <Divider />
      </Heading>
      <Grid>
        {testimonials.map((t, i) => (
          <Card key={i} delay={i * 0.1}>
            <Rating value={t.rating} readOnly sx={{ fontSize: "16px", marginBottom: "16px" }} />
            <ReviewText>"{t.review}"</ReviewText>
            <Author>
              <Avatar src={t.avatar} alt={t.name} />
              <AuthorInfo>
                <AuthorName>{t.name}</AuthorName>
                <AuthorRole>{t.role}</AuthorRole>
              </AuthorInfo>
            </Author>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};

export default TestimonialsSection;
