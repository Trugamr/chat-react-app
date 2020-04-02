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
  position: relative;
  background-color: ${({ theme }) => theme.messages.bg};
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;

  > :nth-child(n) {
    margin-bottom: 12px;
  }

  > :last-child {
    margin-bottom: 0px;
  }

  ${scrollbar}
`
