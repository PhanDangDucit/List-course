const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/finances')
            console.log('connect ok!')
    }
    catch (err) {
        console.log('Connect faid');
    }
}

module.exports = { connect }