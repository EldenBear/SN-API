const { User, Thought } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: 'Thought created, but found no user with that ID',
        })
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
        const thought = await Thought.updateOne({_id: req.params.thoughtId}, req.body);

        if (!thought) {
            return res.status(404).json({ message: 'No thought updated'});
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: 'Thought deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body} },
            { new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }
          
        res.json({ message: 'Reaction added!'})
    } catch (err) {
        res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {reactionId: req.body.reactionId}} },
        );
        if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }

        res.json({ message: 'Thought deleted'})
    } catch (err) {
        res.status(500).json(err);
    }
  },
};
