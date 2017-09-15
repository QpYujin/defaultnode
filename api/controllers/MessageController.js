/**
 * Create MessageController
 */

let MessageController = module.exports = {};

// Route: get /messages
MessageController.findAll = (req, res) => {
  let query = {};
  if (req.user.role == 'USER') {
    query.createdById = req.user.id;
  } else if (req.user.role == 'ASTROLOGER') {
    query.astrologerId = req.user.id;
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  MessageService.findMessages(query, +req.query.limit, +req.query.offset, (err, messages) => {
    if (err) {
      server.log.error('Error getting all message', err);
      res.status(500).json(err);
    }

    res.send(messages);
  });
};

// Route: get /messages/:id
MessageController.findOne = (req, res) => {

  UtilService.wrapCb(Message.findById(req.params.id), (err, messages) => {
    if (err) {
      server.log.error('Error getting all message', err);
      res.status(500).json(err);
    }

    res.send(messages);
  });
};

// Route: /users/:userId/messages
MessageController.findByUser = (req, res) => {

  MessageService.findMessages({createdById: req.params.userId}, +req.query.limit, +req.query.offset, (err, messages) => {
    if (err) {
      server.log.error('Error getting all message', err);
      res.status(500).json(err);
    }

    res.send(messages);
  });
};

// Route: /messages
MessageController.create = (req, res) => {
  UtilService.wrapCb(Message.create(req.body), (err, message) => {

    if (err) {
      server.log.error('Error create message', err);
      res.status(500).json(err);
    }

    res.send(message);
  });
};

// Route: PUT /messages/:id
MessageController.update = (req, res) => {

  MessageService.updateMessage(req.params.id, req.body, (err, message) => {

    if (err) {
      server.log.error('Error create message', err);
      res.status(500).json(err);
    }

    res.send(message);
  });
};
