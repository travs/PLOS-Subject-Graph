#! /usr/bin/env node

//USAGE: ./parser.js plosthes.XXXX-X.extract.xml

var fs = require('fs'),
    xml2js = require('xml2js');

var filename = process.argv[process.argv.length - 1];

var parser = new xml2js.Parser();

fs.readFile(__dirname + '/' + filename, function(err, data) {
  parser.parseString(data, function(err, result) {
    var terms = result['plosthes.2014-5']['TermInfo'];
    console.log(terms);
    console.log('Done');
  });
});
