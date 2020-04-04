import styled from 'styled-components'

export const DirectMessagesContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 14px;
  padding: 18px;
  background-color: ${({ theme }) => theme.directMessages.bg};
`

export const DirectMessagesHeading = styled.div`
  font-family: 'archiasemibold';
  font-size: 17px;
  color: ${({ theme }) => theme.directMessages.text};
  display: grid;
  grid-template-columns: auto 20px;

  svg {
    justify-self: center;
    align-self: center;
    cursor: pointer;
  }
`

export const DirectMessagesList = styled.ul`
  margin-top: 10px;
`

export const DirectMessagesItem = styled.li`
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.directMessages.hover : 'transparent'};
  opacity: ${({ selected }) => (selected ? 1 : 0.8)};

  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.directMessages.hover};
  }
`

export const User = styled.div`
  display: flex;
  align-items: center;

  p {
    font-family: 'archiasemibold';
    font-size: 16px;
    color: ${({ theme }) => theme.directMessages.text};
    margin-left: 6px;
  }
`

export const Status = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;

  background-color: ${({ theme, status }) => {
    const { directMessages } = theme
    if (status === 'online') return directMessages.status.online
    if (status === 'away') return directMessages.status.away
    else return directMessages.status.offline
  }};
`
