import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const BirthyearForm = () => {
    const result = useQuery(ALL_AUTHORS)
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: error => console.error(error)
    })

    if (result.loading) return <div>loading...</div>

    const authors = result.data.allAuthors

    const handleNewBirthyear = e => {
        e.preventDefault()
        const name = e.target.name.value
        const born = e.target.newBirthyear.value
        editAuthor({ variables: { name, born: Number(born) } })

        e.target.newBirthyear.value = ''
    }

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={handleNewBirthyear}>
                <select name="name">
                    {authors.map(a => (
                        <option key={a.id} name={a.name}>
                            {a.name}
                        </option>
                    ))}
                </select>
                <br />
                <input
                    type="number"
                    name="newBirthyear"
                    placeholder="new birthyear"
                />
                <br />
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default BirthyearForm
