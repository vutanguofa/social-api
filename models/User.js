//Module example
// const { Schema, model, Types } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

// const ReplySchema = new Schema(
//   {
//     // set custom id to avoid confusion with parent comment _id
//     replyId: {
//       type: Schema.Types.ObjectId,
//       default: () => new Types.ObjectId()
//     },
//     replyBody: {
//       type: String,
//       required: true
//     },
//     writtenBy: {
//       type: String,
//       required: true,
//       trim: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: createdAtVal => dateFormat(createdAtVal)
//     }
//   },
//   {
//     toJSON: {
//       getters: true
//     }
//   }
// );

// const CommentSchema = new Schema(
//   {
//     writtenBy: {
//       type: String,
//       required: true
//     },
//     commentBody: {
//       type: String,
//       required: true
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       get: createdAtVal => dateFormat(createdAtVal)
//     },
//     // use ReplySchema to validate data for a reply
//     replies: [ReplySchema]
//   },
//   {
//     toJSON: {
//       virtuals: true,
//       getters: true
//     },
//     id: false
//   }
// );

// CommentSchema.virtual('replyCount').get(function() {
//   return this.replies.length;
// });

// const Comment = model('Comment', CommentSchema);

// module.exports = Comment;

const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid email']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'

            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema)

module.exports = User;
