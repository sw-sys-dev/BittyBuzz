import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

export default function PollSalesScreen({ navigation }) {
  const pollItems = [
    { id: '1', title: '정치 여론조사', description: '대통령 선거 관련 여론조사', price: '50,000원' },
    { id: '2', title: '소비자 만족도 조사', description: '제품 만족도 평가 조사', price: '30,000원' },
    { id: '3', title: '지역 개발 조사', description: '지역 개발 선호도 조사', price: '40,000원' },
  ];

  const handlePurchase = (item) => {
    alert(`${item.title}를 구매하셨습니다!`);
  };

  const renderPollItem = ({ item }) => (
    <TouchableOpacity style={styles.pollItem} onPress={() => handlePurchase(item)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.price}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>여론조사 판매</Text>
      <FlatList
        data={pollItems}
        renderItem={renderPollItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  pollItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  price: {
    fontSize: 16,
    color: '#ff99cc',
    marginTop: 10,
  },
});
