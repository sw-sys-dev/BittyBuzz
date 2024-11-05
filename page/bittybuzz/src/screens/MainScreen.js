import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import globalStyles from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const recentNews = [
  { title: 'Recent News 1: Market Hits Record...', image: require('../assets/images/sample-news1.jpg'), description: '어쩌구 저쩌구' },
  { title: 'Recent News 2: Policy Changes Announced', image: require('../assets/images/sample-news2.png'),description: '이러쿵 저쩌구'},
  { title: 'Recent News 3: Technology Advancements', image: require('../assets/images/sample-news3.png'),description: '블라블라 저쩌구' },
];

const newsData = {
  정치: [
    { title: 'Political News 1: Big Changes in Government', image: require('../assets/images/sample-news1.jpg'),description: '어쩌구 저쩌구' },
    { title: 'Political News 2: New Policies Introduced', image: require('../assets/images/sample-news2.png'),description: '이러쿵 저쩌구' },
  ],
  시사: [
    { title: 'Current Affairs 1: Major Social Trends', image: require('../assets/images/sample-news3.png'),description: '블라블라 저쩌구' },
    { title: 'Current Affairs 2: Public Opinions Shifting', image: require('../assets/images/sample-news4.jpg'),description: '머라궁 저쩌구' },
  ],
  경제: [
    { title: 'Economic News 1: Market Hits Record High', image: require('../assets/images/sample-news1.jpg'),description: '어쩌구 저쩌구' },
    { title: 'Economic News 2: Inflation on the Rise', image: require('../assets/images/sample-news2.png'),description: '이러쿵 저쩌구' },
  ],
  스포츠: [
    { title: 'Political News 1: Big Changes in Government', image: require('../assets/images/sample-news1.jpg'),description: '어쩌구 저쩌구' },
    { title: 'Political News 2: New Policies Introduced', image: require('../assets/images/sample-news2.png'),description: '이러쿵 저쩌구'  },
  ],
  기술: [
    { title: 'Current Affairs 1: Major Social Trends', image: require('../assets/images/sample-news3.png'),description: '블라블라 저쩌구'},
    { title: 'Current Affairs 2: Public Opinions Shifting', image: require('../assets/images/sample-news4.jpg'),description: '머라궁 저쩌구' },
  ],
  건강: [
    { title: 'Economic News 1: Market Hits Record High', image: require('../assets/images/sample-news1.jpg') },
    { title: 'Economic News 2: Inflation on the Rise', image: require('../assets/images/sample-news2.png'),description: '이러쿵 저쩌구'  },
  ],
};

export default function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState('정치');
  const categories = Object.keys(newsData);
  const navigation = useNavigation();

  const handleReadMore = (news) => {
    navigation.navigate('NewsDetail', {
        title: news.title,
        image: news.image,
        description: news.description
    });
};
  return (
    <ScrollView style={globalStyles.container}>
      {/* Custom Header */}
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Bitty Buzz</Text>
        <View style={globalStyles.searchContainer}>
          <TextInput
            placeholder="Enter keywords..."
            style={globalStyles.searchInput}
          />
          <Image source={require('../assets/icons/camera.png')} style={globalStyles.icon} />
          <Image source={require('../assets/icons/microphone.png')} style={globalStyles.icon} />
        </View>
        <View style={globalStyles.rowContainer}>
          <Text style={globalStyles.subText}>안녕하세요, 윤지님</Text>
        </View>
        <View style={globalStyles.rowContainer}>
          <Text style={globalStyles.subText}>Shall we go use the news summary function?</Text>
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
              selectedCategory === category && globalStyles.selectedCategoryItem
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={globalStyles.categoryText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* News Cards for the selected category */}
      {newsData[selectedCategory].map((news, index) => (
        <View key={index} style={globalStyles.card}>
          <Image source={news.image} style={globalStyles.cardImage} />
          <Text style={globalStyles.cardTitle}>{news.title}</Text>
          <TouchableOpacity onPress={() => handleReadMore(news)}>
            <Text style={globalStyles.cardAction}>Start reading</Text>
            console.log('Received params:', title, image, description);
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}
