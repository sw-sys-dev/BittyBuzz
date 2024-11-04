var express = require('express');
var axios = require('axios');
var app = express();
var client_id = 'XccPlZfHS2F01aNZ5ZIL'; // 자신의 client_id로 수정
var client_secret = 'Ff3Y84RvGT'; // 자신의 client_secret로 수정

app.get('/search/news', async function (req, res) {
    var api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI(req.query.query);
    try {
        const response = await axios.get(api_url, {
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret
            }
        });

        // HTML 형식으로 변환
        let html = '<h1>뉴스 검색 결과</h1>';
        response.data.items.forEach(item => {
            html += `
                <div>
                    <h2><a href="${item.link}" target="_blank">${item.title.replace(/<b>/g, '').replace(/<\/b>/g, '')}</a></h2>
                    <p>${item.description.replace(/<b>/g, '').replace(/<\/b>/g, '')}</p>
                    <p>출처: ${item.originallink}</p>
                    <p>게시일: ${item.pubDate}</p>
                    <hr>
                </div>
            `;
        });

        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end(html);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).end();
        console.error('error = ', error);
    }
});

app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/search/news?query=삼성 app listening on port 3000!');
});
