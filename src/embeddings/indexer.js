import axios from "axios";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { loadProcessData } from "../data/processing.js";
import { config } from "../config/config.js";

export async function createEmbeddings() {
  const docs = await loadProcessData();

  async function getEmbeddings(texts) {
    try {
      const response = await axios.post(
        `${config.apiURL}${config.embeddingsEndpoint}`,
        { input: String(texts) },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data && response.data.data) {
        return response.data.data.map(item => item.embedding);
      } else {
        console.log("Respuesta completa:", response.data);
        throw new Error("Estructura inesperada en la respuesta de embeddings");
      }
    } catch (error) {
      console.error("Error al obtener embeddings:", error.message);
      throw error;
    }
  }

  const vectorStore = await MemoryVectorStore.fromDocuments(
    docs,
    {
      embedDocuments: async (texts) => {
        const embeddings = await Promise.all(texts.map(text => getEmbeddings([text])));
        return embeddings.flat();
      },
      embedQuery: async (text) => {
        const embedding = await getEmbeddings([text]);
        return embedding[0];
      }
    }
  );

  return vectorStore;
}
