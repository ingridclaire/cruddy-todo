const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      callback(err);
      console.log('error occurred when getNextUniqueID was invoked', err);
    } else {
      var pathName = path.join(exports.dataDir, `${id}.txt`);
      fs.writeFile(pathName, text, (err) => {
        if (err) {
          throw err;
        }
        //we commented out the line below, and our todos were still added to data file. What is this callback doing?
        callback(null, { id, text });

      });
    }
  });
};

exports.readAll = (callback) => {
  let path = exports.dataDir;
  fs.readdir(path, (err, items) => {
    if (err) {
      console.error('error when defining readAll and invoking readdir', err);
    } else {

      var data = _.map(items, (text, id) => {
        // format this
        return { id, text };
      });

      callback(null, data);
    }

  });

};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
