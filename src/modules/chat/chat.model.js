import {Schema, model} from'mongoose'

const chatschema = new Schema(
    {
        chatIds: {
            "type": "array",
            "default": []
        },
        messages: {
            "type": "array",
            "default": []
        }
    },
    {
        timestamps: true
    }
)

const chatmodel = new model('chat', chatschema)
export default chatmodel