import styled from 'styled-components'

export const Button = styled.button`
  border: 0px;
  background-color: ${({ theme }) => theme.button.bg};
  color: ${({ theme }) => theme.button.text};
  padding: 12px;
  font-family: 'archiasemibold';
  font-size: ${({ fontSize }) => fontSize};
  width: 100%;
  height: ${({ height }) => height};
  padding: ${({ padding }) => padding};
  cursor: pointer;
  border-radius: 9999px;
  border: 2px solid transparent;

  /* &:hover {
    border: 2px solid ${({ theme }) => theme.button.bg};
    background-color: ${({ theme }) => theme.button.text};
    color: ${({ theme }) => theme.button.bg};
  } */

  &:focus {
    outline: none;
  }
`
