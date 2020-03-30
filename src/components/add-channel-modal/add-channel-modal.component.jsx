import React from 'react'

import {
  ModalContainer,
  Modal,
  Heading,
  Inputs,
  Input,
  Options,
  Button
} from './add-channel-modal.styles'

class AddChannelModal extends React.Component {
  state = {
    name: '',
    about: ''
  }

  handlePropogation = event => {
    event.stopPropagation()
  }

  handleChange = event => {
    const {
      target: { name, value }
    } = event
    this.setState({
      [name]: value
    })
  }

  render() {
    const { showing, close, confirm } = this.props
    const { name, about } = this.state

    return (
      <ModalContainer showing={showing} onClick={close}>
        <Modal onClick={this.handlePropogation} showing={showing}>
          <Heading>Add a channel</Heading>
          <Inputs>
            <Input>
              <span>name</span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={this.handleChange}
              />
            </Input>
            <Input>
              <span>about</span>
              <input
                type="text"
                name="about"
                value={about}
                onChange={this.handleChange}
              />
            </Input>
          </Inputs>
          <Options>
            <Button className="close" onClick={close}>
              CANCEL
            </Button>
            <Button
              className="confirm"
              onClick={() => confirm({ name, about })}
            >
              ADD
            </Button>
          </Options>
        </Modal>
      </ModalContainer>
    )
  }
}

export default AddChannelModal
