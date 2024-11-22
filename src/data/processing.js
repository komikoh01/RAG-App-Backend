import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from 'path';

export async function loadProcessData () {
    const filePath = path.join('public', 'METODOLOGIA_AUP_UCI.pdf');
    const loader = new PDFLoader(filePath)
    const documents = await loader.load()

    const textSplitter = new RecursiveCharacterTextSplitter ({
        chunkSize: 300,
        chunkOverlap: 50 
    })
    const splits = await textSplitter.splitDocuments(documents)
    console.log("Esto funciona>>>>>>>??????? ....", splits)

    return splits
}   