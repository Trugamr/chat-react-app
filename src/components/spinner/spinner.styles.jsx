import styled from 'styled-components'

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.spinner.bg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Loader = styled.div`
  @keyframes spin {
    from {
      transform: rotate(-45deg);
    }
    to {
      transform: rotate(315deg);
    }
  }

  height: ${({ size }) => size};
  width: ${({ size }) => size};
  border: 8px solid ${({ theme }) => theme.spinner.loaderFg};
  border-right: 8px Solid ${({ theme }) => theme.spinner.loaderBg};
  border-radius: 9999px;
  animation: linear spin 1.2s infinite;
`

export const LoadingText = styled.p`
  font-family: 'archiasemibold';
  color: ${({ theme }) => theme.spinner.text};
  font-size: ${({ fontSize }) => fontSize};
  padding: 20px;
`
