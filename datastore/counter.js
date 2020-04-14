const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  //fs.readFile is being invoked with 2 arguments: the file we want to read and an err first function
  //the function being passed into readFile takes 2 args: err and the wanted data from the file we are reading
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  // gets the zeropadded number
  counterString = zeroPaddedNumber(count);
  // fs writefile ...first arg = file we write to---  arg2 = the data we write--- arg3 = callback
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // readCounter takes in a callback
  // callback ERROR FIRST, then next parameter is num (counter)
  readCounter((err, num) => {
    // increment num because we are writing another file
    num++;
    // takes in the num (counter) and a callback
    writeCounter(num, (err, counterString) =>{
      callback(err, counterString);
    });
  });

};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
