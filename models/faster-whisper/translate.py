from faster_whisper import WhisperModel
from pytubefix import YouTube
from pytubefix.cli import on_progress
from pydub import AudioSegment
import argparse



# Function to download the YouTube video and extract audio as WAV
def download_youtube_audio_as_wav(video_url, output_path):
    try:
        # Download the video using pytube
        yt = YouTube(video_url)
        video_stream = yt.streams.filter(only_audio=True).first()
        downloaded_file = video_stream.download(output_path=output_path)
        
        # Extract audio and save as WAV using pydub
        audio = AudioSegment.from_file(downloaded_file)
        audio = audio.set_frame_rate(16000)  # Set the sampling rate to 16,000 Hz
        
        audio_output_path = output_path + "/extracted_audio.wav"
        audio.export(audio_output_path, format="wav")
        
        print("Audio extracted and saved to:", audio_output_path)
    except Exception as e:
        print("An error occurred:", e)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--video_url", type=str, help="The URL of the YouTube video")
    parser.add_argument("--output_path", type=str, help="The directory to save the extracted audio")

    args = parser.parse_args()

    video_url = args.video_url # youtube url
    output_path = args.output_path # wav파일 output path
    download_youtube_audio_as_wav(video_url, output_path)

    model_size = "medium"

    # Run on GPU with FP16
    model = WhisperModel(model_size, device="cuda", compute_type="float16")

    segments, info = model.transcribe("/workspace/extracted_audio.wav", beam_size=5, language='ko', task="translate") # only english translate

    print("Detected language '%s' with probability %f" % (info.language, info.language_probability))

    f = open('translate.txt','w')
    for segment in segments:
        f.write(segment.text)