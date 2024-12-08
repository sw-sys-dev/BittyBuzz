# BittyBuzz 🚀

BittyBuzz는 **Naver Search**와 **Google News** API를 활용해 최신 뉴스를 가져오고, AI 모델을 사용하여 뉴스를 요약 및 분석하는 프로젝트입니다. 

## 🔍 주요 기능
- **뉴스 데이터 수집**:  
  - `Naver Search API`와 `Google News API`를 통해 최신 뉴스를 가져옵니다.
- **뉴스 요약**:  
  - AI 모델인 **KoBART-summarization**을 사용해 뉴스 기사를 간결하게 요약합니다.
- **음성 및 이미지 처리**:  
  - **Faster-whisper**를 활용한 오디오 분석 및 텍스트 변환.  
  - **img2text 모델**로 이미지를 텍스트로 변환.

---

## 🛠️ 사용된 기술
| 기술 | 설명 |
|------|------|
| **Naver Search API** | 네이버 검색을 통해 뉴스 데이터를 가져옵니다. |
| **Google News API** | 구글 뉴스를 활용해 다양한 소스를 크롤링합니다. |
| **KoBART-summarization** | 뉴스 기사를 요약하기 위해 AI 모델 사용. |
| **Faster-whisper** | 빠르고 정확한 음성 인식 모델. |
| **img2text** | 이미지에서 텍스트를 추출합니다. |

---

## 🚀 실행 방법

### 1️⃣ 프로젝트 클론
```bash
git clone https://github.com/your-username/bittybuzz.git
cd bittybuzz
2️⃣ 의존성 설치
npm install
3️⃣ 프로젝트 실행
아래 명령어로 Android 환경에서 실행합니다:

cd /page/bittybuzz
npx react-native start android
📂 프로젝트 구조

bittybuzz/
├── /api                # API 관련 코드 (Naver, Google)
├── /models             # AI 모델 관련 코드 (KoBART, Faster-whisper, img2text)
├── /page/bittybuzz     # React Native 프로젝트
├── README.md           # 프로젝트 설명서
└── ...

🧠 주요 AI 모델

1️⃣ KoBART-summarization
한국어 텍스트 요약을 위한 Transformer 기반의 BART 모델.
뉴스를 간결하고 정확하게 요약합니다.
2️⃣ Faster-whisper
음성 인식 속도와 정확성을 갖춘 최신 모델.
뉴스 음성을 텍스트로 변환하여 분석 가능.
3️⃣ img2text
이미지에서 텍스트를 추출하는 OCR(Optical Character Recognition) 모델.
뉴스 이미지를 텍스트 데이터로 변환합니다.

📞 문의

궁금한 점이나 제안사항이 있다면 언제든지 연락주세요!
📧 Email: lju9176@donga.ac.kr
📄 Issue: GitHub Issues

❤️ 감사합니다
