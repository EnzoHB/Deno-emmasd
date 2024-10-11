/**
 * In order to instantiate the database, we set it up in the sr/lib/server 
 * (It doesn't need to be "server") and create a hooks.server.js file. The
 * hooks, which are middleware functions, will be run once when the server starts 
 * and whenever it recieves a new request. That said, we import the database client,
 * that, in this case, is our wrapper for all schemas, and populate the event.locals,
 * a object built for this exact purpose passed on to us as an argument, with our custom data. 
 * 
 * To handle everything, we will use the handle hook, a function that passes an object
 * containg a event object and another function called resolve, which renders the
 * route and sends back a Response to the client
 * */

import client from '$lib/server/db.js'
import { building } from '$app/environment'; // <---- here


export async function handle({event, resolve}) {

    // This runs once when the server is building
    // What this does essentially is waiting for the 
    // Human svelte files to be built. If not so, 
    // the file system manages to do it while svelte
    // is runnning and the a annoying erros message
    // pops up 

    // Also, any code that has to initialize before building time
    // must be run this way
    // if (!building) {
    //     await buildHuman()
    // } 

    // This will be available in routes such as 
    // +server.js and load functions

    event.locals = {
        db: client
    }

    // We have to resolve the event, that is, 
    // to let svelte handle all the route boilerplate
    // for us
    let response = resolve(event)

    return response;
};
