import styled from 'styled-components';

export const ChangePassBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

export const ChangePassContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  width: 400px;
  padding: 20px;
`;

export const ChangePassTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

export const ChangePassForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ChangePassInput = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px;
  margin: 8px 0;
  border-radius: 5px;
`;

export const ChangePassButton = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #7fad39;
  color: #fff;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #6d9c2e;
  }
`;

export const ChangePassMessage = styled.p`
  margin-top: 10px;
  color: ${props => props.success ? 'green' : 'red'};
`;
