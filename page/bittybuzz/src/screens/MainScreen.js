import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/globalStyles';

export default function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState('정치');
  const [categoryNews, setCategoryNews] = useState([]);
  const [recentNews, setRecentNews] = useState([]);
  const [loadingRecentNews, setLoadingRecentNews] = useState(true);
  const [loadingCategoryNews, setLoadingCategoryNews] = useState(true);
  const categories = ['정치', '시사', '경제', '스포츠', '기술', '건강'];
  const navigation = useNavigation();
  const defaultImage = require('../assets/images/instead.jpg'); // 대체 이미지 경로

  useEffect(() => {
    fetch('http://192.168.45.214:3000/search/news')
      .then(response => response.json())
      .then(data => {
        const sortedNews = data.items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
        setRecentNews(sortedNews.slice(0, 5));
      })
      .catch(error => console.error('Error fetching recent news:', error))
      .finally(() => setLoadingRecentNews(false));
  }, []);

  useEffect(() => {
    setLoadingCategoryNews(true);
    fetch(`http://192.168.45.214:3000/search/news?query=${selectedCategory}`)
      .then(response => response.json())
      .then(data => setCategoryNews(data.items))
      .catch(error => console.error('Error fetching category news:', error))
      .finally(() => setLoadingCategoryNews(false));
  }, [selectedCategory]);

  const handleReadMore = (news) => {
    navigation.navigate('NewsDetail', {
      title: news.title,
      image: news.imageUrl,
      description: news.description,
      pubDate: news.pubDate,
      content: news.content
    });
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage; // 이미지 로딩 실패 시 대체 이미지 설정
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
      {loadingRecentNews ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Fetching the latest updates...</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
          {recentNews.map((news, index) => (
            <View key={index} style={styles.card}>
              <Image 
                source={{ uri: news.imageUrl }} 
                style={styles.cardImage} 
                onError={handleImageError}  // 이미지 오류 발생 시 대체 이미지로 변경
              />
              <Text style={styles.cardTitle}>{news.title}</Text>
              <TouchableOpacity onPress={() => handleReadMore(news)}>
                <Text style={styles.cardAction}>Start reading →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}

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
            onPress={() => setSelectedCategory(category)}
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

      {/* Category News */}
      {loadingCategoryNews ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Loading {selectedCategory} news...</Text>
        </View>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
          {categoryNews.map((news, index) => (
            <View key={index} style={styles.card}>
              {news.imageUrl ? (
                <Image 
                  source={{ uri: news.imageUrl }} 
                  style={styles.cardImage} 
                  onError={handleImageError}  // 이미지 오류 발생 시 대체 이미지로 변경
                />
              ) : (
                <Image source={defaultImage} style={styles.cardImage} />
              )}
              <Text style={styles.cardTitle}>{news.title}</Text>
              <Text style={styles.cardDescription}>{news.description}</Text>
              <TouchableOpacity onPress={() => handleReadMore(news)}>
                <Text style={styles.cardAction}>Start reading →</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
}
