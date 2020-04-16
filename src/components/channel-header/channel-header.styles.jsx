import styled from 'styled-components'

export const ChannelHeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 14px;
  padding: 14px 20px;
  display: grid;
  align-items: center;
  grid-template-columns: minmax(240px, 2fr) minmax(200px, 1fr);
  font-family: 'archiasemibold';
  background-color: ${({ theme: { channelHeader } }) => channelHeader.bg};
  color: ${({ theme: { channelHeader } }) => channelHeader.text};
`

export const ChannelInfo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Heading = styled.h2`
  font-size: 30px;

  svg {
    color: ${({ theme }) => theme.channelHeader.icon};
    cursor: pointer;
  }
`

export const About = styled.p`
  margin-top: 12px;
  margin-bottom: 2px;
  opacity: 0.8;
`

export const Members = styled.span`
  font-size: 14px;
`

export const SearchFieldContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Search = styled.div`
  position: relative;
  width: 100%;
  height: 46px;

  svg {
    color: ${({ theme }) => theme.channelHeader.search.placeholder};
    position: absolute;
    right: 12px;
    top: 0;
    bottom: 0;
    margin: auto;
    cursor: pointer;
  }
`

export const SearchInput = styled.input`
  color: ${({ theme }) => theme.channelHeader.search.text};
  background-color: ${({ theme }) => theme.channelHeader.search.bg};
  border-radius: 14px;
  border: none;
  font-size: 15px;
  font-family: 'archiaregular';
  width: 100%;
  height: 100%;
  padding: 16px 34px 16px 14px;

  &::placeholder {
    color: ${({ theme }) => theme.channelHeader.search.placeholder};
  }

  &:focus {
    outline: none;
  }
`

export const UserStatus = styled.div`
  display: flex;
  align-items: center;
  margin-top: 6px;
  margin-left: 6px;
`

export const Dot = styled.div`
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

export const Status = styled.p`
  margin-left: 5px;
  text-transform: capitalize;
  opacity: 0.8;
`