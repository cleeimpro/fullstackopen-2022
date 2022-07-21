import { useSelector } from 'react-redux'

import { Alert, AlertIcon } from '@chakra-ui/react'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if (notification === null) {
        return null
    }

    return (
        <Alert status={notification.type === 'alert' ? 'error' : 'success'}>
            <AlertIcon />
            {notification.message}
        </Alert>
    )
}

export default Notification
