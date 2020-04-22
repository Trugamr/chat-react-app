import styled from 'styled-components'

export const MetaPanelContainer = styled.div`
  width: 100%;
  max-width: 280px;
  height: 100%;
  padding: 14px 14px 14px 0px;
  transition: ease-in-out transform 200ms;

  @media only screen and (max-width: 1100px) {
    padding: 0px;
    position: fixed;
    z-index: 10;
    top: 0;
    right: 0;
    width: 280px;
    background-color: ${({ theme }) => theme.meta.bg};
    box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.meta.shadow};
    transform: ${({ metaShowing }) =>
      metaShowing ? 'translateX(0px)' : 'translateX(300px)'};
  }
`

export const Meta = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.meta.bg};
  border-radius: 14px;
  padding: 14px 20px;

  @media only screen and (max-width: 1100px) {
    border-radius: 0px;
  }

  h2 {
    font-family: 'archiasemibold';
    color: ${({ theme }) => theme.meta.textPrimary};
  }

  p,
  span {
    font-family: 'archiaregular';
    color: ${({ theme }) => theme.meta.textSecondary};
    font-size: 16px;
  }
`

export const CloseMeta = styled.div`
  color: ${({ theme }) => theme.meta.closeButton.text};
  background-color: ${({ theme }) => theme.meta.closeButton.bg};
  font-family: 'archiabold';
  padding: 8px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  margin: 14px 14px 0px 14px;

  span {
    margin-left: 8px;
  }

  cursor: pointer;

  @media only screen and (min-width: 1100px) {
    display: none;
  }
`

export const About = styled.div`
  margin-bottom: 14px;

  h2 {
    font-size: 22px;
  }
`

export const CreatedBy = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  h2 {
    font-size: 18px;
    margin-right: 6px;
  }
`

export const CreatedOn = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;

  h2 {
    font-size: 18px;
    margin-right: 6px;
  }
`

export const ActiveMembers = styled.ul`
  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  > :last-child {
    margin-bottom: 0px;
  }
`

export const Member = styled.li`
  display: grid;
  grid-template-columns: 45px auto;
  grid-gap: 8px;
  align-items: center;
  margin-bottom: 10px;

  h2 {
    margin-bottom: 0px;
  }

  img {
    height: 45px;
    width: 45px;
    border-radius: 30px;
  }
`

export const Info = styled.div`
  h2 {
    font-size: 17px;
  }

  span {
    font-size: 14px;
  }
`
