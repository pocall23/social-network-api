const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res){
        User.find({})
        .then(userData =>  res.json(userData))
        .catch(err => {
            console.log(err);
            res.staus(404).json(err);
        });
    },

    getUserById({ params   }, res){
        User.findOne({ _id: params.id})
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then(userData => {
            if(!userData){
                res.status(404).json({ message: 'no thought with this id '});
                return;
            }
            res.json(userData)
        }).catch(err => {
            console.log(err);
            res.staus(404).json(err);
        });
    },

    createUser({ body }, res){
        User.create(body).then(userData => res.json(userData)).catch((err => {
            console.log(err);
            res.staus(404).json(err);
        }))
    },

    updateUser({ params, body }, res){
        User.findOneAndUpdate(
            { _id: params.thoughtId },
            body, 
            { new: true, runValidators: true }
            ).then(userData => {
                if(!userData){
                    res.status(404).json({ message: 'no thought with this id '});
                    return;
                }
                res.json(userData)
            }).catch(err => {
                console.log(err);
                res.staus(404).json(err);
            })
    },

    deleteUser({ params }, res){
        User.findOneAndUpdate(
            { _id: params.id },
        ).then(userData => {
            if(!userData){
                res.status(404).json({ message: 'no thought with this id '});
                return;
            }
            res.json(userData)
        })
        .then(() =>{
            res.json({ massage: 'user has been deleted'})
        })
        .catch(err => {
            console.log(err);
            res.staus(404).json(err);
        })
    },

    addFriend({ params }, res){
        User.findOneAndUpdate(
            { _id: params.id },
            {$pull: { friends: params.friendId}},
            { runValidators: true }
            ).then(userData => {
                if(!userData){
                    res.status(404).json({ message: 'no thought with this id '});
                    return;
                }
                res.json(userData)
            }).catch(err => {
                console.log(err);
                res.staus(404).json(err);
            })
    }
}

module.exports = userController;