const Message = require("../models/Message");

exports.addMessage = (req, res, next) => {
  console.log("-=-= ", req.body);

  Message.create({
    content: req.body.message,
    receiver: req.body.otherProfile,
    sender: req.user._id
  })
    .then(message => {
      console.log(message);
      res.json(message);
    })
    .catch(err => console.log(err));
};

exports.getAllMessages = (req, res, next) => {
  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
    } else {
      res.json(messages);
    }
  });
};
