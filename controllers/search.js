'use strict';

const yelp = require('yelp-fusion');

// function using arrow notation
// function definition is stored in a variable,
// and we can execute it later like doSearch()
// or copy it somewhere else const copy = doSearch
// cause all we are doing is manipulating references to memory location where function definition is stored
const doSearch = (token) => {
   // define search request for the yelp SDK API
   const searchRequest = {
      term:'Four Barrel Coffee',
      location: 'san francisco, ca'
   };

   const client = yelp.client(token);

   // returns a promise
   // which will resolve to the value we are returning from .then
   return client.search(searchRequest).then(response => {
      return response.jsonBody;
   });
   // we don't have catch here so the error we will have to catch where we call this wrapping method
};

// expose the logic
module.exports = {
   doSearch
};