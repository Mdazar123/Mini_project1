import os
from dotenv import load_dotenv
import streamlit as st
from langchain_groq import ChatGroq
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import Chroma
from langchain.prompts import ChatPromptTemplate
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

# Load environment variables
load_dotenv()
groq_api_key = os.getenv("GROQ_API_KEY")

# Initialize PDF loader and process documents
def initialize_documents():
    loader = PyPDFLoader('Academic_Regulations_Hand_Book.pdf')
    documents = loader.load()
    
    text_splitter = RecursiveCharacterTextSplitter(
        separators=["\n\n", "\n", ".", "!", "?"],
        chunk_size=1000,
        chunk_overlap=50,
        length_function=len,
        is_separator_regex=False
    )
    return text_splitter.split_documents(documents)

# Initialize embeddings and vector store
def initialize_vectorstore(final_docs):
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    return Chroma.from_documents(
        documents=final_docs,
        embedding=embeddings,
        persist_directory="./rgukt2_db"
    )

# Setup RAG chain
def setup_rag_chain():
    # Initialize embeddings and retriever
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    db = Chroma(persist_directory="./rgukt2_db", embedding_function=embeddings)
    retriever = db.as_retriever()

    # Setup prompt template
    system_prompt = """
    You are an AI assistant for RGUKT (Rajiv Gandhi University of Knowledge Technologies). 
    Provide direct answers without mentioning the handbook or source of information. Your responses should:

    1. Be concise and to the point, without any introductory phrases like 'According to...'
    2. Include specific section numbers or page references in parentheses only when highly relevant
    3. Use clear, factual statements
    4. Use bullet points or numbered lists for clarity when appropriate
    5. Maintain a professional and formal tone

    Context:
    {context}
    """
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        ("human", "{input}"),
    ])

    # Initialize LLM and create chain
    llm = ChatGroq(groq_api_key=groq_api_key, model_name="Mixtral-8x7B-32768")
    question_answer_chain = create_stuff_documents_chain(llm, prompt)
    return create_retrieval_chain(retriever, question_answer_chain)

def main():
    st.title("RguBot")
    
    # Initialize documents and vector store if not already done
    if not os.path.exists("./rgukt2_db"):
        final_docs = initialize_documents()
        vectorstore = initialize_vectorstore(final_docs)
    
    # Setup RAG chain
    rag_chain = setup_rag_chain()
    
    # Get user input
    input_question = st.text_input("What's in your mind?")
    
    # Generate response
    if input_question:
        try:
            response = rag_chain.invoke({"input": input_question})
            st.write(response['answer'])
        except Exception as e:
            st.error(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()

