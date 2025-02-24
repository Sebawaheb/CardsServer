const mongoose = require("mongoose");
const { DEFAULT_VALIDATION } = require("../../../helpers/mongodb/mongooseValidators");
const { PHONE, EMAIL, URL } = require("../../../helpers/mongodb/mongooseValidators");
const { image } = require("../../../helpers/mongodb/image");
const { Address } = require("../../../helpers/mongodb/Address");

const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024
    },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: image,
    address: Address,
    bizNumber: {
        type: Number,
        required: true,
        min: 1_000_000,
        max: 9_999_999
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Card = mongoose.model("card", cardSchema);

module.exports = Card;