import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import { useToast } from 'react-native-toast-notifications';
import styles from '../styles/SummaryScreenStyles';

export default function SummaryScreen() {
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image
  const toast = useToast();

  const handleSummarization = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setSummary(
        `Here's a summary of your ${
          activeTab === 'text' ? 'text' : activeTab === 'video' ? 'video' : 'image'
        }: ${inputContent.slice(0, 100)}...`
      );
      setIsLoading(false);
      toast.show('Summary Generated', {
        type: 'success',
        description: 'Your content has been successfully summarized.',
      });
    }, 2000);
  };

  const handleImageSelection = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          toast.show('Image selection canceled', { type: 'warning' });
        } else if (response.errorMessage) {
          toast.show(`Error: ${response.errorMessage}`, { type: 'danger' });
        } else {
          const uri = response.assets[0].uri;
          setSelectedImage(uri);
          toast.show('Image uploaded successfully', { type: 'success' });
        }
      }
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/sumback.png')} // Replace with your uploaded background image
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Get the news at a glance!</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            onPress={() => setActiveTab('text')}
            style={[styles.tab, activeTab === 'text' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>
              Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('video')}
            style={[styles.tab, activeTab === 'video' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>
              Video
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('image')}
            style={[styles.tab, activeTab === 'image' && styles.activeTab]}
          >
            <Text style={[styles.tabText, activeTab === 'image' && styles.activeTabText]}>
              Image
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Area */}
        {activeTab === 'image' ? (
          <View style={styles.imageContainer}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>No image selected</Text>
              </View>
            )}
            <TouchableOpacity style={styles.imageButton} onPress={handleImageSelection}>
              <Text style={styles.imageButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={
                activeTab === 'text' ? 'Type your text here...' : 'Enter video URL'
              }
              value={inputContent}
              onChangeText={setInputContent}
              multiline={activeTab === 'text'}
            />
          </View>
        )}

        {/* Action Button */}
        <TouchableOpacity
          style={[
            styles.actionButton,
            !inputContent && activeTab !== 'image' && styles.disabledButton,
          ]}
          onPress={handleSummarization}
          disabled={(!inputContent && activeTab !== 'image') || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {activeTab === 'text'
                ? 'Summarize Text'
                : activeTab === 'video'
                ? 'Summarize Video'
                : 'Upload Image'}
            </Text>
          )}
        </TouchableOpacity>

        {/* Summary Result */}
        {summary ? (
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Your Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        ) : null}
      </ScrollView>
    </ImageBackground>
  );
}
