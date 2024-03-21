from transformers import T5ForConditionalGeneration, T5Tokenizer, pipeline


class QuestionGenerator:
    def __init__(self, model_name="allenai/t5-small-squad2-question-generation"):
        self.model_name = model_name
        self.tokeniser = T5Tokenizer.from_pretrained(model_name)
        self.model = T5ForConditionalGeneration.from_pretrained(model_name)

    def generate(self, input_string):
        """Generates a question given an input string."""
        input_ids = self.tokeniser.encode(input_string, return_tensors="pt")
        res = self.model.generate(input_ids)
        output = self.tokeniser.batch_decode(res, skip_special_tokens=True)
        return output[0]


class AnswerGenerator:
    def __init__(self, model_name="deepset/roberta-base-squad2"):
        self.model_name = model_name
        self.nlp = pipeline(
            "question-answering", model=model_name, tokenizer=model_name
        )

    def generate(self, question: str, context: str):
        """Generate an answer given a question and context."""
        qa_input = {"question": question, "context": context}
        res = self.nlp(qa_input)
        return res["answer"]


def gen_question(text, question: str, context: str) -> dict:
    """Generate a question given an input string.

    Returns a dictionary with the question and the answer.
    """
    qg = QuestionGenerator()
    ag = AnswerGenerator()

    res = {"question": qg.generate(text), "answer": ag.generate(question, context)}

    return res
