import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';

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


  const handleShare = () => {
    toast.show("Sharing Summary", { type: "info", description: "Your summary is being shared." });
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

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#000000',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#777',
  },
  cardContent: {
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    margin:10
  },
  loader: {
    marginRight: 5,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
