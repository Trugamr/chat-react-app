import styled from 'styled-components'

export const StarredContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 14px;
  padding: 18px;
  background-color: ${({ theme }) => theme.starred.bg};
`

export const StarredHeading = styled.div`
  font-family: 'archiasemibold';
  font-size: 17px;
  color: ${({ theme }) => theme.starred.text};
  display: grid;
  grid-template-columns: auto 20px;

  svg {
    justify-self: center;
    align-self: center;
  }
`

export const StarredList = styled.ul`
  margin-top: 10px;
`

export const StarredItem = styled.li`
  font-family: 'archiasemibold';
  font-size: 16px;
  color: ${({ theme }) => theme.starred.text};
  cursor: pointer;
  padding: 4px;
  border-radius: 8px;
  background-color: ${({ selected, theme }) =>
    selected ? theme.starred.hover : 'transparent'};
  opacity: ${({ selected }) => (selected ? 1 : 0.8)};

  margin-bottom: 4px;

  :last-child {
    margin-bottom: 0px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.starred.hover};
  }
`
