import torch
from transformers import PreTrainedTokenizerFast
from transformers import BartForConditionalGeneration

tokenizer = PreTrainedTokenizerFast.from_pretrained('digit82/kobart-summarization')
model = BartForConditionalGeneration.from_pretrained('digit82/kobart-summarization')

f = open('/workspace/faster-whisper/result.txt', 'r')
text = f.read()


print(len(text))
print("## 뉴스 원문")
print(text)

if text:
    text = text.replace('\n', '')
    print("## KoBART 요약 결과")
    print()
    
    input_ids = tokenizer.encode(text)
    input_ids = torch.tensor(input_ids)
    input_ids = input_ids.unsqueeze(0)
    output = model.generate(input_ids, eos_token_id=1, max_length=5000, num_beams=5)
    output = tokenizer.decode(output[0], skip_special_tokens=True)

    print(output)


