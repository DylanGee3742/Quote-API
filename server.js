const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});

app.get('/api/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote});
})

app.get('/api/quotes', (req, res, next) => {
    //Assign person variable to value of req.query
    const person = req.query.person
    if (person) {
        //If the person exists, filter quotes and if key.person is equal to req.query.person return
        const quote = quotes.filter((quote) => quote.person === person)
        res.send({quotes: quote})
    } else {
        res.send({quotes: quotes})
    }
})

app.post('/api/quotes', (req, res, next) => {
    const newBody = req.query.quote;
    const newPerson = req.query.person;
    //Check request query as a quote and author
    if (newBody && newPerson) {
        //Set newQuote variable to request query object ({quote: "", person: ""})
        const newQuote = req.query;
        //Push new quote to array and send response
        quotes.push(newQuote);
        res.send({quote: newQuote})
    } else {
        res.status(400).send()
    }
});
