const { Schema, model, Types } = require('mongoose');

const moment = require('moment')


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength:250
        },
        username: {
            type: 'String',
            required:true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdVal) => moment(createdVal).format('DD MM,YYYY')
        },
        toJSON: {
            virtuals: true,
            getters: true,
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters:true,
        },
        id:false,
    }, 
)

ThoughtSchema.virtual('reactionAmount').get(function(){
    return this.reactions.length;
});

const Thoughts= model('Thoughts', ThoughtSchema);

module.exports = Thoughts;