import styled from 'styled-components'

export const Button = styled.button`
  border: 0px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.button.bgDisabled : theme.button.bg};
  color: ${({ theme }) => theme.button.text};
  padding: 6px;
  font-family: 'archiasemibold';
  font-size: ${({ fontSize }) => fontSize};
  width: 100%;
  height: ${({ height }) => (height ? height : '28px')};
  padding: ${({ padding }) => padding};
  cursor: pointer;
  border-radius: 9999px;
  border: 3px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;


  /* &:hover {
    border: 2px solid ${({ theme }) => theme.button.bg};
    background-color: ${({ theme }) => theme.button.text};
    color: ${({ theme }) => theme.button.bg};
  } */

  &:focus {
    outline: none;
    border: 3px dashed ${({ theme }) => theme.button.text};
  }
`
export const Spinner = styled.div`
  @keyframes spin {
    from {
      transform: rotate(-45deg);
    }
    to {
      transform: rotate(315deg);
    }
  }

  width: 28px;
  height: 28px;
  border: 4px solid ${({ theme }) => theme.button.bg};
  border-right: 4px solid transparent;
  border-radius: 20px;
  animation: linear spin 1s infinite;
`
