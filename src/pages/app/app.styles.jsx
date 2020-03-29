import styled from 'styled-components'

export const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(260px, 25%) auto 20%;
  background-color: ${({ theme }) => theme.bg};
`
