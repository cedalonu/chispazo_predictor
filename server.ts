import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
    const app = express();
    app.use(express.json());

    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa'
    });

    app.use(vite.middlewares);

    app.post('/api/gemini', async (req, res) => {
        try {
            const { prompt } = req.body;
            const ai = new GoogleGenAI();
            const systemContext = `Eres el Asistente IA Especializado en Chispazo (Lotería de 5 números entre 28). Analizas los últimos 20 sorteos históricos y ayudas al usuario a diseñar algoritmos, recetas de consenso multiescala, y evaluar escenarios customizados (pools, pool sizes, frecuencias F0 a F7). Responde en español de forma experta, técnica y estructurada.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: `${systemContext}\n\nPregunta del usuario: ${prompt}`
            });
            
            res.json({ text: response.text || 'No se pudo generar respuesta.' });
        } catch (err: any) {
            console.error('Gemini API error:', err);
            res.status(500).json({ error: err.message || 'Error communicating with Gemini' });
        }
    });

    const PORT = 3000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
