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
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thought
router
    .route('/')
    .get(getAllThoughts);

// /api/thought/:userId
router
    .route('/:userId')
    .post(addThought);

// /api/thought/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought);

// /api/thought/:userId/:ThoughtId
router
    .route('/:userId/:thoughtId')
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;