const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const app = express();

const client_id = 'XccPlZfHS2F01aNZ5ZIL'; // 자신의 client_id로 수정
const client_secret = 'Ff3Y84RvGT'; // 자신의 client_secret로 수정

// CORS 설정
app.use(cors());

// 이미지 URL을 가져오는 함수
async function fetchImageURL(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const imageUrl = $('meta[property="og:image"]').attr('content');
    return imageUrl || null;
  } catch (error) {
    console.error("이미지 URL 가져오기 실패:", error);
    return null;
  }
}

// 본문을 가져오는 함수
async function fetchContent(url) {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const content = $('#dic_area').text().trim();
    return content || '본문을 불러올 수 없습니다.';
  } catch (error) {
    console.error("본문 가져오기 실패:", error);
    return '본문을 불러올 수 없습니다.';
  }
}

// 뉴스 검색 API 엔드포인트
app.get('/search/news', async function (req, res) {
  const query = req.query.query || '삼성';
  const api_url = `https://openapi.naver.com/v1/search/news?query=${encodeURI(query)}`;

  try {
    const response = await axios.get(api_url, {
      headers: {
        'X-Naver-Client-Id': client_id,
        'X-Naver-Client-Secret': client_secret
      }
    });

    const newsItems = [];
    for (const item of response.data.items) {
      const imageUrl = await fetchImageURL(item.originallink);
      const content = await fetchContent(item.link);

      // &quot; 등의 특수 HTML 인코딩을 제거
      const cleanTitle = item.title.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/&quot;/g, '');
      const cleanDescription = item.description.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/&quot;/g, '');

      newsItems.push({
        title: cleanTitle,
        link: item.link,
        description: cleanDescription,
        originallink: item.originallink,
        pubDate: item.pubDate,
        imageUrl: imageUrl,
        content: content  // 본문을 context_detail에 추가
      });

      if (newsItems.length >= 5) {
        break;
      }
    }

    res.json({
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

app.listen(3000, '0.0.0.0', function () {
  console.log('listening on port 3000!');
});
