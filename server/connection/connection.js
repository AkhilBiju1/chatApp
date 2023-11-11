const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
local = "mongodb://127.0.0.1:27017/"
const atls = 'mongodb+srv://mern-fasionova-user:myfirstproject.com@cluster0.mdrwgoj.mongodb.net/mern-fasionova-db?retryWrites=true&w=majority'
module.exports = {
    connect: () => {
        const url = local
        database = "Chatapp"

        mongoose.connect(url + database, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("connected")).catch((err) => { console.log(err); })
    }
}

