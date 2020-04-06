import styled from 'styled-components'

export const ChannelsContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 14px;
  padding: 18px;
  background-color: ${({ theme }) => theme.channels.bg};
`

export const ChannelsHeading = styled.div`
  font-family: 'archiasemibold';
  font-size: 17px;
  color: ${({ theme }) => theme.channels.text};
  display: grid;
  grid-template-columns: auto 20px;

  svg {
    justify-self: center;
    align-self: center;
    cursor: pointer;
  }
`

export const ChannelsList = styled.ul`
  margin-top: 10px;
`

export const ChannelItem = styled.li`
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  display: flex;
  align-items: center;

  background-color: ${({ selected, theme }) =>
    selected ? theme.channels.hover : 'transparent'};
  opacity: ${({ selected }) => (selected ? 1 : 0.8)};

  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.channels.hover};
  }
`
export const Name = styled.p`
  font-family: 'archiasemibold';
  font-size: 16px;
  color: ${({ theme }) => theme.channels.text};
  flex: 1 0;
`

export const Notifications = styled.span`
  font-family: 'archiasemibold';
  background-color: ${({ theme }) => theme.channels.notificationsBg};
  color: ${({ theme }) => theme.channels.notificationsFg};
  padding: 2px 4px;
  font-size: 13px;
  border-radius: 6px;
  justify-self: flex-end;
`
