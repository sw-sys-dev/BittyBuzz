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
import { launchImageLibrary } from 'react-native-image-picker'; // 갤러리 접근을 위한 라이브러리
import { useToast } from 'react-native-toast-notifications'; // Toast 알림
import styles from '../styles/SummaryScreenStyles'; // 스타일 import

export default function SummaryScreen() {
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [selectedImage, setSelectedImage] = useState(null); // 선택한 이미지 상태
  const toast = useToast();

  const handleSummarization = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const generatedSummary =
        activeTab === 'text'
          ? `Text Summary: ${inputContent.slice(0, 100)}...`
          : activeTab === 'video'
          ? 'Video Summary: This is a placeholder for video summary...'
          : 'Image Summary: This is a placeholder for image summary...';

      setSummary(generatedSummary);
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
        mediaType: 'photo', // 사진만 선택 가능
        quality: 1, // 고화질
      },
      (response) => {
        if (response.didCancel) {
          toast.show('Image selection canceled', { type: 'warning' });
        } else if (response.errorMessage) {
          toast.show(`Error: ${response.errorMessage}`, { type: 'danger' });
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri; // 이미지 URI 가져오기
          setSelectedImage(uri);
          toast.show('Image uploaded successfully', { type: 'success' });
        }
      }
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/sumback.png')}
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
                : 'Summarize Image'}
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