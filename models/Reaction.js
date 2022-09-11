const { Schema, Types } = require('mongoose');

const moment = require('moment')

const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()

        },
        reactionBody: {
            type:  String,
            required:true,
            maxLength: 250
        },
        username: {
            type: String,
            required:true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdVal) => moment(createdVal).format('DD MM,YYYY')
        },
        // toJSON: {
        //     virtuals: true,
        //     getters: true
        // },
    }
)

module.exports = reactionSchema;