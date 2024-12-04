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
import { launchImageLibrary } from 'react-native-image-picker';
import { useToast } from 'react-native-toast-notifications';
import styles from '../styles/SummaryScreenStyles';

export default function SummaryScreen() {
  const [isPremium, setIsPremium] = useState(false); // 프리미엄 활성화 상태
  const [inputContent, setInputContent] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');
  const [selectedImage, setSelectedImage] = useState(null);
  const toast = useToast();

  const handleSummarization = async () => {
    if (!isPremium) {
      toast.show('This feature is available for premium users only.', {
        type: 'warning',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      let generatedSummary = '';

      switch (activeTab) {
        case 'text':
          generatedSummary =
            '목요일(5일)은 전국이 가끔 구름 많다가 중부지방과 전북은 밤부터 흐려지며 일부 지역에 비 또는 눈이 내릴 전망이다. 예상 강수량은 대부분 지역에서 5㎜ 안팎, 적설량은 강원 영서 남부·제주도 산지에서 1∼3㎝로 예측된다. 아침 최저기온은 -5∼6도, 낮 최고기온은 5∼12도로 춥겠고, 미세먼지 농도는 \'좋음\'∼\'보통\' 수준이다. 바다 물결은 동해 최대 4.0m로 높게 일 것으로 보인다.';
          break;
        case 'image':
          generatedSummary =
            '전북 현대 김두현 감독이 위염으로 입원 후 퇴원했다. 전북은 올 시즌 부진으로 10위로 마감하며 승강 플레이오프에 진출, K리그2 서울 이랜드와 경합 중이다. 1차전 원정에서 2-1로 승리했으나 2차전에서 패하면 창단 첫 강등 위기에 처한다.';
          break;
        case 'video':
          generatedSummary =
            '동영상은 로봇 기술을 이용해 암환자의 머리를 기증자 몸에 이식하는 시뮬레이션 과정을 다룬 내용이다. 이는 의료계와 대중에게 큰 충격을 주며 현실성과 윤리적 논란을 불러일으켰다. 해당 기술의 가능성과 문제점에 대한 의견이 다양하게 제기되고 있다.';
          break;
        default:
          generatedSummary = 'No summary available.';
      }

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
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.didCancel) {
          toast.show('Image selection canceled', { type: 'warning' });
        } else if (response.errorMessage) {
          toast.show(`Error: ${response.errorMessage}`, { type: 'danger' });
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          setSelectedImage(uri);
          toast.show('Image uploaded successfully', { type: 'success' });
        }
      }
    );
  };

  const togglePremium = () => {
    setIsPremium(!isPremium);
    toast.show(
      isPremium ? 'Premium Disabled' : 'Premium Enabled',
      { type: isPremium ? 'warning' : 'success' }
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/sumback.png')}
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Get the news at a glance!</Text>
        </View>

        <TouchableOpacity
          style={[styles.premiumButton, isPremium && styles.premiumActive]}
          onPress={togglePremium}
        >
          <Text style={styles.premiumButtonText}>
            {isPremium ? 'Disable Premium' : 'Enable Premium'}
          </Text>
        </TouchableOpacity>

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

        <TouchableOpacity
          style={[
            styles.actionButton,
            (!inputContent && activeTab !== 'image' && styles.disabledButton) ||
              (!isPremium && styles.disabledButton),
          ]}
          onPress={handleSummarization}
          disabled={
            (!inputContent && activeTab !== 'image') || isLoading || !isPremium
          }
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
