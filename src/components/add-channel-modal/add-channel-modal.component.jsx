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

  formattedValue = value => {
    value = value
      .replace(' ', '-')
      .replace('--', '-')
      .toLowerCase()

    if (value.startsWith('-')) value = ''
    return value
  }

  handleChange = event => {
    let {
      target: { name, value }
    } = event

    if (name === 'name') value = this.formattedValue(value)

    this.setState({
      [name]: value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    let { name, about } = this.state
    name = name.endsWith('-') ? name.substring(0, name.length - 1) : name
    const { confirm } = this.props
    confirm({ name, about })
  }

  render() {
    const { showing, close } = this.props
    const { name, about } = this.state

    return (
      <ModalContainer showing={showing} onClick={close}>
        <Modal
          onClick={this.handlePropogation}
          onSubmit={this.handleSubmit}
          showing={showing}
        >
          <Heading>Add a channel</Heading>
          <Inputs>
            <Input>
              <span>name</span>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="channel-name"
                onChange={this.handleChange}
              />
            </Input>
            <Input>
              <span>about</span>
              <input
                type="text"
                name="about"
                value={about}
                placeholder="description"
                onChange={this.handleChange}
              />
            </Input>
          </Inputs>
          <Options>
            <Button className="close" type="button" onClick={close}>
              CANCEL
            </Button>
            <Button className="confirm" type="submit">
              ADD
            </Button>
          </Options>
        </Modal>
      </ModalContainer>
    )
  }
}

export default AddChannelModal
