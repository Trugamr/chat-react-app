import styled from 'styled-components'

export const SidePanelContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.sidePanel.bg};
  padding: 14px;

  > :nth-child(n) {
    margin-bottom: 16px;
  }

  > :last-child {
    margin-bottom: 0px;
  }

  transition: ease-in-out transform 200ms;

  @media only screen and (max-width: 768px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    width: 240px;
    box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.sidePanel.shadow};
    transform: ${({ sidebarShowing }) =>
      sidebarShowing ? 'translateX(0px)' : 'translateX(-260px)'};
  }
`

export const CloseSidebar = styled.div`
  color: ${({ theme }) => theme.sidePanel.closeButton.text};
  background-color: ${({ theme }) => theme.sidePanel.closeButton.bg};
  font-family: 'archiabold';
  padding: 8px;
  border-radius: 14px;
  display: flex;
  align-items: center;

  span {
    margin-left: 8px;
  }

  cursor: pointer;

  @media only screen and (min-width: 768px) {
    display: none;
  }
`
