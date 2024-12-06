import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/VoteListScreenStyles';

export default function VoteListScreen() {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const topics = [
    {
      id: '1',
      title: '윤석열 대통령의 비상계엄 선포에 대한 의견',
      icon: require('../assets/images/vote1.png'),
      progress: 75,
      status: '진행 중',
      category: '정치',
      options: ['찬성', '반대', '중립'],
    },
    {
      id: '2',
      title: '의대 정원 확대 정책에 대한 찬반',
      icon: require('../assets/images/vote2.png'),
      progress: 50,
      status: '진행 중',
      category: '경제',
      options: ['찬성', '반대'],
    },
    {
      id: '3',
      title: '2024 올림픽 주요 경기 결과 예측',
      icon: require('../assets/images/vote3.png'),
      progress: 100,
      status: '투표 완료',
      category: '스포츠',
      options: ['금메달 예상', '은메달 예상', '동메달 예상', '메달 없음'],
    },
    {
      id: '4',
      title: 'AI 기술이 인간의 일자리에 미치는 영향',
      icon: require('../assets/images/vote4.png'),
      progress: 30,
      status: '진행 중',
      category: '기술',
      options: ['긍정적', '부정적', '중립'],
    },
    {
      id: '5',
      title: '2025년 한국 경제 성장률 전망',
      icon: require('../assets/images/vote5.png'),
      progress: 10,
      status: '진행 중',
      category: '경제',
      options: ['높아질 것', '낮아질 것', '변화 없음'],
    },
    {
      id: '6',
      title: '챔피언스 리그 우승 팀 예측',
      icon: require('../assets/images/vote6.png'),
      progress: 85,
      status: '진행 중',
      category: '스포츠',
      options: ['레알 마드리드', '맨체스터 시티', '바이에른 뮌헨', '기타'],
    },
    {
      id: '7',
      title: '전기차가 환경에 미치는 영향',
      icon: require('../assets/images/vote7.png'),
      progress: 50,
      status: '진행 중',
      category: '기술',
      options: ['긍정적', '부정적', '중립', '잘 모르겠다'],
    },
    {
      id: '8',
      title: '올림픽 경기 중 가장 기대되는 종목',
      icon: require('../assets/images/vote8.png'),
      progress: 100,
      status: '투표 완료',
      category: '스포츠',
      options: ['육상', '수영', '축구', '기타'],
    },
    {
      id: '9',
      title: '미국 대선 후보 정책과 한국에 미칠 영향',
      icon: require('../assets/images/vote9.png'),
      progress: 60,
      status: '진행 중',
      category: '경제',
      options: ['한미 FTA 강화로 한국 수출 증가', '보호무역주의 강화로 한국 경제 위축', '미국 내 기업 리쇼어링(국내 회귀)으로 한국 대미 수출 감소', '글로벌 공급망 협력 강화'],
    },
    {
      id: '10',
      title: 'AI 기반 의료 기술의 도입 효과',
      icon: require('../assets/images/vote10.png'),
      progress: 40,
      status: '진행 중',
      category: '기술',
      options: ['긍정적', '부정적', '중립', '효과 없음'],
    },
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case '정치':
        return '#ECF2FF';
      case '경제':
        return '#E3DFFD';
      case '스포츠':
        return '#FFF4D2';
      case '기술':
      default:
        return '#D3F2E3'; // 기술 또는 기타 카테고리 색상
    }
  };

  const filteredTopics = topics
    .filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'newest') return b.id - a.id;
      if (sortOption === 'popular') return b.progress - a.progress;
      return 0;
    });

  const handlePress = (topic) => {
    navigation.navigate('VoteDetail', { topic }); // topic 전체 전달
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Vote on a Topic</Text>

      {/* 검색 바 */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search topics..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* 정렬 옵션 */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'newest' && styles.activeSort]}
          onPress={() => setSortOption('newest')}
        >
          <Text style={styles.sortText}>최신순</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'popular' && styles.activeSort]}
          onPress={() => setSortOption('popular')}
        >
          <Text style={styles.sortText}>진행률순</Text>
        </TouchableOpacity>
      </View>

      {/* 투표 리스트 */}
      <FlatList
        data={filteredTopics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.topicItem,
              { backgroundColor: getCategoryColor(item.category) },
            ]}
            onPress={() => handlePress(item)}
          >
            <Image source={item.icon} style={styles.largeIcon} />
            <View style={styles.topicContent}>
              <Text style={styles.categoryText}>{item.category}</Text> {/* 카테고리 표시 */}
              <Text style={styles.topicText}>{item.title}</Text>
              <Text style={styles.topicStatus}>{item.status}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
