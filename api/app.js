var express = require('express');
var axios = require('axios');
var app = express();
var client_id = 'XccPlZfHS2F01aNZ5ZIL';
var client_secret = 'Ff3Y84RvGT';

app.get('/search/news', async function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI(req.query.query);
    try {
        const response = await axios.get(api_url, {
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret
            }
        });

        
        const newsItems = response.data.items.map(item => ({
            title: item.title.replace(/<b>/g, '').replace(/<\/b>/g, ''),
            link: item.link,
            description: item.description.replace(/<b>/g, '').replace(/<\/b>/g, ''),
            originallink: item.originallink,
            pubDate: item.pubDate
        }));

        res.status(200).json({
            message: "뉴스 검색 결과",
            items: newsItems
        });
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            message: "뉴스 검색 중 오류가 발생했습니다.",
            error: error.toString()
        });
        console.error('error = ', error);
    }
});

app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/search/news?query=삼성 app listening on port 3000!');
});
