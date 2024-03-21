from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize


class Extractive:
    """Class that implements Extractive summarisation."""

    def __init__(self, input_text: str):
        self.text = input_text
        self.words = word_tokenize(input_text)
        self.sentences = sent_tokenize(input_text)
        self.freq = dict()
        self.sentence_values = dict()

    def word_process(self):
        """
        Takes all `self.words` and returns a dictionary of words and their frequencies
        ### Returns
            `frequencies: dict`: A dictionary of words and their frequencies.
        """
        frequencies = self.freq
        stop_word = set(stopwords.words("english"))
        for word in self.words:
            word = word.lower()
            if word in stop_word:
                continue
            if word in frequencies:
                frequencies[word] += 1
            else:
                frequencies[word] = 1
        return frequencies

    def sent_process(self):
        """
        It takes the sentence values and word frequency and adds them together.
        :return: A dictionary of sentences and their frequency.
        """
        sent_values = self.sentence_values
        word_freq = self.word_process()
        for sentence in self.sentences:
            for word, frq in word_freq.items():
                if word in sentence.lower():
                    if sentence in sent_values:
                        sent_values[sentence] += frq
                    else:
                        sent_values[sentence] = frq
        return sent_values

    def avg(self):
        sum_value = 0
        sent_val = self.sent_process()
        for value in sent_val:
            sum_value += sent_val[value]
        return int(sum_value / len(sent_val))

    def generate(self) -> str:
        """
        Takes all sentences that are above the average and returns them as a string.
        ### Returns
        `sum_it: str`: A string of sentences that are above the average (i.e. the summary)
        """
        sum_it = ""
        sent_val = self.sent_process()
        average = self.avg()
        for sentence in self.sentences:
            if (sentence in sent_val) and (sent_val[sentence] > 1.2 * average):
                sum_it += " " + sentence
        return sum_it


def extractive_summarisation(text_input: str):
    """
    Function that generates an extractive summary of an input text.

    ### Parameters
        `text_input: str`: The text to be summarised.

    ### Returns
        `output: str`: The generated summary.
    """
    summarise = Extractive(text_input)
    output = summarise.generate()
    return output
