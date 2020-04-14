import styled from 'styled-components'

export const UserAndOptionsContainer = styled.div`
  width: 100%;
  height: 76px;
  border-radius: 14px;
  background-color: ${({ theme }) => theme.userStatusCard.bg};
  transition: ease max-height 0.4s;
  position: relative;
  /* max-height: ${({ opened }) => (opened ? '76px' : '200px')}; */
`

export const UserStatusCardContainer = styled.div`
  display: grid;
  grid-template-columns: 52px auto 20px;
  padding: 12px;
`

export const UserAvatar = styled.div`
  width: 52px;
  height: 52px;
  border: 8px;
  border-radius: 12px;
  background-color: white;
  overflow: hidden;
`

export const UserInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 10px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
`

export const Username = styled.p`
  color: ${({ theme }) => theme.userStatusCard.text};
  font-family: 'archiasemibold';
  font-size: 16px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const UserStatus = styled.div`
  display: flex;
  align-items: center;

  span {
    color: ${({ theme }) => theme.userStatusCard.subText};
    font-family: 'archiaregular';
    text-transform: capitalize;
    margin-left: 5px;
    font-size: 13px;
  }
`

export const Indicator = styled.div`
  height: 12px;
  width: 12px;
  margin: auto 0px;
  border-radius: 9999px;
  background-color: ${({
    theme: {
      userStatusCard: { statusColors }
    },
    status
  }) => {
    if (status === 'online') return statusColors.online
    else if (status === 'away') return statusColors.away
    else return statusColors.offline
  }};
`

export const OptionsToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 16px;
    cursor: pointer;
    transition: ease transform 0.2s;
    transform: ${({ opened }) => (opened ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`

export const Line = styled.hr`
  margin-top: 12px;
  height: 1px;
  background-color: ${({ theme }) => theme.userStatusCard.icon};
  border: none;
`

export const Options = styled.ul`
  max-height: ${({ opened }) => (opened ? '180px' : '0px')};
  width: 100%;
  background-color: ${({ theme }) => theme.userStatusCard.bg};
  position: absolute;
  z-index: 2;
  top: 64px;
  border-radius: 0px 0px 14px 14px;
  transition: ease max-height 0.3s;
  overflow: hidden;
  padding: 0px 12px;

  li {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 3px;

    :last-child {
      border-radius: 0px 0px 6px 6px;
      margin-bottom: 15px;
    }

    span {
      color: ${({ theme }) => theme.userStatusCard.subText};
      font-family: 'archiaregular';
      font-size: 14px;
      margin-left: 6px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.userStatusCard.optionBg};
    }

    &.status-box {
      padding: 0px;

      &:hover {
        background-color: transparent;
      }
    }
  }
`

export const Dots = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(3, 1fr);
`

export const Dot = styled.div`
  background-color: ${({ theme }) => theme.userStatusCard.icon};
  padding: 10px;
  display: flex;
  align-items: center;
  border-radius: 6px;
  justify-content: center;
`

export const Circle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 14px;
  background-color: ${({ theme, name }) => {
    if (name === 'online') return theme.userStatusCard.statusColors.online
    else if (name === 'offline')
      return theme.userStatusCard.statusColors.offline
    else return theme.userStatusCard.statusColors.away
  }};
`
