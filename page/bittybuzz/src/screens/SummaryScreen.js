import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications'; // useToast 임포트
import TcpSocket from 'react-native-tcp-socket'; // TCP 소켓 라이브러리 임포트
import styles from '../styles/SummaryScreenStyles';

export default function SummaryScreen() {
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const toast = useToast(); // useToast 훅 사용

  const handleSummarization = async () => {
    setIsLoading(true);
  
    // TCP 연결 설정
    const client = TcpSocket.createConnection({
      host: '0.tcp.jp.ngrok.io', // ngrok TCP 서버 주소
      port: 13767, // ngrok 포트
    }, () => {
      console.log('Connected to server');
  
      // 서버에 텍스트 전송
      const data = { text: inputContent };
      client.write(JSON.stringify(data)); // JSON 형태로 텍스트 전송
    });
  
    // 서버 응답 처리
    client.on('data', (data) => {
      console.log('Received data from server:', data.toString());
      setSummary(data.toString()); // 서버 응답 요약 결과 설정
      setIsLoading(false);
      client.end(); // 연결 종료
    });
  
    // 오류 처리
    client.on('error', (error) => {
      console.error("TCP Error:", error);
      toast.show("Error Generating Summary", { type: "danger", description: "An error occurred while generating the summary." });
      setIsLoading(false);
    });
  
    client.on('close', () => {
      console.log('Connection closed');
    });
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
