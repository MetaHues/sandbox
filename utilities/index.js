'use strict'

const yelp = require('./yelp');

// just a proxy to expose many controllers in one object
// so that it would be easier to use in our orchestrator
module.exports = {
   yelp
};