// Generated by CoffeeScript 1.9.0
var Konnector, async, fs, log;

async = require('async');

log = require('printit')({
  prefix: null,
  date: true
});

fs = require('fs');

Konnector = require('../models/konnector');

module.exports = function(done) {
  return Konnector.all(function(err, konnectors) {
    if (konnectors.length === 0) {
      return done();
    }
    log.info('Looking for entries to patch...');
    return async.eachSeries(konnectors, function(konnector, callback) {
      var fieldValues, model, name, parsedPasswords, type, unEncryptedFields, _ref;
      if (fs.existsSync("../konnectors/" + konnector.slug)) {
        model = require("../konnectors/" + konnector.slug);
        unEncryptedFields = [];
        _ref = model.fields;
        for (name in _ref) {
          type = _ref[name];
          if (type === 'password') {
            unEncryptedFields.push(name);
          }
        }
        fieldValues = konnector.fieldValues;
        if ((konnector.password == null) || konnector.password.length === 0) {
          konnector.password = "{}";
        }
        parsedPasswords = JSON.parse(konnector.password);
        if ((fieldValues != null) && unEncryptedFields.length !== Object.keys(parsedPasswords).length) {
          if (Object.keys(model.fields).length === Object.keys(fieldValues).length) {
            log.info("password of " + konnector.slug + " not complete");
            konnector.removeEncryptedFields(model.fields);
            log.info(konnector.slug + " | patching password...");
            return konnector.save(function(err) {
              if (err) {
                log.info(konnector.slug + " | " + err);
              } else {
                log.info(konnector.slug + " | patch succeeded");
              }
              return callback();
            });
          } else {
            log.debug("Missing fields in " + konnector.slug);
            return callback();
          }
        }
      } else {
        return callback();
      }
    }, function(err) {
      return done();
    });
  });
};
