import styled, { css } from 'styled-components'

const opacityAnimation = css`
  @keyframes opacityIn {
    from {
      background-color: transparent;
    }
    to {
      visibility: visible;
      background-color: ${({ theme }) => theme.channels.modal.bg};
    }
  }

  @keyframes opacityOut {
    from {
      background-color: ${({ theme }) => theme.channels.modal.bg};
      /* at start showing is false so in 
      order to avoit flicker issue visibility is set dynamically */
      visibility: ${({ showing }) => (showing ? 'visible' : 'hidden')};
    }
    to {
      visibility: hidden;
      background-color: transparent;
    }
  }

  animation-name: ${({ showing }) => (showing ? 'opacityIn' : 'opacityOut')};
  animation-duration: 500ms;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
`

const scaleAnimation = css`
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      visibility: visible;
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scaleOut {
    from {
      visibility: ${({ showing }) => (showing ? 'visible' : 'hidden')};
    }
    to {
      visibility: hidden;
      opacity: 0;
    }
  }

  animation-name: ${({ showing }) => (showing ? 'scaleIn' : 'scaleOut')};
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(0.19, 0.67, 0.01, 1.3);
  animation-fill-mode: forwards;
`

export const ModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  ${opacityAnimation}
`

export const Modal = styled.div`
  padding: 20px;
  border-radius: 12px;
  visibility: hidden;
  background: ${({ theme }) => theme.channels.modal.modalBg};
  display: grid;
  grid-gap: 16px;

  ${scaleAnimation}
`

export const Heading = styled.h2`
  color: ${({ theme }) => theme.channels.modal.textPrimary};
  font-size: 20px;
  font-family: 'archiasemibold';
`

export const Inputs = styled.div`
  display: grid;
  grid-gap: 10px;
`

export const Input = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 80px auto;

  span {
    font-family: 'archiasemibold';
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    font-size: 16px;
    height: 100%;
    width: 100%;
    border-radius: 8px 0px 0px 8px;
    color: ${({ theme }) => theme.channels.modal.textSecondary};
    background-color: ${({ theme }) => theme.channels.modal.textPrimary};
  }

  input {
    padding: 8px;
    border: 0px;
    background-color: ${({ theme }) => theme.channels.modal.bg};
    color: ${({ theme }) => theme.channels.modal.textPrimary};
    border-radius: 8px;
    font-family: 'archiaregular';
    font-size: 16px;

    &:focus {
      outline: none;
    }
  }
`

export const Options = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 10px;
`

export const Button = styled.button`
  margin-left: 10px;
  border: 2px solid transparent;
  font-family: 'archiasemibold';
  cursor: pointer;
  outline: none;
  border-radius: 8px;
  padding: 6px;
  min-width: 70px;
  font-size: 15px;

  &.close {
    color: ${({ theme }) => theme.channels.modal.textPrimary};
    background-color: ${({ theme }) => theme.channels.modal.textSecondary};
    border: 2px solid ${({ theme }) => theme.channels.modal.textPrimary};
  }

  &.confirm {
    color: ${({ theme }) => theme.channels.modal.textSecondary};
    background-color: ${({ theme }) => theme.channels.modal.textPrimary};
  }
`
