const colors = require('colors');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('../storage/config.json');

// Check schema folder and user.js
async function openDatabase() {

    mongoose.set('strictQuery', false);

    const connection = await mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true });

    if (connection) {
        console.log(`Database connected`.green);
    } else {
        console.log(`Database connection failed`.red);
        process.exit(0);
    }

}

module.exports = { openDatabase };