import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity,Dimensions  } from 'react-native';
import globalStyles from '../styles/globalStyles';

const newsData = {
  정치: [
    { title: 'Political News 1: Big Changes in Government', image: require('../assets/images/sample-news1.jpg') },
    { title: 'Political News 2: New Policies Introduced', image: require('../assets/images/sample-news2.png') },
  ],
  시사: [
    { title: 'Current Affairs 1: Major Social Trends', image: require('../assets/images/sample-news3.png') },
    { title: 'Current Affairs 2: Public Opinions Shifting', image: require('../assets/images/sample-news4.jpg') },
  ],
  경제: [
    { title: 'Economic News 1: Market Hits Record High', image: require('../assets/images/sample-news1.jpg') },
    { title: 'Economic News 2: Inflation on the Rise', image: require('../assets/images/sample-news2.png') },
  ],
  스포츠: [
    { title: 'Political News 1: Big Changes in Government', image: require('../assets/images/sample-news1.jpg') },
    { title: 'Political News 2: New Policies Introduced', image: require('../assets/images/sample-news2.png') },
  ],
  기술: [
    { title: 'Current Affairs 1: Major Social Trends', image: require('../assets/images/sample-news3.png') },
    { title: 'Current Affairs 2: Public Opinions Shifting', image: require('../assets/images/sample-news4.jpg') },
  ],
  건강: [
    { title: 'Economic News 1: Market Hits Record High', image: require('../assets/images/sample-news1.jpg') },
    { title: 'Economic News 2: Inflation on the Rise', image: require('../assets/images/sample-news2.png') },
  ],
};

export default function MainScreen() {
  const [selectedCategory, setSelectedCategory] = useState('정치');
  const [activeIndex, setActiveIndex] = useState(0);
  const categories = Object.keys(newsData);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const screenWidth = Dimensions.get('window').width;
    const newIndex = Math.round(scrollPosition / screenWidth);
    setActiveIndex(newIndex);
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
      <Text style={globalStyles.sectionTitle}>Resent News</Text>
      <ScrollView
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={globalStyles.horizontalScrollView}
        showsHorizontalScrollIndicator={false}
      >
        {newsData[selectedCategory].map((news, index) => (
          <View
            key={index}
            style={[
              globalStyles.card,
              activeIndex === index ? globalStyles.activeCard : globalStyles.inactiveCard
            ]}
          >
            <Image source={news.image} style={globalStyles.cardImage} />
            <Text style={globalStyles.cardTitle}>{news.title}</Text>
            <Text style={globalStyles.cardAction}>Start reading </Text>
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

      <Text style={globalStyles.sectionTitle}>Latest News</Text>

      {/* News Cards for the selected category */}
      {newsData[selectedCategory].map((news, index) => (
        <View key={index} style={globalStyles.card}>
          <Image source={news.image} style={globalStyles.cardImage} />
          <Text style={globalStyles.cardTitle}>{news.title}</Text>
          <Text style={globalStyles.cardAction}>Start reading </Text>
        </View>
      ))}
    </ScrollView>
  );
}
