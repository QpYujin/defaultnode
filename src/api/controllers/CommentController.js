/**
 * Create CommentController
 */

let CommentController = module.exports = {};

// Route: get /messages/:messageId/comments
CommentController.findAll = (req, res) => {

  CommentService.findAll({messageId: req.params.messageId}, +req.query.limit, +req.query.offset, (err, comments) => {
    if (err) {
      server.log.error('Error getting all message', err);
      res.status(500).json(err);
    }

    res.send(comments);
  });
};

// Route: post /messages/:messageId/comments
CommentController.create = (req, res) => {

  CommentService.create(+req.params.messageId, req.body, (err, createdComment) => {

    if (err) {
      server.log.error('Error create message', err);
      res.status(500).json(err);
    }

    res.send(createdComment);
  });
};
