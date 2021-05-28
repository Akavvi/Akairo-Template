import { model as UserModel, Schema } from 'mongoose'

export default UserModel('users', new Schema({
    id: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        required: true
    }
}, { minimize: false }))

