import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const topics = [
  { id: '1', title: 'React Native를 사용하는 이유' },
  { id: '2', title: '좋아하는 프로그래밍 언어' },
  { id: '3', title: '가장 선호하는 데이터베이스' },
];

export default function VoteListScreen({ navigation }) {
  const handlePress = (topic) => {
    // 'Vote'라는 이름으로 정의된 Stack.Screen으로 이동
    navigation.navigate('Vote', { topic });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={topics}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.topicItem} onPress={() => handlePress(item)}>
            <Text style={styles.topicText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  topicItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 2,
  },
  topicText: {
    fontSize: 18,
    color: '#333',
  },
});
