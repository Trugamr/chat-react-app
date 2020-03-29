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
  font-family: 'archiasemibold';
  font-size: 16px;
  color: ${({ theme }) => theme.channels.text};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.channels.hover : 'transparent'};

  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.channels.hover};
  }
`
