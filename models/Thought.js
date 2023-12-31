const { Schema, model, Types } = require("mongoose");
// Schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
           type: Schema.Types.ObjectId,
           default: new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                return date.toISOString();
            },
        },
    }
)
// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => {
        return date.toISOString();
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {

    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



const Thought = model('thought', thoughtSchema);

module.exports = Thought;