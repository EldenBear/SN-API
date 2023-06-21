const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    thoughts: [{
       type: Schema.Types.ObjectId,
       ref: 'thought',     
    },
  ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
