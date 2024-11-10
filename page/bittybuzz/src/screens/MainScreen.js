import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/globalStyles';

export default function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState('정치');  // '정치' 카테고리를 기본값으로 설정
  const [categoryNews, setCategoryNews] = useState([]);  // 카테고리 뉴스 상태
  const [recentNews, setRecentNews] = useState([]);     // 최신 뉴스 상태
  const categories = ['정치', '시사', '경제', '스포츠', '기술', '건강'];
  const navigation = useNavigation();

  // 컴포넌트가 마운트될 때 실행 (초기 로드)
  useEffect(() => {
    // 모든 뉴스를 가져와서 최신 뉴스 5개를 추출하기
    fetch('http://192.0.0.2:3000/search/news')
      .then(response => response.json())  // JSON 응답을 파싱
      .then(data => {
        const sortedNews = data.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setRecentNews(sortedNews.slice(0, 5)); // 최신 5개의 뉴스만 저장
      })
      .catch(error => {
        console.error('Error fetching news:', error);
      });

    // 기본적으로 "정치" 카테고리 뉴스 로드
    fetch('http://192.0.0.2:3000/search/news?query=정치')
      .then(response => response.json())
      .then(data => {
        setCategoryNews(data.items); // 정치 뉴스 데이터를 categoryNews에 저장
      })
      .catch(error => {
        console.error('Error fetching category news:', error);
      });
  }, []); // 컴포넌트 마운트 시 한 번만 실행

      .catch(error => console.error('Error fetching news:', error));
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 호출
  const handleReadMore = (news) => {
    navigation.navigate('NewsDetail', {
      title: news.title,
      image: news.imageUrl,
      description: news.description,
      pubDate: news.pubDate, // Pass the publication date if available
      content: news.content
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bitty Buzz</Text>
        <View style={styles.searchContainer}>
          <TextInput placeholder="Enter keywords..." style={styles.searchInput} />
          <Image source={require('../assets/icons/camera.png')} style={styles.icon} />
          <Image source={require('../assets/icons/microphone.png')} style={styles.icon} />
        </View>
        <Text style={styles.welcomeText}>안녕하세요, 윤지님</Text>
        <Text style={styles.summaryPrompt}>뉴스 요약기능을 사용해보세요!</Text>
      </View>

      {/* Recent News */}
      <Text style={[styles.content, { fontWeight: 'bold' }]}>Recent News</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {recentNews.map((news, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: news.imageUrl }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{news.title}</Text>
            <TouchableOpacity onPress={() => handleReadMore(news)}>
              <Text style={styles.cardAction}>Start reading →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* News Categories */}
      <Text style={[styles.content, { fontWeight: 'bold' }]}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategoryItem,
            ]}
            onPress={() => {
              setSelectedCategory(category);  // 선택된 카테고리 업데이트
              fetch(`http://192.0.0.2:3000/search/news?query=${category}`)
                .then(response => response.json())
                .then(data => {
                  setCategoryNews(data.items); // 선택된 카테고리 뉴스 데이터
                })
                .catch(error => console.error('Error fetching category news:', error));
            }}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category News - Horizontal Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {categoryNews.map((news, index) => (
          <View key={index} style={styles.card}>
            {news.imageUrl && <Image source={{ uri: news.imageUrl }} style={styles.cardImage} />}
            <Text style={styles.cardTitle}>{news.title}</Text>
            <Text style={styles.cardDescription}>{news.description}</Text>
            <TouchableOpacity onPress={() => handleReadMore(news)}>
              <Text style={styles.cardAction}>Start reading →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
