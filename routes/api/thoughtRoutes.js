const router = require('express').Router();

const { Router } = require('express');
const {
    getAllThoughts,
    getThoughtsById,
    creawteThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtsController');

router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts);

router.route('/:userId').post(creawteThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughts/reactions/:reactionId').delete(deleteReaction);

module.exports = router;


