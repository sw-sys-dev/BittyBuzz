/* eslint-disable no-dupe-keys */
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 16,
    },
    header: {
      paddingVertical: 20,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#000000',
      marginBottom: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#f1f1f1',
      borderRadius: 8,
      marginBottom: 15,
    },
    searchInput: {
      flex: 1,
      marginRight: 10,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: '#555',
    },
    welcomeText: {
      fontSize: 16,
      color: '#000000',
    },
    summaryPrompt: {
      fontSize: 14,
      color: '#000000',
      marginTop: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFFFFF',
      marginTop: 20,
      marginBottom: 10,
    },
    horizontalScrollView: {
      paddingBottom: 10,
    },
    card: {
      backgroundColor: '#f9f9f9',
      borderRadius: 10,
      padding: 10,
      marginRight: 15,
      width: 200,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
    },
    cardImage: {
      width: '100%',
      height: 100,
      borderRadius: 8,
      marginBottom: 10,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
    cardDescription: {
      fontSize: 14,
      color: '#555',
      marginBottom: 5,
    },
    cardAction: {
      fontSize: 14,
      color: '#ff99cc',
    },
    categoryScrollView: {
      marginVertical: 10,
    },
    categoryItem: {
      paddingVertical: 8,
      paddingHorizontal: 15,
      borderRadius: 20,
      backgroundColor: '#f1f1f1',
      marginRight: 10,
    },
    selectedCategoryItem: {
      backgroundColor: '#000000',
    },
    categoryText: {
      fontSize: 14,
      color: '#333',
    },
    selectedCategoryText: {
      color: '#fff', 
    },
    newsList: {
      paddingVertical: 10,
    },
  });
