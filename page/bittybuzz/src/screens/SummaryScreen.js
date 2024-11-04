import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import SummaryScreenStyles from '../styles/SummaryScreenStyles';

export default function SummaryScreen() {
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');

  const handleTextSummarization = () => {
    // fetch('your-backend-api', { method: 'POST', body: JSON.stringify({ input: inputContent }) })
    //   .then(response => response.json())
    //   .then(data => setSummary(data.summary))
    //   .catch(error => console.error('Error:', error));

    setSummary(`Summarized text for: ${inputContent}`);
  };

  return (
    <ScrollView style={SummaryScreenStyles.container}>
      <Text style={SummaryScreenStyles.header}>Text and Video Summarization</Text>
      <View style={SummaryScreenStyles.inputContainer}>
        <TextInput
          placeholder="Enter TEXT or VIDEO content"
          style={SummaryScreenStyles.input}
          onChangeText={setInputContent}
          value={inputContent}
        />
        <Button title="Summarize" onPress={handleTextSummarization} />
      </View>
      <View style={SummaryScreenStyles.outputContainer}>
        {summary ? (
          <Text style={SummaryScreenStyles.summaryText}>{summary}</Text>
        ) : (
          <Text style={SummaryScreenStyles.placeholderText}>Summary will appear here...</Text>
        )}
      </View>
    </ScrollView>
  );
}
