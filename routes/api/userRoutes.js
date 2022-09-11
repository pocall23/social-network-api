const router = require('express').Router();

const {
    getAllUsers,
    getUsersById,
    createUsers,
    updateUsers,
    deleteUsers,
    addFriend
    // deleteFriend
} = require("../../controllers/userController")

router.route('/')
// .get()
.get(getAllUsers)
// .post();
.post(createUsers);

router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route('/:id/friends/:friendId')
.post(addFriend)
.delete(deleteFriend);

module.exports = router;