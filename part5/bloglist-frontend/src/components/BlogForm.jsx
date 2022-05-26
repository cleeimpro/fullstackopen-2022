import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const clearBlog = { title: '', author: '', url: '' }
    const [newBlog, setNewBlog] = useState(clearBlog)

    const addBlog = (event) => {
        event.preventDefault()
        createBlog(newBlog)
        setNewBlog(clearBlog)
    }

    return (
        <div>
            <h3>create new blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        id="newTitle"
                        value={newBlog.title}
                        placeholder="title"
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, title: target.value })
                        }
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        id="newAuthor"
                        value={newBlog.author}
                        placeholder="author"
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, author: target.value })
                        }
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        id="newUrl"
                        value={newBlog.url}
                        placeholder="url"
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, url: target.value })
                        }
                    />
                </div>
                <button id="createNewBlog">create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
