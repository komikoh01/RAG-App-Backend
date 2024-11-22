import { config } from "./config/config.js";
import express from "express";
import apiRoutes from "./routes/api.js";
import path from 'path';
import cors from 'cors'

const app = express();

app.use(cors()); 
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use("/api", apiRoutes);

const PORT = config.port || 3000 ;
app.listen(PORT, () => {
  console.log(`App ejecutandose en https://localhost:${PORT}`);
}); 