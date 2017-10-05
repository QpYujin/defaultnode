/**
 * UtilService
 */

let UtilService = module.exports = {};

UtilService.wrapCb = (promize, cb) => {
  if (!cb) {
    return promize;
  }

  promize.then(value => {
    cb(null, value);
  }).catch(err => {
    cb(err);
  })
};

UtilService.promisify = (asyncAction, ...args) => {
  let promise = new Promise((resolve, reject) => {
    asyncAction(...args, (err, results) => {
      server.log.debug('Sent mail');
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
  return promise;
};
