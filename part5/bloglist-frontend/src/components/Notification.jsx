import React from 'react'

const Notification = ({ notification }) => {
    if (notification === null) {
        return null
    }

    const style = {
        color: notification.type === 'info' ? 'green' : 'red',
        background: 'lightgray',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        borderColor: notification.type === 'info' ? 'green' : 'red',
        padding: '10px',
        marginBottom: '10px',
    }

    return <div style={style}>{notification.message}</div>
}

export default Notification
