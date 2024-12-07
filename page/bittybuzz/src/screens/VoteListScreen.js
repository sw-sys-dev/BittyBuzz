import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
    {
      id: '11',
      title: '홍준표 대구시장 관련 여론조작 의혹에 대한 입장',
      category: '정치',
      icon: require('../assets/images/news1.jpg'),
      progress: 12,
      status: '진행 중',
      options: [
        '강혜경 씨의 폭로는 공익을 위한 것으로 봐야 한다.',
        '명태균과 강혜경 씨 모두 여론조작 공범으로 조사해야 한다.',
        '홍준표 시장의 주장이 신뢰할 수 있다.',
        '폭로자의 주장이 더 신뢰할 만하다.',
        '잘 모르겠다.',
      ],
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
        return '#D3F2E3';
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
    navigation.navigate('VoteDetail', { topic });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Vote on a Topic</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search topics..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'newest' && styles.activeSort]}
          onPress={() => setSortOption('newest')}
        >
          <Text style={[styles.sortText, sortOption === 'newest' && styles.activeSortText]}>최신순</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, sortOption === 'popular' && styles.activeSort]}
          onPress={() => setSortOption('popular')}
        >
          <Text style={[styles.sortText, sortOption === 'popular' && styles.activeSortText]}>진행률순</Text>
        </TouchableOpacity>
      </View>

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
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.topicText}>{item.title}</Text>
              <Text style={styles.topicStatus}>{item.status}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.progress}%`,
                      backgroundColor:
                        item.progress > 80 ? 'green' : item.progress > 50 ? 'orange' : 'red',
                    },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f2f5', // 부드러운 중립색 배경
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2c3e50', // 짙은 네이비 색상
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    height: 45,
    borderColor: '#dfe6e9',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sortButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dfe6e9',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  activeSort: {
    backgroundColor: '#3498db', // 파란색으로 활성화 상태 표시
    borderColor: '#3498db',
  },
  sortText: {
    color: '#7f8c8d',
    fontWeight: '600',
  },
  activeSortText: {
    color: '#ffffff', // 활성화된 버튼 텍스트는 흰색
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#dfe6e9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  largeIcon: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  topicContent: {
    flex: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34495e',
    marginBottom: 5,
  },
  topicText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  topicStatus: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ecc71', // 초록색 진행률 색상
    borderRadius: 4,
  },
});
