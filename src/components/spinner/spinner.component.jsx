import React from 'react'

import { SpinnerContainer, LoadingText, Loader } from './spinner.styles'

const Spinner = ({
  loadingText,
  size = '50px',
  fontSize = '16px',
  ...props
}) => {
  return (
    <SpinnerContainer {...props}>
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
