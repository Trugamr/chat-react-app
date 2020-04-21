import styled, { css } from 'styled-components'

const scrollbar = css`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-button {
    width: 0px;
    height: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbar.fg};
    opacity: 0.5;
    border: 0px;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-thumb:hover,
  ::-webkit-scrollbar-thumb:active {
    background: ${({ theme }) => theme.scrollbar.fgHover};
  }

  ::-webkit-scrollbar-track {
    border: 0px;
    border-radius: 50px;
  }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-track:hover,
  ::-webkit-scrollbar-track:active {
    background: ${({ theme }) => theme.scrollbar.bg};
  }

  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`

export const MessagesContainer = styled.div`
  width: 100%;
  min-height: 100%;
  border-radius: 14px;
  padding: 20px;
  background-color: ${({ theme }) => theme.messages.bg};
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  flex: 1 0;

  > :nth-child(n) {
    margin-bottom: 12px;
  }

  > :last-child {
    margin-bottom: 0px;
  }

  ${scrollbar}
`

export const TypingContainer = styled.div`
  align-self: flex-end;
  width: 100%;
`

export const EmptyPlaceholder = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'archiabold';
  font-size: 24px;

  span {
    color: ${({ theme }) => theme.messages.placeholder};
  }
`
