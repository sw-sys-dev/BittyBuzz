import { StyleSheet } from 'react-native';

const SummaryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  outputContainer: {
    marginTop: 16,
  },
  summaryText: {
    fontSize: 18,
    color: '#333',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
});

export default SummaryScreenStyles;
