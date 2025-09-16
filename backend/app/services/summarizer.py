from typing import List

from sumy.nlp.tokenizers import Tokenizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.summarizers.lex_rank import LexRankSummarizer


def summarize_text(text: str, max_sentences: int = 4) -> str:
    if not text:
        return ""
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LexRankSummarizer()
    sentences = summarizer(parser.document, max_sentences)
    return " ".join(str(s) for s in sentences)


