import {Schema, model} from 'mongoose'

const postscheama = new Schema(
    {
      postcontent: {
        "type": "string",
        "pattern": "^(?!.*(sex|Sex|SEX|porn|Porn|PORN|xxx|XXX)).{1,50}$",
        "errorMessage": "Name must not contain sexual words and be 50 characters or less.",
        "default": ""
      },
      picture: {
        "type": "Array",
        "default": "no image"
      },
      video: {
        "type": "Array",
        "default": "no video"
      },
      postownerid: {
        "type": "string",
        "required": "true"
      },
      like: {
        "type": "Array"
      },
      comment: {
        "type": "Array"
      },
      blockfor: {
        "type": "Array"
      },
      type: {
        "type": "String"
      }
    },
    {
        timestamps: true
    }
)

const postmodel = new model('post', postscheama)
export default postmodel