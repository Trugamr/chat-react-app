import styled from 'styled-components'

export const MessageContainer = styled.div`
  display: grid;
  grid-template-columns: 54px auto;
  grid-gap: 8px;
  align-items: center;
`

export const Avatar = styled.div`
  width: 100%;
  height: 100%;
  img {
    width: 54px;
    height: 54px;
    align-self: top;
    border-radius: 14px;
  }
`

export const MessageInfo = styled.div`
  color: ${({ theme }) => theme.message.textPrimary};
`

export const Heading = styled.div`
  font-family: 'archiasemibold';
  display: flex;
  align-items: center;
  margin-bottom: 3px;

  h2 {
    font-size: 16px;
  }

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.message.textSecondary};
    margin-left: 6px;
  }
`

export const Content = styled.p`
  font-size: 16px;
  padding-right: 20px;
  font-family: 'archiaregular';
  word-break: break-word;
`
