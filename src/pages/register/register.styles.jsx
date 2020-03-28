import styled from 'styled-components'

export const RegisterPageContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.bg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

export const RegisterFormContainer = styled.div`
  display: grid;
  grid-gap: 20px;
`

export const Heading = styled.h1`
  font-family: 'archiasemibold';
  color: ${({ theme }) => theme.form.headingText};
  padding-left: 6px;
`

export const RegisterForm = styled.form`
  background-color: ${({ theme }) => theme.form.bg};
  padding: 22px;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-gap: 14px;

  button {
    margin-top: 16px;
  }
`
export const LoginMessageContainer = styled.div`
  font-family: 'archiasemibold';
  display: flex;
  justify-content: center;
  div {
    color: ${({ theme }) => theme.text};
    span {
      margin-right: 6px;
    }
  }
`
