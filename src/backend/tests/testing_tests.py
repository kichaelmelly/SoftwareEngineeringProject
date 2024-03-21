from abstractive_summariser import gen_abstractive_summariser
from answer_generator import ans_gen
from question_generator import quest_gen
from nltk.tokenize import sent_tokenize

text = '''
VMware has a number of virtualization products. VMware Workstation Player is free x64 virtualization software available 
for non-commercial use. The company underlines that the free version is for students and educators. If you want to use 
the Player for commercial use, you need to pay for the Workstation Player commercial license.

It is used for managing and creating virtual machines but works best when running a single VM. You can install the free 
virtualization software if you have a Linux or Windows OS host.

If you need virtualization software with more features and larger-scale projects, you can check out Workstation Pro.
'''


def test_sum():
    assert str(gen_abstractive_summariser(text))


def test_sum_len():
    assert len(sent_tokenize(gen_abstractive_summariser(text))) < 3


def test_sum_len_1():
    assert len(sent_tokenize(gen_abstractive_summariser(text))) > 0


def test_quest():
    assert str(quest_gen(text))


def test_quest_len():
    assert len(sent_tokenize(quest_gen(text))) == 1


def test_ans():
    assert str(ans_gen(quest_gen(text), text))


def test_ans_len():
    assert len(sent_tokenize(ans_gen(quest_gen(text), text)))
