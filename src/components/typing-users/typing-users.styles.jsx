import styled from 'styled-components'

export const TypingUsersContainer = styled.div`
  margin-top: 14px;
  width: 100%;
  border-radius: 99px;
  overflow: hidden;
  display: flex;

  > :nth-child(n) {
    margin-right: 10px;
  }

  > :last-child {
    margin-right: 0px;
  }
`

export const User = styled.div`
  border-radius: 99px;
  padding: 8px;
  background: ${({ theme }) => theme.typingUsers.itemBg};
  display: flex;
  align-items: center;
  width: fit-content;

  span {
    color: ${({ theme }) => theme.typingUsers.text};
    font-family: 'archiasemibold';
    font-size: 13px;
    margin-right: 2px;
  }
`

export const Dot = styled.div`
  @keyframes blink {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.25;
    }
  }

  width: 8px;
  height: 8px;
  border-radius: 10px;
  margin-left: 4px;
  background: #6c757d;
  animation: blink 800ms infinite alternate;
`
