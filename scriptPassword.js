
var crypto = require('crypto');


module.exports.hash = function (pass) {
  var h = crypto.createHash('sha512');
  var salt = crypto.randomBytes(256);

  h.update(pass);

  h.update(salt);

  var hash = h.digest();

  return Buffer.concat([hash, salt]);

};


module.exports.testHash = function (pass, crypt) {
  
  if (crypt.length !== 320) {
    return false;
  }

  var hash = crypt.slice(0, 64);
  var salt = crypt.slice(64);


  var h = crypto.createHash('sha512');

  h.update(pass);

  h.update(salt);

  return Buffer.compare(hash, h.digest()) === 0;
};

module.exports.randomGenerate = function () {

  var randomBuf = crypto.randomBytes(16)
  var timetempsBuf = new Buffer(8);
  timetempsBuf.writeUIntLE(Date.now(), 0, 8);
  var result = Buffer.concat([randomBuf, timetempsBuf]).toString('base64');

  return result;
};