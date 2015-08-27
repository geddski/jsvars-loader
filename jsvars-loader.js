/**
 * webpack loader that converts a JS file import into variables that postcss-simple-vars can understand.
 */
var path = require('path');
var fs = require('fs');
var flatten = require('flat');

module.exports = function(source) {
  var regexp = new RegExp('(jsvars\\(([^)]*)\\))');
  var match = source.match(regexp);
  if (match && match[2]){
    // has to mark as uncacheable if using jsvars so that the new file is fetched
    this.cacheable(false);
    var file = path.resolve(match[2]);
    this.addDependency(file);
    var contents = this.exec(fs.readFileSync(file).toString());
    var res = flatten(contents, {delimiter: '-'});
    
    var final = Object.keys(res).map(function(key){
      return '$' + key + ': ' + res[key] + ';';
    })
    .join('\n');
    source = source.replace(match[1], final);
  }
  else{
    this.cacheable();
  }
  
  return source;
};