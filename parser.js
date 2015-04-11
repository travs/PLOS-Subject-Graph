#! /usr/bin/env node

//USAGE: ./parser.js plosthes.XXXX-X.extract.xml

var fs = require('fs'),
    xml2js = require('xml2js');

var filename = process.argv[process.argv.length - 1];

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/' + filename, function(err, data) {
  parser.parseString(data, function(err, result) {
    //get object containing Term data
    var terms = result['plosthes.2014-5']['TermInfo'];

    //keep all Terms in an Object to access later
    var keyedPlos = new Object();

    for (var i = 0; i < terms.length; i++) {
      //add each term to keyedPlos, keyed by Term name
      keyedPlos[terms[i].T] = terms[i];
    }

    for (var i = 0; i < terms.length; i++) {
      //
    }

    console.log(keyedPlos);
    console.log('Done');
  });
});
