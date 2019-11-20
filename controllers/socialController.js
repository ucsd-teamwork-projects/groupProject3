const socialDb = require("../models/Social");
const commentDb = require("../models/Comment");

const pusher = require("../pusher");

module.exports = {
  findAll: function(req, res) {
    const fields = req.body.fields;

    socialDb
      .findAll()
      .populate(fields)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findOne: function(req, res) {
    const fields = req.body.fields;

    socialDb
      .findById(req.params.id)
      .populate(fields)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    socialDb
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));

  },
  update: function(req, res) {
    socialDb
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  pushGoing: function(req, res) {
    socialDb
            .findById({ _id: req.params.id }, 
            {
                $push: {
                    going: req.body.email
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
  },
  pullGoing: function(req, res) {
    socialDb
            .findById({ _id: req.params.id }, 
            {
                $pull: {
                    going: req.body.email
                }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
  },
  pushComment: function(req, res) {
    // create Comment
    commentDb
    .insertOne(req.body)
    .then(newComment => {
      // Trigger all listening components to retrieve new comment
      pusher.trigger(`comments`, `social-${socialId}`, newComment);

      // Then push new ID into Social comments
      socialDb
      .findById({ _id: req.params.id }, 
        {
            $push: {
                comments: newComment._id
            }
        })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
      
    });

  },
  
  remove: function(req, res) {
    socialDb
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};