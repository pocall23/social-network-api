const { Schema, model } = require('mongoose')

const UserSchema = new Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique:true,

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thought'
    }],
    friendsw:[{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
        getters:true, 
       },
       id: false
})

UserSchema.virtual('friendAmount').get(function(){
    return this.friends.length;
})

const User = model('User', UserSchema);

module.exports = User;