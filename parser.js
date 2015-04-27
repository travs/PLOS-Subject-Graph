#! /usr/bin/env node --harmony

//I'm using Node v0.12.2 because of harmony iteration

//USAGE: ./parser.js plosthes.XXXX-X.extract.xml

var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var filename = process.argv[process.argv.length - 1];
var thesaurusVersion = filename.split('.extract.xml')[0];

var Term = function(passedTerm, termIndex){
  this.name = passedTerm.T[0];
  if (passedTerm.NT){
    //there are child terms
    this.children = [];
    for (t of passedTerm.NT){
      var childTerm = new Term(termIndex[t], termIndex);
      this.children.push(childTerm);
    }
  }
}


fs.readFile(__dirname + '/' + filename, function(err, data) {
  parser.parseString(data, function(err, result) {
    //get object containing Term data
    var terms = result[thesaurusVersion]['TermInfo'];

    //keep all Terms in an Object to access *by key* later
    var termIndex = new Object();

    var topTerms = [];

    for (var i = 0; i < terms.length; i++) {
      //add each term to index, keyed by Term name
      termIndex[terms[i].T] = terms[i];

      //populate top-level array
      if(!terms[i].BT){
        //there is no broader term
        topTerms.push(terms[i]);
      }
    }

    //Create top-level object to hold broadest terms from thesaurus
    var thesaurus = {};
    thesaurus.name = "Thesaurus";
    thesaurus.children = [];

    for (term of topTerms){
      var aTerm = new Term(term, termIndex);
      thesaurus.children.push(aTerm);
    }


    //make a minified version
    var outFile = 'thesaurus_latest' + '.min.json';
    fs.writeFile(outFile, JSON.stringify(thesaurus));

    //make a pretty version
    var outFile = thesaurusVersion + '.json';
    fs.writeFile(outFile, JSON.stringify(thesaurus, null, 2));

  });
});
