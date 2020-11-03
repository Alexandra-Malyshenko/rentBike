const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path: './config.env'});
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .then(() => {console.log('DB connection successful!')});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listen on port ${port}...`);
});