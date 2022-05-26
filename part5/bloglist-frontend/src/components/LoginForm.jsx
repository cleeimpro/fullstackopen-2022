import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    setUsername,
    setPassword,
    username,
    password,
}) => {
    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        type="text"
                        id="username"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        id="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit" id="login-button">
                    login
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
