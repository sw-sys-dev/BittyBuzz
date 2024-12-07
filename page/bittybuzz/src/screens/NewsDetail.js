import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NewsDetailStyles';

export default function NewsDetail({ route }) {
  const { title, image, category = '기타', pubDate, content } = route.params; // 기본값 설정
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  // 하드코딩된 요약 및 관련 기사 데이터
  const hardcodedSummaries = {
    정치: '홍준표 대구시장은 2022년 대구시장 경선 당시 명태균에게 여론조사를 의뢰한 의혹을 부인하며, 폭로한 강혜경을 고소하겠다고 밝혔다.',
    스포츠: '손흥민의 토트넘은 FA컵 3라운드에서 5부 리그 팀 탬워스를 상대로 경기를 앞두고 있으며, 우승 가능성을 노리고 있다.',
    금융: '요약 정보를 불러올 수 없습니다. 카테고리를 선택해주세요.',
  };

  // 크롤링된 뉴스 본문 추가
  const otherNews = [
    {
      title: "탄핵 부결돼도 “尹, 통치능력 상실”…민주당 “될때까지 탄핵 추진”",
      content:
        "윤석열 대통령에 대한 탄핵소추안이 국회에서 부결될 것으로 보인다. 앞서 윤 대통령에 대한 탄핵안을 '통과될 때까지' 추진하겠다고 밝힌 민주당은 매주 탄핵안 표결에 나설 것으로 보인다. 이재명 민주당 대표 역시 '(탄핵안이 가결) 될 때까지 반복적으로 추진할 것'이라고 윤 대통령 탄핵에 대한 강한 의지를 보였다.",
      pubDate: "2024-12-07",
      imageUrl: require('../assets/images/scroll3.png'),
    },
    {
      title: "안철수 '국힘 의원들, 당론 있어도 소신에 따라 투표권 행사해야'",
      content:
        "국민의힘 의원들이 7일 오후 국회 본회의장에서 세 번째 발의된 김건희 특검법 표결을 마친 뒤 윤석열 대통령 탄핵안에는 표결하지 않겠다며 퇴장했다. 국민의힘 의원 중에서 유일하게 남은 안철수 의원은 표결에 불참한 국민의힘 의원들을 향해 '당론이 있다고 하더라도 자신의 소신에 따라 투표권을 행사해야 한다'고 말했다.",
      pubDate: "2024-12-07",
      imageUrl: require('../assets/images/scroll2.png'),
    },
    {
      title: "‘삿대질→투표→퇴장→호소→재입장’…탄핵 표결 ‘스톱’된 본회의장",
      content:
        "윤석열 대통령 탄핵소추안 표결이 이뤄진 7일 국회는 분초를 다투는 초긴장과 긴박함으로 가득했다. 윤 대통령의 대국민 사과 담화부터 본회의 표결이 이뤄지기까지 국회는 하루종일 롤러코스터를 탄 듯 어지러운 상황의 연속이었다. 이날 오후 5시 본회의 개의가 다가오면서 긴장감은 최고조에 달했다. 본회의 시작 전 진보당 의원 3명이 단상 앞에 나와 여당 의원들을 향해 “탄핵 부결은 내란 공범”이라는 손팻말을 들었다. 이 과정에서 여야가 서로를 향해 고성과 삿대질을 주고 받으며 신경전을 벌였다.첫번째 안건으로 상정된 ‘김건희 여사 특검법’ 재의표결 과정에서 여야 공방전이 더욱 거칠어졌다. 여당 의원들은 김 여사 특검법 재표결을 마친 뒤 곧장 본회의장 옆문을 통해 퇴장했다. 김 여사 특검법 표결에만 참여한 뒤 윤 대통령 탄핵안 표결에는 불참하자는 당론에 따른 행동이었다. 퇴장하는 여당 의원들은 고개를 푹 숙이거나 얼굴을 가린 채 본회의장을 빠르게 빠져나갔다.",
      pubDate: "2024-12-07",
      imageUrl: require('../assets/images/scroll1.png'),
    },
  ];
  const hardcodedArticles = {
    정치: [
      {
        title: '홍준표 “명태균·강혜경은 여론조작 사기꾼…고소할 수밖에”',
        imageUrl: require('../assets/images/rel_1.jpg'),
        category: '정치',
        pubDate: '2024-12-01',
        content: '관련 뉴스 1의 본문 내용입니다.',
      },
      {
        title: '최태원·홍준표 만난 이유',
        imageUrl: require('../assets/images/rel_2.jpg'),
        category: '정치',
        pubDate: '2024-12-01',
        content: '관련 뉴스 1의 본문 내용입니다.',
      },
      {
        title: '홍준표 "날 실컷 털어봐라 나오나…걱정 마시라, 사기꾼 공작에 안 당한다"',
        imageUrl: require('../assets/images/rel_3.jpg'),
        category: '정치',
        pubDate: '2024-12-01',
        content: '관련 뉴스 1의 본문 내용입니다.',
      },
      {
        title: '민주 “국회 특활비, 홍준표 때문에 이미 90% 삭감했다”',
        imageUrl: require('../assets/images/rel_4.jpg'),
        category: '정치',
        pubDate: '2024-12-01',
        content: '관련 뉴스 1의 본문 내용입니다.',
      },
      {
        title: '홍준표 “날 공격하면 열배 반격…한때 대한민국 최고 저격수”',
        imageUrl: require('../assets/images/rel_5.jpg'),
        category: '정치',
        pubDate: '2024-12-01',
        content: '관련 뉴스 1의 본문 내용입니다.',
      },

    ],
    스포츠: [
      {
        title: '\'손흥민, 우승 한번 해보자!\' 다시 FC바르셀로나가 부른다…"제2의 메시 방출해 손흥민 주급 마련"',
        imageUrl: require('../assets/images/sport_rel1.jpg'),
        category: '스포츠',
        pubDate: '2024-12-01',
        content: '토트넘 홋스퍼의 손흥민이 다시 한번 FC바르셀로나와 연결됐다. 바르셀로나는 기존 전력 외 자원들을 일부 처리해 자금을 확보한 뒤, 손흥민을 영입할 것이라는 내용이다. 바르셀로나는 다시 한번 손흥민 영입에 뛰어들 준비를 마쳤으며, 손흥민 영입을 위한 방출 자원들의 이름도 구체적으로 공개됐다. 주인공은 안수 파티와 페란 토레스였다.\n\n스페인 매체 ‘엘골디히탈’은 3일(한국시간) “바르셀로나는 손흥민 영입을 위해 파티와 토레스를 매각할 예정이다. 바르셀로나는 두 선수를 방출해 손흥민의 높은 주급을 충당할 것이다”라고 설명했다.\n\n손흥민의 거취는 최근 많은 주목을 받고 있다. 손흥민은 이번 시즌이 끝난 후 내년 여름, 현소속팀인 토트넘과 계약이 만료된다. 자연스레 손흥민이 자유계약(FA) 대상자가 될 확룰이 높아졌다.\n\n그럼에도 토트넘은 미온적인 태도로 일관하고 있다. 팀 내 최고 에이스인 손흥민을 적극적으로 붙잡을 생각이 없어 보인다. 현지 매체들에 따르면, 토트넘은 장기 재계약을 제안하는 대신 손흥민의 현 계약 내에 포함된 1년 연장 옵션 조항을 발동시킬 예정인 것으로 알려졌다.\n\n토트넘이 이러한 선택을 한 이유는 바로 손흥민의 나이다. 1992년생의 손흥민은 언제 경기력이 떨어져도 이상하지 않다. 그렇기에 토트넘은 경기력이 떨어질 위험이 있는 선수에게 위험 부담을 안고 장기 재계약을 제안하는 대신 1년 연장 옵션을 선택했다. 만약 장기 재계약을 체결했는데, 손흥민의 경기력이 떨어진다면 토트넘 입장에선 낭패다. 경기력이 떨어진 선수에게 남은 계약 기간 동안 꾸준히 높은 연봉을 지급해야 하기 때문이다.\n\n그렇기에 토트넘의 1년 연장 옵션 발동은 1년 동안 손흥민의 경기력을 지켜보겠다는 의도가 담겨 있다. 구단의 수익을 최우선으로 생각하는 것이다. 구단 입장에서는 어느 정도 납득이 가능한 대목이다.\n\n하지만 그 대상이 손흥민이라면 이야기가 달라진다. 손흥민은 2015년 바이어 04 레버쿠젠을 떠나 토트넘에 입단한 이후 줄곧 토트넘에 헌신해 왔다. 그는 토트넘 통산 165골을 넣으며 이미 구단 역사의 한 자리를 차지했다. 2018-19시즌에는 팀을 이끌고 유럽축구연맹 챔피언스리그(UCL) 결승에 올랐으며, 2020년에는 한 해 동안 가장 멋진 골을 넣은 선수에게 주는 국제축구연맹(FIFA) 푸스카스상도 받았다. 이어 2021-22시즌에는 모하메드 살라(리버풀)와 함께 프리미어리그 공동 득점왕을 차지했다.\n\n하지만 그 대상이 손흥민이라면 이야기가 달라진다. 손흥민은 2015년 바이어 04 레버쿠젠을 떠나 토트넘에 입단한 이후 줄곧 토트넘에 헌신해 왔다. 그는 토트넘 통산 165골을 넣으며 이미 구단 역사의 한 자리를 차지했다. 2018-19시즌에는 팀을 이끌고 유럽축구연맹 챔피언스리그(UCL) 결승에 올랐으며, 2020년에는 한 해 동안 가장 멋진 골을 넣은 선수에게 주는 국제축구연맹(FIFA) 푸스카스상도 받았다. 이어 2021-22시즌에는 모하메드 살라(리버풀)와 함께 프리미어리그 공동 득점왕을 차지했다.\n\n이처럼 손흥민은 토트넘을 위한 꾸준한 활약과 엄청난 헌신을 선보였다. 이에 따라 축구 팬들은 손흥민에게 장기 재계약이라는 걸맞은 대우를 해야 한다고 주장한다. 하지만 토트넘은 현재까지 그럴 생각이 없어 보인다.\n\n그러던 중, 지난 10월 바르셀로나 이적설이 등장했다. 하지만 당시 이적설은 구체적이지 않은 루머에 불과했고, 바르셀로나 이적설은 사그라들었다. 이어 영국 매체 ‘트리뷰나’는 “바르셀로나는 손흥민과 살라의 영입 대신 젊은 재능을 선호하기로 했다”라고 전했다. 올해 32세인 손흥민의 나이가 영입 정책과 맞지 않다고 설명했다.\n\n하지만 다음날 ‘엘골디히탈’이 “바르셀로나는 손흥민을 영입하기 위해 파티와 토레스를 방출할 계회을 세웠다”라고 설명했다.',
      },
      {
        title: '히샬리송 이어 또 에버튼?…토트넘, 손흥민 파트너 이번엔 제대로 영입할까',
        imageUrl: require('../assets/images/sport_rel2.jpg'),
        category: '스포츠',
        pubDate: '2024-12-01',
        content: '황희찬의 울버햄턴은 브리스톨 시티와 경기를 펼친다.',
      },
      {
        title: '손흥민, 무관 깰까…토트넘, FA컵 3라운드서 5부 탬워스와 격돌',
        imageUrl: require('../assets/images/sport_rel3.jpg'),
        category: '스포츠',
        pubDate: '2024-12-01',
        content: '황희찬의 울버햄턴은 브리스톨 시티와 경기를 펼친다.',
      },
      {
        title: '살인 태클까지 당한 손흥민, 평점 바닥..."좋은 기회 놓쳐"',
        imageUrl: require('../assets/images/sport_rel4.jpg'),
        category: '스포츠',
        pubDate: '2024-12-01',
        content: '황희찬의 울버햄턴은 브리스톨 시티와 경기를 펼친다.',
      },
      {
        title: '득점 기회 연달아 놓친 손흥민…토트넘은 풀럼과 1-1 무승부',
        imageUrl: require('../assets/images/sport_rel5.jpg'),
        category: '스포츠',
        pubDate: '2024-12-01',
        content: '황희찬의 울버햄턴은 브리스톨 시티와 경기를 펼친다.',
      },
    ],
    금융: [], // 기본값: 관련 기사 없음
  };

  useEffect(() => {
    // 선택된 카테고리에 맞는 관련 기사를 설정
    setRelatedArticles(hardcodedArticles[category] || hardcodedArticles['기타']);
  }, [category]);

  // 뉴스 요약 기능
  const handleSummarize = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const summarizedContent = hardcodedSummaries[category] || hardcodedSummaries['기타'];
      setSummary(summarizedContent);
      Alert.alert('뉴스 요약', summarizedContent);
    }, 3000);
  };
  
  const handleVote = (option) => {
    setSelectedOption(option);
    Alert.alert('투표 완료', `선택한 옵션: "${option}"`);
  };

  const shouldShowVoteSection = content && content.includes('홍준표');
  const renderOtherNews = () => {
    return otherNews.map((news, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.push('NewsDetail', news)}
        style={styles.shortStyleCard}
      >
        <Image source={news.imageUrl} style={styles.image} />
        <Text style={styles.relatedTitleText}>{news.title}</Text>
        <Text style={styles.relatedDescription}>
          {news.content.slice(0, 100)}...
        </Text>
        <Text style={styles.date}>
          {new Date(news.pubDate).toLocaleDateString()}
        </Text>
      </TouchableOpacity>
    ));
  };
  return (
    <ScrollView style={styles.container}>
      {/* 메인 뉴스 */}
      <Image
        source={image || require('../assets/images/instead.jpg')} // 기본 이미지 처리
        style={styles.image}
      />
      <View style={styles.metaContainer}>
        <Text style={styles.category}>{category || '기타'}</Text>
        <Text style={styles.date}>{pubDate ? new Date(pubDate).toLocaleDateString() : '날짜 없음'}</Text>
      </View>
      <Text style={styles.title}>{title || '제목 없음'}</Text>
      <Text style={styles.content}>{content || '본문을 불러올 수 없습니다.'}</Text>

      {/* 투표 섹션: "홍준표" 키워드가 포함된 경우에만 표시 */}
      {shouldShowVoteSection && (
        <View style={styles.voteContainer}>
          <Text style={styles.voteTitle}>홍준표 대구시장 관련 여론조작 의혹에 대한 입장</Text>
          <View style={styles.optionsContainer}>
            {[
              '강혜경 씨의 폭로는 공익을 위한 것으로 봐야 한다.',
              '명태균과 강혜경 씨 모두 여론조작 공범으로 조사해야 한다.',
              '홍준표 시장의 주장이 신뢰할 수 있다.',
              '폭로자의 주장이 더 신뢰할 만하다.',
              '잘 모르겠다.',
            ].map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOptionButton,
                ]}
                onPress={() => handleVote(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* 요약 버튼 */}
      <TouchableOpacity style={styles.summarizeButton} onPress={handleSummarize}>
        <Text style={styles.summarizeButtonText}>뉴스 요약하기</Text>
      </TouchableOpacity>

      {/* 로딩 화면 */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {/* 구분선 */}
      <View style={styles.separator} />

      {/* 관련 기사 */}
      <Text style={styles.relatedTitle}>관련 기사</Text>
      {relatedArticles.length > 0 ? (
        <View style={styles.relatedContainer}>
          {relatedArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={styles.relatedCard}
              onPress={() =>
                navigation.push('NewsDetail', {
                  title: article.title,
                  image: article.imageUrl,
                  category: article.category,
                  pubDate: article.pubDate,
                  content: article.content,
                })
              }
            >
              <Image source={article.imageUrl} style={styles.relatedImage} />
              <Text style={styles.relatedTitleText}>{article.title || '제목 없음'}</Text>
            </TouchableOpacity>
          ))}
          
        </View>
      ) : (
        <Text style={styles.noRelatedText}>관련 기사를 찾을 수 없습니다.</Text>
        
      )}
            {/* Other News Section */}
            <View>
        <Text style={styles.relatedTitle}>다른 뉴스 보기</Text>
        {renderOtherNews()}
      </View>
    </ScrollView>
  );
}
