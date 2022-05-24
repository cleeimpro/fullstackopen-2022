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
                        value={newBlog.title}
                        name="newTitle"
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, title: target.value })
                        }
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={newBlog.author}
                        name="newAuthor"
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, author: target.value })
                        }
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={newBlog.url}
                        name="newUrl"
                        onChange={({ target }) =>
                            setNewBlog({ ...newBlog, url: target.value })
                        }
                    />
                </div>
                <button>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default BlogForm
