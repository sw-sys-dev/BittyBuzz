import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Clipboard } from 'react-native';
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

  const handleCopy = () => {
    Clipboard.setString(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.show("Copied to Clipboard", { type: "success", description: "The summary has been copied to your clipboard." });
  };

  const handleShare = () => {
    toast.show("Sharing Summary", { type: "info", description: "Your summary is being shared." });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Text and Video Summarization</Text>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setActiveTab('text')} style={[styles.tab, activeTab === 'text' && styles.activeTab]}>
          <Text style={styles.tabText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('video')} style={[styles.tab, activeTab === 'video' && styles.activeTab]}>
          <Text style={styles.tabText}>Video</Text>
        </TouchableOpacity>
      </View>

      {/* Input Area */}
      <Card style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{activeTab === 'text' ? 'Summarize Text' : 'Summarize Video'}</Text>
          <Text style={styles.cardDescription}>{activeTab === 'text' ? 'Enter your text below to get a concise summary.' : 'Enter a video URL to get a concise summary.'}</Text>
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
        <TouchableOpacity onPress={handleSummarization} disabled={isLoading || !inputContent} style={styles.button}>
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
            <Text style={styles.cardDescription}>Your generated summary appears here.</Text>
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
          <View style={styles.summaryActions}>
            <TouchableOpacity onPress={handleCopy} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>{copied ? 'Copied!' : 'Copy'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShare} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Share Summary</Text>
            </TouchableOpacity>
          </View>
        </Card>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  activeTab: {
    borderBottomColor: '#4a90e2',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    width: '100%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
  cardContent: {
    marginBottom: 10,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loader: {
    marginRight: 5,
  },
  summaryCard: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 10,
  },
  summaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
  actionButtonText: {
    color: '#333',
  },
});
