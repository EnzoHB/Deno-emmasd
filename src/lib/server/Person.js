import mongoose from "mongoose"

const PersonSchema = new mongoose.Schema({
    id: { 
        type: String,
        unique: true
    },

    name: { 
        type: String, 
        required: [true, "Person must have a name"],
        index: true,
    }, 

    age: { 
        type: Number,
        min: [0, "It would be funny to have a person with less than 0 years"],
    },

    birthday: { 
        type: Date 
    }, 

    skin: { type: String },

    hairColor: { 
        type: String,
        enum: ["Preto", "Loiro", "Branco", "Marrom", "Pintado"]
    },

    hairType: {
        type: String, 
        enum: [ "Liso", "Cacheado", "Crespo" ]
    }, 

    eyeColor: { 
        type: String, 
        enum: [ "#ADD8E6", "#008000", "#8E7618", "#FFBF00", "#BEBEBE"] ,  
    },

    height: { 
        type: Number,
        min: 0 
    },

    firstDegreeFriends: [
    { type: mongoose.Types.ObjectId }
    ],
    
    relationShips: [
        { 
            person: { type: mongoose.Types.ObjectId, required: [true, "There's no way to date one self"] }, 
            duration: { type: Number, min: 0 }, 
            ongoing: { type: Boolean }, 
        }
    ],

    email: { 
        type: String,
        validate: {
            validator: function validateEmail(/** @type {string} */ email) {

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
                return emailRegex.test(email);
            },

            message: (/** @type {{ value: any; }} */ props) => `${props.value} doesn't seem to be a valid phone number`
        } 
    }, 

    phoneNumber: { 
        type: String,
        validate: {
            validator: function(/** @type {string} */ phoneNumber) {
  
                const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
            
                return phoneRegex.test(phoneNumber);
            },
            message: (/** @type {{ value: any; }} */ props) => `${props.value} doesn't seem to be a valid phone number`
        } 
    }, 

    description: { 
        type: String,
        default: "",
        index: true,
    },

    score: { 
        type: Number,
        default: 0,
        min: [-1, "The score must be greater than 0"],
        max: [1, "The score must be less than 1"]
    }, 

    experiments: [ { 
        createdAt: { type: Date, default: Date.now() }, 
        updatedAt: { type: Date, default: Date.now() },
        behavior: { type: String },
        response: { type: String },
        place: { type: String },  
    }],

    createdAt: { type: Date, default: Date.now() }, 
    updatedAt: { type: Date, default: Date.now() }
})


// We have to make this check, because this line of code
// actually runs two times. As we cannot instantiate a model twice,
// we end up taking from the already existing models.Person namespace
// https://github.com/typegoose/typegoose/issues/864 
let Person = mongoose.models.Person || mongoose.model('Person', PersonSchema)

export default Person