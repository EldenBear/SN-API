const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user
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
  // create a new user
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.username },
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
  // Delete a user and associated apps
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
};
