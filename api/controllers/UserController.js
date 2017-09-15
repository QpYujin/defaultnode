/**
 * UserController
 */

let UserController = module.exports = {};

UserController.profile = (req, res) => {
  res.render('userhome', {user: req.user});
};

/**
 * Get list of astrologers
 * @route get /users/astrologers
 */
UserController.getAstrologers = (req, res) => {
  User.findAll({where: {role: 'ASTROLOGER'}}).then((users) => {
    res.json(users);
  }).catch((err) => {
    res.status(500).json(err);
  });
};

/**
 * Update user
 * @route 'put /users/:id'
 */
UserController.updateUser = (req, res) => {
  User.findById(req.params.id).then((user) => {
    _.forOwn(req.body, (value, key) => {
      user.setDataValue(key, value);
    });
    return user.save();
  }).then(user => {
    res.json(user);
  }).catch(err => {
    server.log.error('Error updating user', err);
    res.status(500).json(err);
  });
};

/**
 * Change user password
 * @route 'put /users/:id/change-password'
 * @req.body {password: 'old_password', newPassword: 'new_password'}
 */
UserController.changePassword = (req, res) => {
  User.findById(req.params.id).then((user) => {
    if (!user) {
      throw {status: 400, message: 'User not found'};
    }
    return user.getCredentials({where: {type: 'local'}});
  }).then((credentials) => {
    let validCred = _(credentials).values().find((cred) => {
      return cred.validatePassword(req.body.password);
    });

    if (!validCred) {
      throw { status: '400', message: 'You old password is invalid, please check your typing'};
    }

    validCred.setDataValue('password', req.body.newPassword);
    return validCred.save();
  }).then(() => {
    res.json({status: 200, message: 'Password changed successfuly'})
  }).catch(err => {
    server.log.error('Error changing user password', err);
    res.status(500).json(err);
  });
};

UserController.getProfile = (req, res) => {
  UtilService.wrapCb(User.findById(req.params.userId), (err, user) => {
    if (err) {
      server.log.error('Error getting user', err);
      res.status(500).json(err);
    }
    res.send(user);
  });
}
