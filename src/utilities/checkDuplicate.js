import errorMessages from './errorMessages';

/**
 * Checks if index already exists in database and performs callback if it does
 *
 * @param {Request} req Express.js request object
 * @param {Response} res Express.js response object
 * @param {Number} key Index introduced by the user
 * @param {Mongoose} object Mongoose database to perform the search
 * @param {Function} callback What to do when the item is not duplicated
 */

export function checkDuplicateByIndex(req, res, key, object, callback) {
  object.find({ index: key }, (err, item) => {
    if (err) return errorMessages.databaseError(res, err);
    if (item.length !== 0 || !item) return errorMessages.duplicateKey(res, key);
    return callback(req, res);
  });
}

/**
 * Checks if id already exists in database and performs callback if it does
 *
 * @param {Request} req Express.js request object
 * @param {Response} res Express.js response object
 * @param {Number} id Id introduced by the user
 * @param {Mongoose Schema} object Mongoose database to perform the search
 * @param {Function} callback What to do when the item is not duplicated
 */

export function checkDuplicateById(req, res, id, object, callback) {
  object.find({ id }, (err, item) => {
    if (err) return errorMessages.databaseError(res, err);
    if (item.length !== 0 || !item) return errorMessages.duplicateKey(res, id);
    return callback(req, res);
  });
}
