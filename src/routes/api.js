import express from "express";
import { runRAGChain } from "../chains/ragChain.js";

const router = express.Router();

router.post('/chat', async (req, res) => {
  const { question } = req.body;

  try {
    const answer = await runRAGChain(question);
    res.json({
      choices: [{
        message: {
          content: answer
        }
      }]
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Error al procesar la consulta"});
  }

});

export default router;