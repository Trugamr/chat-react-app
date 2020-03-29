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
`
