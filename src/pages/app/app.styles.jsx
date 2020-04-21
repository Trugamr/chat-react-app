import styled from 'styled-components'

export const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  /* display: grid; */
  /* grid-template-columns: minmax(260px, 25%) auto 25%; */
  display: flex;
  background-color: ${({ theme }) => theme.bg};

  @media only screen and (max-width: 1100px) {
    /* grid-template-columns: minmax(260px, 25%) 1fr auto; */
    display: flex;
  }

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`
