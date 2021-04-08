/*
    Will attempt to feed the database with randomly generated data based on the given parameters below.
*/
const common = require('./common_functions');

const VendorList = {
    "Apple": {
        "name": "Apple Inc.",
        "id": 1415678,
        "address": "1 Infinite Loop Cupertino, CA 95014 United States"
    },
    "Adidas": {
        "name": "Adidas AG",
        "id": 1510417,
        "address": "adidas AG Adi-Dassler-Strasse 1 91074 Herzogenaurach Germany"
    },
    "Nike": {
        "name": "Nike, Inc.",
        "id": 1306752,
        "address": "One Bowerman Drive Beaverton, OR 97005 United States"
    },
    "Samsung": {
        "name": "Samsung",
        "id": 1696831,
        "address": "Samsung Electronics Building, 11, Seocho-daero 74-gil, Seocho District, Seoul, South Korea"
    },
    "Google": {
        "name": "Google Inc.",
        "id": 1674948,
        "address": "1600 Amphitheatre Parkway, Mountain View, California, United States"
    },
    "Amazon": {
        "name": "Amazon.com, Inc.",
        "id": 1053426,
        "address": "410 Terry Ave. North, Seattle, WA 98109 United States"
    },
    "Toyota": {
        "name": "Toyota Motor Corporation",
        "id": 1177586,
        "address": "1 Toyota-Cho, Toyota City, Aichi Prefecture 471-8571, Japan"
    },
    "3M": {
        "name": "3M Company",
        "id": 1135405,
        "address": "10 Ang Mo Kio Street 65 Techpoint #01-01 Singapore 569059"
    },
    "H&M": {
        "name": "Hennes & Mauritz AB",
        "id": 1744520,
        "address": "H & M Hennes & Mauritz AB Mäster Samuelsgatan 46A SE -106 38 Stockholm Sweden"
    }
}

