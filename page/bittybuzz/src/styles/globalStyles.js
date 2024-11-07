/* eslint-disable no-dupe-keys */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom:10
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 8,
  },
  subText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '900',
    marginBottom: 4,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  cardContent: {
    padding: 8,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  horizontalScrollView: {
    marginVertical: 10,
    flexDirection: 'row',
  },
  categoryScrollView: {
    marginVertical: 10,
  },
  categoryItem: {
    backgroundColor: '#FFF9C4', 
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 20,
    borderRadius:10
  },
  selectedCategoryItem: {
    backgroundColor: '#FFD700',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
  },
  cardAction: {
    fontSize: 16,
    color: '#007BFF',
  },

  });
