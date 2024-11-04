import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function MainScreen() {
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
        <Text style={globalStyles.subText}>안녕하세요, 윤지님</Text>
        <Text style={globalStyles.subText}>뉴스 요약 기능을 사용하러 가볼까요?</Text>
        <Image source={require('../assets/images/user-progress.png')} style={globalStyles.progressImage} />
      </View>
      <Text style={globalStyles.sectionTitle}>Recent</Text>
      {/* Example news card */}
      <View style={globalStyles.card}>
        <Image source={require('../assets/images/sample-news.jpg')} style={globalStyles.cardImage} />
        <Text style={globalStyles.cardTitle}>Breaking News: Market Hits Record...</Text>
        <Text style={globalStyles.cardAction}>Start reading </Text>
      </View>
    </ScrollView>
  );
}
