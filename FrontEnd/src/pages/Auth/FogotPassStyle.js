import styled from 'styled-components';

export const ForgotPasswordBody = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const ForgotPasswordContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  width: 400px;
  max-width: 100%;
  padding: 20px;
`;

export const ForgotPasswordTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ForgotPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ForgotPasswordInput = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const ForgotPasswordButton = styled.button`
  border-radius: 20px;
  border: 1px solid #7fad39;
  background-color: #7fad39;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;

export const ForgotPasswordMessage = styled.p`
  font-size: 14px;
  color: red;
  text-align: center;
  margin-top: 20px;
`;
