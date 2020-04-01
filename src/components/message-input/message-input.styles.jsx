import styled, { css } from 'styled-components'

const iconCSS = css`
  height: 100%;
  width: 60px;
  position: absolute;
  right: 0;
  top: 0;
  border-radius: 14px 0px 0px 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  opacity: 0.7;
  cursor: pointer;
  transition: ease all 100ms;
  outline: none;
  border: none;

  &:hover {
    opacity: 1;
  }
`

export const MessageInputContainer = styled.form`
  width: 100%;
  height: 60px;
  border-radius: 14px;
  position: relative;
`

export const InputField = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  padding: 14px 134px 14px 44px;
  background-color: ${({ theme }) => theme.messageInput.bg};
  border: 0px;
  color: ${({ theme }) => theme.messageInput.text};
  font-family: 'archiaregular';
  font-size: 18px;

  &::placeholder {
    color: ${({ theme }) => theme.messageInput.placeholder};
  }

  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.messageInput.outline};
  }
`

export const AttachIcon = styled.button`
  color: ${({ theme }) => theme.messageInput.attachFg};
  ${iconCSS}
  background: transparent;
  left: 0;
  right: none;
  font-size: 28px;
  width: 40px;
  padding-left: 10px;
`

export const EmojiIcon = styled.button`
  background-color: ${({ theme }) => theme.messageInput.emojiBg};
  ${iconCSS}
  right: 60px;
`

export const SendIcon = styled.button`
  background-color: ${({ theme }) => theme.messageInput.sendBg};
  color: ${({ theme }) => theme.messageInput.sendFg};
  ${iconCSS}

  &:disabled {
    cursor: wait;
  }

  border-radius: 0px 14px 14px 0px;
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

  width: 22px;
  height: 22px;
  border: 3px solid ${({ theme }) => theme.messageInput.sendFg};
  border-right: 3px solid transparent;
  border-radius: 20px;
  animation: linear spin 1s infinite;
`
