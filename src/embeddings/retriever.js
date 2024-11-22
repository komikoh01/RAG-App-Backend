import { createEmbeddings } from "./indexer.js";
import { embeddingCache } from './cache.js';

export async function retrieveDocuments (query) {
    const cachedResult = embeddingCache.get(query);
    if (cachedResult) return cachedResult;

    const vectoreStore = await createEmbeddings();
    const retriever = vectoreStore.asRetriever();
    const retrieverDocs = await retriever.invoke(query);
    console.log('retrieverDocs', retrieverDocs);
    return retrieverDocs;
}
