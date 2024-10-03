require('dotenv').config();
const {OPENAI_API_KEY} = process.env;
const openai = require('openai')

const openIa = new openai({
    apiKey: OPENAI_API_KEY
});



module.exports = openIa;
 
