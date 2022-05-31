import { connect } from 'react-redux'

const Notification = (props) => {
    const notification = props.notification
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    }
    if (notification === '') return null
    return <div style={style}>{notification}</div>
}

export default connect((state) => ({ notification: state.notification }))(
    Notification
)
