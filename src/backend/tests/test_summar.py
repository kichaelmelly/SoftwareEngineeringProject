import nltk
from nltk.tokenize import sent_tokenize
from dec_sum import extractive_summarisation
text = '''
Thanks to the field of linguistics we know much about the development of the 5,000 plus languages in existence today. 
We can describe their grammar and pronunciation and see how their spoken and written forms have changed over time. 
For example, we understand the origins of the Indo-European group of languages, which includes Norwegian, Hindi and 
English, and can trace them back to tribes in eastern Europe in about 3000 BC.

So, we have mapped out a great deal of the history of language, but there are still areas we know little about. Experts 
are beginning to look to the field of evolutionary biology to find out how the human species developed to be able to use 
language. So far, there are far more questions and half-theories than answers.

People are constantly sizing up one another's behavior, and texting is a primary way in which people begin making 
evaluations about the relationship early on. When you just start seeing someone, their texting habits can be both 
intriguing and baffling at the same time. Here are some common mistakes people make when texting in relationships.

Researchers have discovered that it isn't specifically what you text or how you text your partner that creates 
satisfaction in the relationship. It's your "texting compatibility" that actually predicts relationship satisfaction. 
In other words, when both partners approach texting in the same way, they make for a happier couple.
'''


def test_summary_len():
    assert len(sent_tokenize(extractive_summarisation(text))) <= len(sent_tokenize(text))/2


def test_summary_type():
    assert str(extractive_summarisation(text))
