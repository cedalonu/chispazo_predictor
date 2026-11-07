var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
async function startServer() {
  const app = (0, import_express.default)();
  app.use(import_express.default.json());
  const vite = await (0, import_vite.createServer)({
    server: { middlewareMode: true },
    appType: "spa"
  });
  app.use(vite.middlewares);
  app.post("/api/gemini", async (req, res) => {
    try {
      const { prompt } = req.body;
      const ai = new import_genai.GoogleGenAI();
      const systemContext = `Eres el Asistente IA Especializado en Chispazo (Loter\xEDa de 5 n\xFAmeros entre 28). Analizas los \xFAltimos 20 sorteos hist\xF3ricos y ayudas al usuario a dise\xF1ar algoritmos, recetas de consenso multiescala, y evaluar escenarios customizados (pools, pool sizes, frecuencias F0 a F7). Responde en espa\xF1ol de forma experta, t\xE9cnica y estructurada.`;
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `${systemContext}

Pregunta del usuario: ${prompt}`
      });
      res.json({ text: response.text || "No se pudo generar respuesta." });
    } catch (err) {
      console.error("Gemini API error:", err);
      res.status(500).json({ error: err.message || "Error communicating with Gemini" });
    }
  });
  const PORT = 3e3;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
