import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NewsDetailStyles';

export default function NewsDetail({ route }) {
  const { title, image, description, category, pubDate, content } = route.params;
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigation = useNavigation();

  // Fetch related articles based on the category
  useEffect(() => {
    fetch(`http://192.168.45.214:3000/search/news?query=${category}`)
      .then(response => response.json())
      .then(data => setRelatedArticles(data.items))
      .catch(error => console.error('Error fetching related articles:', error));
  }, [category]);

  // Open the original link in the browser
  const openOriginalLink = () => {
    if (originallink) {
      Linking.openURL(originallink).catch((err) =>
        console.error('Failed to open link:', err)
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Main Article */}
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.metaContainer}>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.date}>{new Date(pubDate).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <ScrollView style={styles.container}>
        <Text style={styles.content}>
          {content ? content : '본문을 불러올 수 없습니다.'}
        </Text>
      </ScrollView>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Related Articles */}
      <Text style={styles.relatedTitle}>관련 기사</Text>
      {relatedArticles.slice(0, 5).map((article, index) => (
        <TouchableOpacity
          key={index}
          style={styles.relatedCard}
          onPress={() => navigation.push('NewsDetail', {
            title: article.title,
            image: article.imageUrl,
            description: article.description,
            category: category,  // Keep the same category for related articles
            pubDate: article.pubDate,
            content: article.content // Passing content as well
          })}
        >
          <Text style={styles.relatedTitleText}>{article.title}</Text>
          <Text style={styles.relatedDescription}>{article.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
