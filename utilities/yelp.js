'use strict'

// import the libraries and SDKs
const yelp = require('yelp-fusion');
const clientId = "asdgasdg";
const clientSecret = "asfsdf";

// exposes object with token only if method succeeded
// but the method itself returns a promise which we are not doing anything with it
module.exports = {
   getToken: ()=>{
      console.log("getting token from yelp");
      return yelp.accessToken(clientId, clientSecret).then(response => {
         console.log("got something, so let me return it as resolved promise object");
         return response.jsonBody.access_token;
      });
   }
};