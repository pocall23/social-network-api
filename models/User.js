const UserSchema = new Schema( {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique:true,

    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thoughts'
    }],
    friendsw:[{
        type:Schema.Types.ObjectId,
        ref: 'Users'
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

const Users = model('User', UserSchema);

module.exports = Users;