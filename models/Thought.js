const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

const moment = require('moment')


const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength:250
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
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
      id: false
    },
)

ThoughtSchema.virtual('reactionAmount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = { Thought };