import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const recentNews = [
  { title: 'Recent News 1: Market Hits Record...', image: require('../assets/images/sample-news1.jpg'), description: '어쩌구 저쩌구' },
  { title: 'Recent News 2: Policy Changes Announced', image: require('../assets/images/sample-news2.png'), description: '이러쿵 저쩌구' },
  { title: 'Recent News 3: Technology Advancements', image: require('../assets/images/sample-news3.png'), description: '블라블라 저쩌구' },
];

export default function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState('정치');
  const [categoryNews, setCategoryNews] = useState([]); // 선택된 카테고리 뉴스
  const categories = ['정치', '시사', '경제', '스포츠', '기술', '건강']; // 카테고리 목록
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
      image: news.image,
      description: news.description,
    });
  };

  return (
    <ScrollView style={globalStyles.container}>
      {/* Custom Header */}
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Bitty Buzz</Text>
        <View style={globalStyles.searchContainer}>
          <TextInput placeholder="Enter keywords..." style={globalStyles.searchInput} />
          <Image source={require('../assets/icons/camera.png')} style={globalStyles.icon} />
          <Image source={require('../assets/icons/microphone.png')} style={globalStyles.icon} />
        </View>
        <View style={globalStyles.rowContainer}>
          <Text style={globalStyles.subText}>안녕하세요, 윤지님</Text>
        </View>
        <View style={globalStyles.rowContainer}>
          <Text style={globalStyles.subText}>뉴스 요약기능을 사용해보세요!</Text>
          <Image source={require('../assets/icons/arrow.png')} style={globalStyles.arrowIcon} />
          <Image source={require('../assets/images/user-progress.png')} style={globalStyles.profileImage} />
        </View>
      </View>


      {/* resent news */}
      <ScrollView horizontal style={globalStyles.horizontalScrollView} showsHorizontalScrollIndicator={false}>
        {recentNews.map((news, index) => (
          <View key={index} style={globalStyles.card}>
            <Image source={news.image} style={globalStyles.cardImage} />
            <View style={globalStyles.cardContent}>
              <Text style={globalStyles.cardTitle}>{news.title}</Text>
              <TouchableOpacity onPress={() => handleReadMore(news)}>
                <Text style={globalStyles.cardAction}>Start reading →</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* News Category Section */}
      <ScrollView horizontal style={globalStyles.categoryScrollView} showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              globalStyles.categoryItem,
              selectedCategory === category && globalStyles.selectedCategoryItem,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={globalStyles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* 선택된 카테고리의 뉴스 */}
      <ScrollView  style={globalStyles.horizontalScrollView} showsHorizontalScrollIndicator={false}>
        {categoryNews.map((news, index) => (
          <View key={index} style={globalStyles.card}>
            <Text style={globalStyles.cardTitle}>{news.title}</Text>
            <Text>{news.description}</Text>
            <TouchableOpacity onPress={() => handleReadMore(news)}>
              <Text style={globalStyles.cardAction}>Start reading →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}
