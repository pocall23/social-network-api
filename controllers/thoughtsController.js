const { Thought, User } = require("../models");
const { param } = require("../routes");

const thoughtController = {

    getAllThoughts(req, res) {
        Thought.find({})

        .then(thoughtData => res.json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    getThoughtById({ params }, res){
        Thought.findOne({ _id:params.thoughtId })
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({ message: "no thought with this id" });
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err)
        });
    },

    addThought({ params, body }, res){
        console.log(body);
        Thought.create(body)
        .then(({ _id }) => {
            return User.findOneAndUpdate(
               { _id: params.userId },
               {$push: { thoughts: _id }},
               { new: true }           
                )
        })
            .then(userData => {
                if(!userData){
                    res.status(404).json({ message: 'no user found with this this id'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body, 
            { new: true, runValidators: true }
             )
        .then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({ message: 'no thought with this id '});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    
    removeThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if(!deletedThought){
                return res.status(404).json({ message: ' no thought with this id'});
            }
            return User.findOneAndUpdate(
                { _id: param.userId},
                { $pull: { thoughts: params.thoughtId }},
                { new: true }
            );
        }).then(userData => {
            if(!userData){
                res.status(404).json({ message: 'no user with this id '});
                return;
            }
            res.json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });

    },

    addReaction({ params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions : body} },
            { new: true, runValidators: true }
        ).then(thoughtData => {
            if(!thoughtData){
                res.status(404).json({ message: 'no thought with this id '});
                return;
            }
            res.json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    removeReaction({ params }, res){
        console.log(params.thoughtId, params.reactionId);
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions : body} },
            { new: true, runValidators: true }
        ).then(userData => res.json(userData)).catch(err=> res.json(err));
    }
}

module.exports = thoughtController;

