'use strict'

const search = require('./search');

// just a proxy to expose many controllers in one object
// so that it would be easier to use in our orchestrator
module.exports = {
   search
};