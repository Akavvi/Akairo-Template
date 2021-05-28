import { model as GuildModel, Schema } from 'mongoose'

export default GuildModel('guilds', new Schema({
    id: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
        required: true
    }
}, { minimize: false }))

