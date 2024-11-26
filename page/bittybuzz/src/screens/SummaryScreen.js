import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import styles from '../styles/SummaryScreenStyles'; // Import styles

export default function SummaryScreen() {
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const toast = useToast();

  const handleSummarization = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setSummary(
        `Here's a summary of your ${activeTab === 'text' ? 'text' : 'video'}: ${inputContent.slice(
          0,
          100
        )}...`
      );
      setIsLoading(false);
      toast.show('Summary Generated', {
        type: 'success',
        description: 'Your content has been successfully summarized.',
      });
    }, 2000);
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
        </View>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={activeTab === 'text' ? 'Type your text here...' : 'Enter video URL'}
            value={inputContent}
            onChangeText={setInputContent}
            multiline={activeTab === 'text'}
          />
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={[styles.actionButton, !inputContent && styles.disabledButton]}
          onPress={handleSummarization}
          disabled={!inputContent || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {activeTab === 'text' ? 'Summarize Text' : 'Summarize Video'}
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
