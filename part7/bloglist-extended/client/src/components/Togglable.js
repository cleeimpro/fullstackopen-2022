import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

import { Button, Container } from '@chakra-ui/react'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <Container p="3">
            <div style={hideWhenVisible}>
                <Button onClick={toggleVisibility} colorScheme="teal">
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button onClick={toggleVisibility} colorScheme="teal">
                    cancel
                </Button>
            </div>
        </Container>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
}

export default Togglable
