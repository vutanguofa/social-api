//Module example
// const router = require('express').Router();
// const {
//   addComment,
//   removeComment,
//   addReply,
//   removeReply
// } = require('../../controllers/comment-controller');

// // /api/comments/<pizzaId>
// router.route('/:pizzaId').post(addComment);

// // /api/comments/<pizzaId>/<commentId>
// router
//   .route('/:pizzaId/:commentId')
//   .put(addReply)
//   .delete(removeComment);

// // /api/comments/<pizzaId>/<commentId>/<replyId>
// router.route('/:pizzaId/:commentId/:replyId').delete(removeReply);

// module.exports = router;

const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// /api/<users>
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// /api/users/:userId
router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// /api/users/:userId/friends/:friendId
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;