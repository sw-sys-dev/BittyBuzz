import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  sortContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  sortButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeSort: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  sortText: {
    color: '#333',
    fontWeight: '600',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  largeIcon: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 15,
  },
  topicContent: {
    flex: 1,
  },
  topicText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  topicStatus: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
});
