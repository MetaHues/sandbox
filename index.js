'use strict';

/**
 * I understand:
 - you have a program that runs once, like a script
 - the program performs multiple actions and should not exit until all actions are completed
 - the actions may be dependent on a global variable, such as access token
 - the dependencies must be acquired and set before any other actions start
 - dependencies should be stored securely in memory - no persisted
 - actions may be synchronous or asynchronous
 */

const search = require('./controllers').search;

// even listener that fires whenever the event with that name is received
// can be placed anywhere in the code :)
process.on('exit', (code) => {
   console.log(`About to exit with code: ${code}`);
});

// this is your orchestrator - here we can set the order of things:
   // first get the token,
   // then perform a search
   // then output results
   // and the thing is - we got to use promises everywhere

function performSomeLogicThatDependsOnToken(token) {
   // it is usually good idea to return your promises
   // even if they are not used outside
   // or use "new Promise((resolve,reject)=>{resolve(value);});" per 'bluebird' promise middleware
   return search.doSearch(token).then(result=>{
      // now the result we get is pre-processed
      console.log(result); // TODO: replace console log with proper logging libraries like winston or bunyan
   });
}

//now we can run our function
console.log("app started");
const yelp = require('./utilities').yelp;
let _token;
// can't live without the awesome promise chains. it s a good replacement for callback hell
// but it doesn't solve the actual problem.
// async/await will probably never come to life in javascript so might as well switch to a real language
// like c# :)
return Promise.resolve().then(()=>{
   return yelp.getToken()
}).then(token=>{
   // anything that wants to use token has to be withing this method scope :/
   // or we can save it as a global variable,
   // but we still have to chain any methods that depend on it
   // to control the async execution flow
   _token = token;
   console.log(`token is ${token}`);
   return _token;
}).catch(err=>{
   console.error(`failed to get the token, so let's cry about it`);
   console.error(err);
   // but it's all good, we can recover with some other token maybe?
   return "123";
}).then(token=>{
   console.log(`gonna run the main now`);
   return performSomeLogicThatDependsOnToken(token);
}).catch(err=>{
   console.error(`aaah fuck, guess we really do need to validate the inputs :/`);
   console.error(err);
   return err;
}).then(()=>{
   // don't care what the output of the previous step was as long as it resolved successfully
   console.log("app is still running until all async functions finished as long as your promises are returned :)");
}).catch(err=>{
   // one error catcher to rule them all
   console.error(err);
});