import mongoose from 'mongoose'

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    favoriteGenre: String
})

export default mongoose.model('User', schema)
