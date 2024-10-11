import mongoose from 'mongoose';
import Person from './Person.js'

let connectionURI = 'mongodb://localhost:27017'

await mongoose.connect(connectionURI);

if (mongoose.connection.readyState == 1) {
    console.log(`Database live on ${connectionURI}`)
};

let client = {
    Person
}

export default client;