import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import styles from '../styles/VoteScreenStyles';
import { useNavigation } from '@react-navigation/native';

export default function VoteScreen({ route }) {
  const { topic } = route.params;
  const navigation = useNavigation();

  const [selectedOption, setSelectedOption] = useState(null);

  const handleVote = (option) => {
    setSelectedOption(option); // 선택한 옵션 저장
    Alert.alert(
      '투표 완료',
      '투표가 완료되었습니다.',
      [
        {
          text: '확인',
          onPress: () => navigation.goBack(), // 뒤로 이동
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 주제 이미지 */}
      <Image source={topic.icon} style={styles.topicImage} />

      {/* 주제 제목 */}
      <Text style={styles.title}>{topic.title}</Text>

      {/* 설명 텍스트
      <Text style={styles.description}>
        이 주제에 대해 여러분의 의견을 투표해주세요. 다양한 선택지를 제공하니 신중히 선택하세요!
      </Text> */}

      {/* 투표 옵션 */}
      <View style={styles.optionsContainer}>
        {topic.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOptionButton, // 선택된 옵션 스타일 적용
            ]}
            onPress={() => handleVote(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
