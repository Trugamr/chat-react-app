import styled, { css } from 'styled-components'

const errorStyles = css`
  box-shadow: 0px 0px 0px 3px ${({ theme }) => theme.form.error.placeholder};
  background-color: ${({ theme }) => theme.form.error.bg};
  color: ${({ theme }) => theme.form.error.text};

  &::placeholder {
    color: ${({ theme }) => theme.form.error.placeholder};
  }
`

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
`

export const Input = styled.input`
  background-color: ${({ theme }) => theme.form.field.bg};
  border-radius: 16px;
  width: 100%;
  height: 100%;
  border: 0px;
  font-family: 'archiasemibold';
  font-size: ${({ fontSize }) => fontSize || '18px'};
  color: ${({ theme }) => theme.form.field.text};
  padding: 14px 20px;
  padding-left: ${({ Icon }) => (Icon ? '56px' : '20px')};

  &::placeholder {
    color: ${({ theme }) => theme.form.field.placeholder};
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px
      ${({ theme, error }) =>
        error ? theme.form.error.text : theme.form.field.focusBorder};
  }

  ${({ error }) => (error ? errorStyles : '')}

  /* Change Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ theme }) => theme.form.field.text};
  }
`

export const InputIconContainer = styled.span`
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 18px;
`
