import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

export const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.link.text};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.link.bg};
  }

  &:visited {
    color: ${({ theme }) => theme.link.text};
  }
`
