import mongoose from "mongoose";

const university = new mongoose.Schema({
    country: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    location: {
        type: String,
        coordinates: [{ type: Number }]
    },
    students: [
        {
            year: {
                type: Number,
            },

            number: {

                type: Number
            }

        }
    ]
})


export default mongoose.model("university",university)