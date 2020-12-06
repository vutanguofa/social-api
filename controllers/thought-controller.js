// Module example
// const { Comment, Pizza } = require('../models');

// const commentController = {
//   // add comment to pizza
//   addComment({ params, body }, res) {
//     console.log(params);
//     Comment.create(body)
//       .then(({ _id }) => {
//         return Pizza.findOneAndUpdate(
//           { _id: params.pizzaId },
//           { $push: { comments: _id } },
//           { new: true }
//         );
//       })
//       .then(dbPizzaData => {
//         console.log(dbPizzaData);
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.json(err));
//   },

//   // add reply to comment
//   addReply({ params, body }, res) {
//     Comment.findOneAndUpdate(
//       { _id: params.commentId },
//       { $push: { replies: body } },
//       { new: true, runValidators: true }
//     )
//       .then(dbPizzaData => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.json(err));
//   },

//   // remove comment
//   removeComment({ params }, res) {
//     Comment.findOneAndDelete({ _id: params.commentId })
//       .then(deletedComment => {
//         if (!deletedComment) {
//           return res.status(404).json({ message: 'No comment with this id!' });
//         }
//         return Pizza.findOneAndUpdate(
//           { _id: params.pizzaId },
//           { $pull: { comments: params.commentId } },
//           { new: true }
//         );
//       })
//       .then(dbPizzaData => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.json(err));
//   },
//   // remove reply
//   removeReply({ params }, res) {
//     Comment.findOneAndUpdate(
//       { _id: params.commentId },
//       { $pull: { replies: { replyId: params.replyId } } },
//       { new: true }
//     )
//       .then(dbPizzaData => res.json(dbPizzaData))
//       .catch(err => res.json(err));
//   }
// };

// module.exports = commentController;

const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendSatus(400);
            })
    },

    // get thought by id
    getThoughtById({ params }, res) {
        User.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // add a thought
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            body,
            {
                new: true,
                runValidators: true
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete thought
    deleteThought({ params }, res) {
        User.findByIdAndUpdate(
            { _id: params.userId },
            { $pull: { thoughts: params.thoughtId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id' })
                    return;
                }
                res.json(dbUserData);
            })
        return Thought.findByIdAndDelete(
            { _id: params.thoughtId }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })

                }
            })
            .catch(err => res.json(err));
    },

    // add a reaction
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id' })
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete a reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData =>
                res.json(dbThoughtData))
            .catch(err => res.json(err))
    }
};

module.exports = thoughtController;
