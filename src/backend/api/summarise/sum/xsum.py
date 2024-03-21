from transformers import PegasusForConditionalGeneration, PegasusTokenizer


class XSUMGenerator:
    """Wrapper class for generating summaries with Pegasus-XSUM"""

    def __init__(self, model_name="google/pegasus-xsum"):
        self.model_name = model_name
        self.tokeniser = PegasusTokenizer.from_pretrained(model_name)
        self.model = PegasusForConditionalGeneration.from_pretrained(model_name)

    def generate(self, text):
        input_ids = self.tokeniser(
            text, truncation=True, padding="longest", return_tensors="pt"
        )
        summary = self.model.generate(**input_ids)
        return self.tokeniser.decode(summary[0])


def xsum_summarisation(text_input: str) -> str:
    """
    Function that generates a single sentence abstractive summary of an input text.

    ### Parameters
        `text_input: str`: The text to be summarised.

    ### Returns
        `output: str`: The generated summary.
    """

    XSUM = XSUMGenerator()
    output = XSUM.generate(text_input)
    return output
