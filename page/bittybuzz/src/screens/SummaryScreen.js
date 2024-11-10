import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import styles from '../styles/SummaryScreenStyles';
export default function SummaryScreen() {
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const handleSummarization = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setSummary(`Here's a summary of your ${activeTab === 'text' ? 'text' : 'video'}: ${inputContent.slice(0, 100)}...`);
      setIsLoading(false);
      toast.show("Summary Generated", { type: "success", description: "Your content has been successfully summarized." });
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Summarize Content</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('text')} style={[styles.tab, activeTab === 'text' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'text' && styles.activeTabText]}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('video')} style={[styles.tab, activeTab === 'video' && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>Video</Text>
        </TouchableOpacity>
      </View>

      {/* Input Area */}
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{activeTab === 'text' ? 'Summarize Text' : 'Summarize Video'}</Text>
          <Text style={styles.cardDescription}>{activeTab === 'text' ? 'Enter text to summarize.' : 'Enter video URL to summarize.'}</Text>
        </View>
        <View style={styles.cardContent}>
          <TextInput
            style={styles.textArea}
            placeholder={activeTab === 'text' ? "Enter your text here..." : "Enter video URL..."}
            value={inputContent}
            onChangeText={setInputContent}
            multiline={activeTab === 'text'}
          />
        </View>
        <TouchableOpacity onPress={handleSummarization} disabled={isLoading || !inputContent} style={[styles.button, isLoading || !inputContent ? styles.buttonDisabled : null]}>
          {isLoading ? (
            <>
              <ActivityIndicator size="small" color="#fff" style={styles.loader} />
              <Text style={styles.buttonText}>Summarizing...</Text>
            </>
          ) : (
            <Text style={styles.buttonText}>{activeTab === 'text' ? 'Summarize Text' : 'Summarize Video'}</Text>
          )}
        </TouchableOpacity>
      </Card>

      {/* Summary Result */}
      {summary ? (
        <Card style={styles.summaryCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Summary</Text>
            <Text style={styles.cardDescription}>Your generated summary is below.</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        </Card>
      ) : null}
    </ScrollView>
  );
}
