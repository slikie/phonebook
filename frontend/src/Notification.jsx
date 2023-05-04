const Notification = ({ message }) => {
    if (message == '' || message === null) {
        return null
    }

    return (
        <div className='info'>
            {message}
        </div>
    )
}

const Error = ({ message }) => {
    if (message == '' || message === null) {
        return null
    }

    return (
        <div className='error'>
            {message}
        </div>
    )
}


export default {
    Notification,
    Error,
}