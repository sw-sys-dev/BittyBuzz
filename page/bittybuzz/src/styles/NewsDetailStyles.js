import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover', // 추가
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  category: {
    fontSize: 14,
    color: '#4a90e2',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  content: {
    fontSize: 16,
    marginBottom: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  relatedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  relatedCard: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  relatedImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  relatedTitleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    flex: 1, // 추가: 남은 공간 채우기
    flexWrap: 'wrap', // 텍스트 줄바꿈
  },
  relatedDescription: {
    fontSize: 14,
    color: '#666',
  },
  noArticlesText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  linkButton: {
    backgroundColor: '#0174DF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summarizeButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  summarizeButtonHover: {
    backgroundColor: '#45a049',
  },
  summarizeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  relatedContainer: {
    flexDirection: 'column',
    marginVertical: 8,
  },
  scrollView: {
    paddingBottom: 16,
  },
  relatedCardHover: {
    backgroundColor: '#f5f5f5', // 터치 시 배경 변경
  },
});
