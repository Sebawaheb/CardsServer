const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

async function generateTestUsers() {
    return [
        {
            "_id": new mongoose.Types.ObjectId("656b66259f04078bb9a2813a"),
            "name": {
                "first": "Seba",
                "middle": "Ehab",
                "last": "Waheb"
            },
            "phone": "0532487596",
            "email": "sebawaheb@gmail.com",
            "password": await bcrypt.hash("SpaceX2024!", 10),
            "image": {
                "url": "https://api.dicebear.com/7.x/adventurer/svg?seed=Seba",
                "alt": "Digital avatar of Seba"
            },
            "address": {
                "state": "Israel",
                "country": "Israel",
                "city": "Tel Aviv",
                "street": "Rocket Road",
                "houseNumber": 1,
                "zip": 90210
            },
            "isAdmin": true,
            "isBusiness": true
        },

        {
            "_id": new mongoose.Types.ObjectId("656b66259f04078bb9a2813b"),
            "name": {
                "first": "Oprah",
                "middle": "Gail",
                "last": "Winfrey"
            },
            "phone": "0529876543",
            "email": "oprah@oprah.com",
            "password": await bcrypt.hash("TalkShowQueen1", 10),
            "image": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/1/19/Oprah_Winfrey_at_2011_TCA.jpg",
                "alt": "Oprah Winfrey"
            },
            "address": {
                "state": "Illinois",
                "country": "United States",
                "city": "Chicago",
                "street": "Harpo Studios",
                "houseNumber": 105,
                "zip": 60607
            },
            "isAdmin": false,
            "isBusiness": true
        },
        {
            "_id": new mongoose.Types.ObjectId("656b66259f04078bb9a2813c"),
            "name": {
                "first": "Pnina",
                "middle": "",
                "last": "Rosenblum"
            },
            "phone": "0548123456",
            "email": "pnina@rosenblum.co.il",
            "password": await bcrypt.hash("Pnina!789", 10),
            "image": {
                "url": "https://upload.wikimedia.org/wikipedia/commons/9/94/Pnina_Rosenblum.jpg",
                "alt": "Pnina Rosenblum"
            },
            "address": {
                "state": "",
                "country": "Israel",
                "city": "Tel Aviv",
                "street": "Gronneman",
                "houseNumber": 15,
                "zip": 6997222
            },
            "isAdmin": false,
            "isBusiness": true
        }
    ];
}

const generateTestCards = [
    {
        "title": "SpaceX",
        "subtitle": "Space Exploration Technologies Corp.",
        "description": "American spacecraft manufacturer and launch service provider.",
        "phone": "0800123456",
        "email": "info@spacex.com",
        "web": "https://www.spacex.com",
        "image": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/d/de/Spacex-logo.png",
            "alt": "SpaceX Logo"
        },
        "address": {
            "state": "California",
            "country": "United States",
            "city": "Hawthorne",
            "street": "Rocket Road",
            "houseNumber": 1,
            "zip": 90250
        },
        "bizNumber": 4000000,
        "likes": [
            "656b66259f04078bb9a2813a",
            "656b66259f04078bb9a2813b"
        ],
        "user_id": "656b66259f04078bb9a2813a",
        "createdAt": "2024-02-17T10:00:00.000Z",
        "__v": 0
    },
    {
        "title": "The Oprah Winfrey Network",
        "subtitle": "Television Network",
        "description": "Cable channel owned by Oprah Winfrey, offering talk shows and reality TV.",
        "phone": "0524445555",
        "email": "contact@own.com",
        "web": "https://www.oprah.com/own",
        "image": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/5/50/OWN_logo.png",
            "alt": "OWN Logo"
        },
        "address": {
            "state": "California",
            "country": "United States",
            "city": "Los Angeles",
            "street": "Hollywood Blvd",
            "houseNumber": 500,
            "zip": 90028
        },
        "bizNumber": 5000000,
        "likes": ["656b66259f04078bb9a2813a"],
        "user_id": "656b66259f04078bb9a2813b",
        "createdAt": "2024-02-17T10:00:00.000Z",
        "__v": 0
    }
];

module.exports = { generateTestUsers, generateTestCards };
