
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+..+/, 'Must match an email address!'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// userSchema.virtual('friendCount').get(function () {
//   return this.friends.length;
// });

// userSchema.virtual('thoughtCount').get(function () {
//   return this.thoughts.length;
// });

// userSchema.virtual('reactionCount').get(function () {
//   return this.reactions.length;
// });

// userSchema.virtual('findAll').get(function () {
//   return this.find();
// });

const User = model('User', userSchema);

module.exports = User;
