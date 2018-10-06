function news_conn() {
    var newsAPI_config = require('./newsAPI_config');
    const NewsAPI = require('newsapi');
    const newsapi = new NewsAPI(newsAPI_config.newsAPI_key);
    console.log('Started NewsAPI Bot');
    return newsapi
}

function news_retrieve_topHeadlines(newsapi) {
    // To query /v2/top-headlines
    // All options passed to topHeadlines are optional, but you need to include at least one of them
    newsapi.v2.topHeadlines({
      // sources: 'bbc-news,the-verge',
      q: 'elon musk',
      // category: 'business',
      language: 'en',
      // country: 'us'
    }).then(response => {
      articles = response.articles
      for (var i = 0; i < articles.length; i++) {
        console.log(articles[i].source.name);
        console.log(articles[i].title);
      }
      /* response has the following format: {status: "ok", articles: [...]}*/
    });
    console.log('Retrieved NewsAPI Top Headlines');
    return
}

function news_retrieve_everything(newsapi) {
    // To query /v2/everything
    // You must include at least one q, source, or domain
    newsapi.v2.everything({
      q: 'bitcoin',
      sources: 'bbc-news,the-verge',
      domains: 'bbc.co.uk, techcrunch.com',
      from: '2017-12-01',
      to: '2017-12-12',
      language: 'en',
      sortBy: 'relevancy',
      page: 2
    }).then(response => {
      console.log(response);
      /* response has the following format: {status: "ok",articles: [...]}*/
    });
    console.log('Retrieved NewsAPI Everything');
    return
}

function news_retrieve_sources(newsapi) {
    // To query sources
    // All options are optional
    newsapi.v2.sources({
      category: 'technology',
      language: 'en',
      country: 'us'
    }).then(response => {
      console.log(response);
      /* response has the following format: {status: "ok",sources: [...]}*/
    });
    console.log('Retrieved NewsAPI Sources');
    return
}

module.exports = {'news_conn':news_conn,'news_retrieve_topHeadlines':news_retrieve_topHeadlines,'news_retrieve_everything':news_retrieve_everything,'news_retrieve_sources':news_retrieve_sources}