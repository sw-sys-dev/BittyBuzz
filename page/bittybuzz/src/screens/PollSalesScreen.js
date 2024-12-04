import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Image,
} from 'react-native';

export default function PollSalesScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const categories = ['전체', '정치', '경제', '스포츠', '기술', '건강'];

  const allPollItems = [
    { id: '14', category: '정치', title: '정당 지지율 조사', description: '정당 지지율 조사', price: '60,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '3', category: '경제', title: '소비자 신뢰도 조사', description: '소비자 신뢰 지수 조사', price: '55,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
    { id: '6', category: '스포츠', title: '스포츠 팬 선호도', description: '스포츠 팀 및 선수 인기 조사', price: '40,000원', image: require('../assets/images/sports.png'), color: '#D4FFB4' },
    { id: '10', category: '정치', title: '선거 공약 신뢰도 조사', description: '공약 신뢰도 평가', price: '50,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '26', category: '경제', title: '주식 시장 선호도 조사', description: '주식 투자 선호도 조사', price: '75,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
    { id: '27', category: '스포츠', title: '스포츠 관련 기술 도입 조사', description: '기술 혁신에 대한 여론조사', price: '60,000원', image: require('../assets/images/sports.png'), color: '#D4FFB4' },
    { id: '23', category: '경제', title: '경제 정책 반응 조사', description: '정부 정책 영향 조사', price: '60,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
    { id: '11', category: '정치', title: '정치 대립 구조 분석', description: '정치적 대립에 대한 여론조사', price: '50,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '24', category: '스포츠', title: '스포츠 경기 관람 의향 조사', description: '관람 패턴 분석 데이터', price: '65,000원', image: require('../assets/images/sports.png'), color: '#D4FFB4' },
    { id: '7', category: '경제', title: '경제 동향 분석', description: '경제 현황 및 전망 조사', price: '60,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
    { id: '15', category: '정치', title: '투표 참여 의향 조사', description: '국민 투표 의향 조사', price: '55,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '33', category: '스포츠', title: '축구 월드컵 여론조사', description: '월드컵 관련 의견 조사', price: '60,000원', image: require('../assets/images/sports.png'), color: '#D4FFB4' },
    { id: '18', category: '정치', title: '정치 뉴스 신뢰도 조사', description: '뉴스 신뢰도 여론조사', price: '45,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '31', category: '경제', title: '인플레이션 영향 조사', description: '물가 상승에 따른 소비 분석', price: '65,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
    { id: '20', category: '스포츠', title: '스포츠 이벤트 관심도 조사', description: '국내외 이벤트 관심도 분석', price: '55,000원', image: require('../assets/images/sports.png'), color: '#D4FFB4' },
    { id: '9', category: '정치', title: '외교 정책 평가 조사', description: '외교 정책에 대한 여론조사', price: '35,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '12', category: '경제', title: '금융 시장 데이터 조사', description: '금융 데이터 기반 조사', price: '80,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
    { id: '8', category: '스포츠', title: '프로 스포츠 리그 인기 조사', description: '리그 및 팀 선호도', price: '75,000원', image: require('../assets/images/sports.png'), color: '#D4FFB4' },
    { id: '5', category: '정치', title: '지방 자치 선호도 조사', description: '지역별 선호도 조사', price: '40,000원', image: require('../assets/images/politics.png'), color: '#FFE5B4' },
    { id: '25', category: '경제', title: '소매업체 선호도 조사', description: '소비자 소매점 선호 분석', price: '45,000원', image: require('../assets/images/economy.png'), color: '#B4D3FF' },
  ];
  

  const filteredPollItems =
    selectedCategory === '전체'
      ? allPollItems
      : allPollItems.filter((item) => item.category === selectedCategory);

  const handlePurchase = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const confirmPurchase = () => {
    alert(`${selectedItem.title} 데이터를 구매하셨습니다!`);
    setModalVisible(false);
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderPollItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.pollItem, { backgroundColor: item.color }]}
      onPress={() => handlePurchase(item)}
    >
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.pollImage} />
      </View>
      <View style={styles.pollTextContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>여론조사 데이터 판매</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />
      <FlatList
        data={filteredPollItems}
        renderItem={renderPollItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>구매 확인</Text>
            {selectedItem && (
              <>
                <Text style={styles.modalText}>{selectedItem.title}</Text>
                <Text style={styles.modalText}>가격: {selectedItem.price}</Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>취소</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonConfirm]}
                onPress={confirmPurchase}
              >
                <Text style={styles.textStyle}>구매</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  categoryList: {
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,  
    backgroundColor: '#ddd',
    borderRadius: 20,
    marginRight: 10,
    height:40
  },
  categoryButtonSelected: {
    backgroundColor: '#ff6b6b',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  pollItem: {
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  pollImage: {
    width: 50,
    height: 50,
  },
  pollTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  buttonCancel: {
    backgroundColor: '#bbb',
  },
  buttonConfirm: {
    backgroundColor: '#ff6b6b',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});