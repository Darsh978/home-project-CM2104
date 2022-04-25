const express = require('express')
const newsRoute = express.Router()
const axios = require('axios')

newsRoute.get('/News', async(req, res) => {
    try {
        const url ='https://newsapi.org/v2/everything?'
        + 'q=Electric Vehicle&'
        + 'country=UK&'
        + 'apiKey={7211b46e8b9246259c4230953ac18170}';

        const APINews = await axios.get(url)
        res.render('News', {articles:APINews.data.articles})
    } catch (error) {
        if(error.response){
            console.log(error)
        }

    }
})
module.exports = newsRoute 