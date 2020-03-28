import styled from 'styled-components'

export const FormErrorContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.form.error.bg};
  color: ${({ theme }) => theme.form.error.text};
  font-family: 'archiasemibold';
  border-radius: 16px;
  padding: 20px;
  text-align: center;
`

export const Heading = styled.h2`
  font-size: 22px;
`

export const Error = styled.p`
  font-family: 'archiaregular';
  font-size: 16px;
  margin-top: 4px;
`
