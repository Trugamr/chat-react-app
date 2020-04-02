import React from 'react'

import {
  FileModalContainer,
  Modal,
  Heading,
  Inputs,
  Input,
  Options,
  Button
} from './file-upload-modal.styles'

class FileUploadModal extends React.Component {
  state = {
    file: null
  }

  handlePropogation = event => {
    event.stopPropagation()
  }

  handleSubmit = event => {
    event.preventDefault()
    const { file } = this.state
    const { confirm } = this.props
    confirm(file)
  }

  handleChange = event => {
    const files = event.target.files
    const file = files && files.length ? files[0] : null
    this.setState({
      file
    })
  }

  render() {
    const { file } = this.state
    const { showing, close } = this.props

    return (
      <FileModalContainer showing={showing} onClick={close}>
        <Modal
          onClick={this.handlePropogation}
          onSubmit={this.handleSubmit}
          showing={showing}
        >
          <Heading>Add a file</Heading>
          <Inputs>
            <Input>
              <span>{file ? file.name : 'select a file'}</span>
              <label htmlFor="file">choose</label>
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                onChange={this.handleChange}
              />
            </Input>
          </Inputs>
          <Options>
            <Button className="close" type="button" onClick={close}>
              CANCEL
            </Button>
            <Button className="confirm" type="submit">
              UPLOAD
            </Button>
          </Options>
        </Modal>
      </FileModalContainer>
    )
  }
}

export default FileUploadModal
