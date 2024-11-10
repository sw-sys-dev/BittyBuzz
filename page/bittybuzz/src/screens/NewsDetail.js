// NewsDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NewsDetailStyles';
export default function NewsDetail({ route }) {
  const { title, image, description, category, pubDate, originallink } = route.params;
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigation = useNavigation();

  // Fetch related articles based on the category
  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await fetch(`http://112.160.250.105:3000/search/news?query=${category}`);
        if (!response.ok) {
          console.error('Network response was not ok');
          return;
        }
        const data = await response.json();
        setRelatedArticles(data.items);
      } catch (error) {
        console.error('Error fetching related articles:', error);
      }
    };
    fetchRelatedArticles();
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
      <Text style={styles.content}>{description}</Text>

      {/* Original Link Button */}
      <TouchableOpacity style={styles.linkButton} onPress={openOriginalLink}>
        <Text style={styles.linkButtonText}>원문 보기</Text>
      </TouchableOpacity>

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
            category: article.category,
            pubDate: article.pubDate,
            originallink: article.originallink, 
          })}
        >
          <Text style={styles.relatedTitleText}>{article.title}</Text>
          <Text style={styles.relatedDescription}>{article.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

