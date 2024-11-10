import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/globalStyles';

const recentNews = [
  { title: 'Recent News 1: Market Hits Record...', image: require('../assets/images/sample-news1.jpg'), description: '어쩌구 저쩌구' },
  { title: 'Recent News 2: Policy Changes Announced', image: require('../assets/images/sample-news2.png'), description: '이러쿵 저쩌구' },
  { title: 'Recent News 3: Technology Advancements', image: require('../assets/images/sample-news3.png'), description: '블라블라 저쩌구' },
];

export default function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState('정치');
  const [categoryNews, setCategoryNews] = useState([]);
  const categories = ['정치', '시사', '경제', '스포츠', '기술', '건강'];
  const navigation = useNavigation();

  useEffect(() => {
    // 선택된 카테고리에 따른 뉴스 데이터를 백엔드에서 가져오기
    fetch(`http://본인:3000/search/news?query=${selectedCategory}`)
      .then(response => response.json())
      .then(data => {
        setCategoryNews(data.items); // 불러온 데이터를 상태에 저장
      })
      .catch(error => console.error('Error fetching news:', error));
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 호출
  const handleReadMore = (news) => {
    navigation.navigate('NewsDetail', {
      title: news.title,
      image: news.imageUrl,
      description: news.description,
      category: selectedCategory,
      pubDate: news.pubDate,
      originallink: news.originallink, // Ensure the original link is passed
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
      <Text style={styles.sectionTitle}>Recent News</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {recentNews.map((news, index) => (
          <View key={index} style={styles.card}>
            <Image source={news.image} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{news.title}</Text>
            <TouchableOpacity onPress={() => handleReadMore(news)}>
              <Text style={styles.cardAction}>Start reading →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* News Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>
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

      {/* Category News - Horizontal Scroll */}
      <Text style={styles.sectionTitle}>{selectedCategory} News</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScrollView}>
        {categoryNews.map((news, index) => (
          <View key={index} style={styles.card}>
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
