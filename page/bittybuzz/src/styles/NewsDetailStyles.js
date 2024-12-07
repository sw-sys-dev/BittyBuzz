import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9fb',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  category: {
    fontSize: 14,
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
  title: {
    fontSize: 22, // 제목 크기 약간 줄임
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  content: {
    fontSize: 15, // 본문 글씨 크기 조정
    marginBottom: 16,
    lineHeight: 22,
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  relatedTitle: {
    fontSize: 18, // 관련 기사 제목 크기 약간 줄임
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
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
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    flex: 1,
    flexWrap: 'wrap',
    color: '#333',
  },
  relatedDescription: {
    fontSize: 13,
    color: '#666',
  },
  noArticlesText: {
    fontSize: 15,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  summarizeButton: {
    backgroundColor: '#3f51b5', // 뉴스 요약 버튼 색상 변경
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  summarizeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  voteContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  voteTitle: {
    fontSize: 16, // 투표 제목 크기 줄임
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  optionsContainer: {
    flexDirection: 'column',
  },
  optionButton: {
    backgroundColor: '#ff7043', // 버튼 색상 변경
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  selectedOptionButton: {
    backgroundColor: '#d84315', // 선택된 버튼 색상 변경
    borderWidth: 1,
    borderColor: '#bf360c',
  },
  optionText: {
    fontSize: 14, // 옵션 텍스트 크기 줄임
    fontWeight: '600',
    color: '#fff',
  },
  shortStyleCard: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  relatedDescription: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  
});
