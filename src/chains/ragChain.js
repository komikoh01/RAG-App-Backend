import { retrieveDocuments } from "../embeddings/retriever.js";
import llm from "../models/gemma2.js";
import { addToHistory, getHistory } from "../utils/history.js";

export async function runRAGChain(query) {
    addToHistory("user", query);

    const context = await retrieveDocuments(query);
    const chatHistory = getHistory(); // Ahora es un array

    // Preparar los mensajes para el modelo
    const messages = [
        {
            role: "system",
            content: `You are an advanced AI assistant specialized in the AUP-UCI methodology. 
            Follow these key guidelines:
            1. If the user's query is a general greeting or unrelated to the AUP-UCI methodology, 
               respond with a friendly, generic response.
            2. When the query is related to the document, use the provided context to generate 
               a precise and informative answer.
            3. If the query requires specific domain knowledge from the AUP-UCI document 
               but the context doesn't provide sufficient information, 
               clearly state that you can only answer questions about the AUP-UCI methodology 
               based on the available document.
            4. Keep your answers concise (maximum three sentences).
            5. If the query is too generic or unrelated to the methodology, 
               politely suggest asking a specific question about the AUP-UCI methodology.`,
        },
        {
            role: "user",
            content: `Context Availability Check:
            Context Relevance: ${context.length > 0 ? 'Relevant context available' : 'No specific context found'}
            Context Details: ${context.length > 0 ? context.map(doc => doc.pageContent.slice(0, 100) + '...').join('\n') : 'No context provided'}
            
            Chat History: ${chatHistory}
            
            Current Question: ${query}
            
            Guidance: Determine the most appropriate response based on the query and available context.`,
        },
    ];

    // Llamar al modelo con los mensajes
    const response = await llm({
        messages,
        temperature: 0.7, // Puedes ajustar la temperatura según sea necesario
    });

    // Agregar la respuesta al historial
    addToHistory("assistant", response);

    return response;
}
