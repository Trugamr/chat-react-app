import React from 'react'
import AvatarEditor from 'react-avatar-editor'

import {
  AvatarModalContainer,
  Modal,
  Heading,
  Inputs,
  Input,
  Options,
  Button,
  Editor
} from './change-avatar-modal.styles'

class ChangeAvatarModal extends React.Component {
  state = {
    avatarImage: null,
    avatarImageData: null,
    scale: 120
  }

  handlePropogation = event => {
    event.stopPropagation()
  }

  handleSubmit = event => {
    event.preventDefault()
    const { confirm } = this.props

    if (this.avatarEditor) {
      this.avatarEditor.getImageScaledToCanvas().toBlob(avatarBlob => {
        confirm(avatarBlob)
      })
    }
  }

  handleChange = event => {
    const files = event.target.files
    const file = files && files.length ? files[0] : null
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
      reader.addEventListener('load', () => {
        this.setState({
          avatarImage: file,
          avatarImageData: reader.result
        })
      })
    }
  }

  setScale = event => {
    const { value } = event.target

    this.setState({
      scale: value
    })
  }

  setEditorRef = editor => (this.avatarEditor = editor)

  render() {
    const { avatarImage, avatarImageData, scale } = this.state
    const { showing, close } = this.props

    return (
      <AvatarModalContainer showing={showing} onClick={close}>
        <Modal
          onClick={this.handlePropogation}
          onSubmit={this.handleSubmit}
          showing={showing}
        >
          <Heading>Upload an image</Heading>
          {avatarImageData ? (
            <Editor>
              <AvatarEditor
                ref={this.setEditorRef}
                image={avatarImageData}
                scale={scale / 100}
                onImageChange={this.onImageCrop}
              />
              <input
                type="range"
                min="100"
                max="200"
                value={this.state.scale}
                onChange={this.setScale}
              />
            </Editor>
          ) : null}
          <Inputs>
            <Input>
              <span>{avatarImage ? avatarImage.name : 'select a file'}</span>
              <label htmlFor="avatarImage">choose</label>
              <input
                type="file"
                name="avatarImage"
                id="avatarImage"
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
      </AvatarModalContainer>
    )
  }
}

export default ChangeAvatarModal
