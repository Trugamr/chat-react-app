import styled, { css } from 'styled-components'

const opacityAnimation = css`
  @keyframes opacityIn {
    from {
      background-color: transparent;
    }
    to {
      visibility: visible;
      background-color: ${({ theme }) => theme.userStatusCard.modal.bg};
    }
  }

  @keyframes opacityOut {
    from {
      background-color: ${({ theme }) => theme.userStatusCard.modal.bg};
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

export const AvatarModalContainer = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;

  ${opacityAnimation}
`

export const Modal = styled.form`
  padding: 20px;
  border-radius: 12px;
  visibility: hidden;
  background: ${({ theme }) => theme.userStatusCard.modal.modalBg};
  display: grid;
  grid-gap: 16px;

  ${scaleAnimation}
`

export const Heading = styled.h2`
  color: ${({ theme }) => theme.userStatusCard.modal.textPrimary};
  font-size: 20px;
  font-family: 'archiasemibold';
`

export const Editor = styled.div`
  display: grid;
  grid-template-rows: auto 30px;
  justify-content: center;
  align-items: center;

  input {
    margin-top: 10px;
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 8px;
    background-color: ${({ theme }) => theme.userStatusCard.modal.bg};
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      border-radius: 10px;
      background-color: ${({ theme }) =>
        theme.userStatusCard.modal.textPrimary};
      cursor: pointer;
    }
  }
`

export const Inputs = styled.div`
  display: grid;
  grid-gap: 10px;
`

export const Input = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 80px 0px;

  label {
    font-family: 'archiasemibold';
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 12px;
    font-size: 16px;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border-radius: 0px 8px 8px 0px;
    color: ${({ theme }) => theme.userStatusCard.modal.textSecondary};
    background-color: ${({ theme }) => theme.userStatusCard.modal.textPrimary};
  }

  span {
    min-width: 160px;
    padding: 8px;
    border: 0px;
    background-color: ${({ theme }) => theme.userStatusCard.modal.bg};
    color: ${({ theme }) => theme.userStatusCard.modal.textPrimary};
    border-radius: 8px;
    font-family: 'archiaregular';
    font-size: 16px;
  }

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.userStatusCard.modal.textPrimary};
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
    color: ${({ theme }) => theme.userStatusCard.modal.textPrimary};
    background-color: ${({ theme }) =>
      theme.userStatusCard.modal.textSecondary};
    border: 2px solid ${({ theme }) => theme.userStatusCard.modal.textPrimary};
  }

  &.confirm {
    color: ${({ theme }) => theme.userStatusCard.modal.textSecondary};
    background-color: ${({ theme }) => theme.userStatusCard.modal.textPrimary};
  }
`
