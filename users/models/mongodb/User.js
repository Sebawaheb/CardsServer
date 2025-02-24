const { mongoose } = require("mongoose");
const { PHONE, EMAIL } = require("../../../helpers/mongodb/mongooseValidators");
const { image } = require("../../../helpers/mongodb/image");
const { Address } = require("../../../helpers/mongodb/Address");
const { name } = require("../../../helpers/mongodb/name");

const userSchema = new mongoose.Schema({
    name: name,
    phone: PHONE,
    email: EMAIL,
    password: {
        type: String,
        required: true,
        trim: true
    },
    image: image,
    Address: Address,
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBusiness: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;