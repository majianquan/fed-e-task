const fp = require('lodash/fp')
let _underscore = fp.replace(/\W+/g,'_')

let snitizeNames = fp.flowRight(_underscore, fp.join(' '), fp.map(fp.lowerCase),fp.split(' '),fp.first);


console.log(snitizeNames(['Hello World']));
