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

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendSatus(400);
            });
    },

    //get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
            .populate({
                path: 'thoughts friends',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findByIdAndDelete({ _id: params.userId })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ mesage: 'No user found wit this id! ' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { friends: params.friendId },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with that id' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    }

};

module.exports = userController;
