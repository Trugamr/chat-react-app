import React from 'react'

import { SpinnerContainer, LoadingText, Loader } from './spinner.styles'

const Spinner = ({ loadingText, size = '50px', fontSize = '16px' }) => {
  return (
    <SpinnerContainer>
      <Loader size={size} />
      {loadingText ? (
        <LoadingText fontSize={fontSize}>{loadingText}</LoadingText>
      ) : (
        ''
      )}
    </SpinnerContainer>
  )
}

export default Spinner
