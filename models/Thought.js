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
const reactionSchema = require('./Reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },
        createAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
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

ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;