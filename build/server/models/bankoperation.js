// Generated by CoffeeScript 1.9.0
var BankOperation, File, americano;

americano = require('americano-cozy');

File = require('../models/file');

module.exports = BankOperation = americano.getModel('bankoperation', {
  bankAccount: String,
  title: String,
  date: Date,
  amount: Number,
  raw: String,
  dateImport: Date,
  categoryId: String,
  binary: function(x) {
    return x;
  }
});

BankOperation.all = function(params, callback) {
  return BankOperation.request("byDate", params, callback);
};

BankOperation.prototype.setBinaryFromFile = function(fileId, callback) {
  return File.find(fileId, (function(_this) {
    return function(err, file) {
      var attributes, _ref;
      if (err) {
        return callback(err);
      }
      if ((file != null ? (_ref = file.binary) != null ? _ref.file : void 0 : void 0) != null) {
        attributes = {
          binary: {
            file: file.binary.file
          }
        };
        return _this.updateAttributes(attributes, function(err) {
          if (err) {
            return callback(err);
          }
          _this.binary = {
            file: file.binary.file
          };
          return callback();
        });
      } else {
        return callback(new Error("No binary for this file " + fileId));
      }
    };
  })(this));
};
