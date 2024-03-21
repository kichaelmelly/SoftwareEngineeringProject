import time
import torch
from nltk.tokenize import sent_tokenize
from transformers import T5ForConditionalGeneration, T5Tokenizer


class BooleanQuestions:
    """Wrapper class for generating T/F questions with T5"""

    def __init__(
        self, model_name="ramsrigouthamg/t5_boolean_questions", tokenizer_name="t5-base"
    ):
        self.model_name = model_name
        self.device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
        self.tokenizer = T5Tokenizer.from_pretrained(tokenizer_name)
        self.model = T5ForConditionalGeneration.from_pretrained(model_name)

        # Ensure all tensors are on the same device
        self.model = self.model.to(self.device)

    def _encode(self, text, ans=True):
        text = "truefalse: %s txt: %s" % (ans, text)
        encoding = self.tokenizer(text, return_tensors="pt").to(self.device)
        return encoding

    def _get_questions(self, text):
        #! TODO: Add support for dynamic number of questions
        # num_questions = int(len(sent_tokenize(text)) / 2)
        num_questions = 3
        encoding = self._encode(text)
        que_tokens = self.model.generate(
            **encoding,
            max_length=256,
            num_beams=10,
            num_return_sequences=num_questions,
            no_repeat_ngram_size=2,
            early_stopping=True
        )

        questions = [
            self.tokenizer.decode(
                token, skip_special_tokens=True, clean_up_tokenization_spaces=True
            )
            for token in que_tokens
        ]
        return questions

    def generate(self, text):
        boolean = self._get_questions(text)
        return boolean


def gen_bool(text):
    BOOL = BooleanQuestions()
    questions = BOOL.generate(text)
    return questions