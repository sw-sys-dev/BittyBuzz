/* eslint-disable no-unused-vars */
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import NewsDetailStyles from '../styles/NewsDetailStyles';

export default function NewsDetail({ route }) {
    const { title, image, description } = route.params;

    return (
        <ScrollView style={NewsDetailStyles.container}>
            <Image source={image} style={NewsDetailStyles.image} />
            <Text style={NewsDetailStyles.title}>{title}</Text>
            <Text style={NewsDetailStyles.content}>{description}</Text>
        </ScrollView>
    );
}
