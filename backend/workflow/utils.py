from langchain_openai import ChatOpenAI
from config import settings


def get_llm(label, model, temperature):
    if label == "OpenAI":
        return ChatOpenAI(model=model if model else 'gpt-3.5-turbo', temperature=temperature, openai_api_key=settings.OPENAI_API_KEY)
    else:
        raise ValueError(f"Unsupported LLM provider: {label}")
    
