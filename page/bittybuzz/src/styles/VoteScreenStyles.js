import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9fb', // 밝고 부드러운 배경색
  },
  topicImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ccc', // 더 부드러운 테두리 색상
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222', // 더 어두운 제목 색상
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24, // 줄 간격 더 넓힘
  },
  optionsContainer: {
    width: '100%',
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#3e8e41', // 테두리 추가
  },
  selectedOptionButton: {
    backgroundColor: '#357a38', // 선택된 버튼의 더 진한 색상
    borderColor: '#2e6d32', // 선택된 버튼 테두리 색상
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textTransform: 'capitalize', // 대문자 대신 첫 글자만 대문자
  },
});
