import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import NewsDetailStyles from '../styles/NewsDetailStyles';
import { useNavigation } from '@react-navigation/native';

export default function NewsDetail({ route }) {
  const { title, image, description, category, pubDate } = route.params;
  const [relatedArticles, setRelatedArticles] = useState([]);
  const navigation = useNavigation();

  // Fetch related articles based on the category
  useEffect(() => {
    fetch(`http://본인:3000/search/news?query=${category}`)
      .then(response => response.json())
      .then(data => setRelatedArticles(data.items))
      .catch(error => console.error('Error fetching related articles:', error));
  }, [category]);

  return (
    <ScrollView style={NewsDetailStyles.container}>
      {/* Main Article */}
      <Image source={{ uri: image }} style={NewsDetailStyles.image} />
      <View style={NewsDetailStyles.metaContainer}>
        <Text style={NewsDetailStyles.category}>{category}</Text>
        <Text style={NewsDetailStyles.date}>{new Date(pubDate).toLocaleDateString()}</Text>
      </View>
      <Text style={NewsDetailStyles.title}>{title}</Text>
      <Text style={NewsDetailStyles.content}>{description}</Text>

      {/* Separator */}
      <View style={NewsDetailStyles.separator} />

      {/* Related Articles */}
      <Text style={NewsDetailStyles.relatedTitle}>관련 기사</Text>
      {relatedArticles.slice(0, 5).map((article, index) => (
        <TouchableOpacity
          key={index}
          style={NewsDetailStyles.relatedCard}
          onPress={() => navigation.push('NewsDetail', {
            title: article.title,
            image: article.imageUrl, // Ensure imageUrl is part of the response data
            description: article.description,
            category: article.category,
            pubDate: article.pubDate,
          })}
        >
          <Text style={NewsDetailStyles.relatedTitleText}>{article.title}</Text>
          <Text style={NewsDetailStyles.relatedDescription}>{article.description}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
