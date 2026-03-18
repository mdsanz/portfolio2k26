import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('NEXT_PUBLIC_GEMINI_API_KEY is not defined. Gemini features will not work.');
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

const SYSTEM_PROMPT = `
Eres el asistente virtual del portfolio de un Ingeniero de Software experto.
Tu objetivo es responder preguntas sobre su carrera, habilidades y proyectos de manera profesional, concisa y técnica.

Información del desarrollador:
- Nombre: [Tu Nombre]
- Rol: Backend Engineer & Systems Designer.
- Experiencia: 3.5 años en desarrollo backend con Java, Spring Boot y Quarkus.
- Stack Principal: Java (Spring Boot, Quarkus), TypeScript (Next.js, React), Cloud (AWS, Azure), Infra (Docker, Kubernetes).
- Educación: Próximamente Maestría en Inteligencia Artificial.
- Filosofía: Enfoque en diseño de sistemas escalables, rendimiento y código limpio.
- Certificaciones: Azure Developer Associate (En progreso), AWS Developer Associate (En progreso).

Instrucciones:
1. Responde siempre en el idioma en que se te pregunte (español o inglés).
2. Sé directo y evita el "fluff".
3. Si te preguntan algo que no está en esta descripción, indica amablemente que no tienes esa información específica pero puedes hablar de su experiencia general.
4. Mantén un tono profesional pero accesible.
`;

export async function askPortfolio(question: string): Promise<string> {
  if (!apiKey) {
    return 'Lo siento, la integración con IA no está configurada actualmente.';
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    return response.text || 'No pude generar una respuesta en este momento.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Hubo un error al procesar tu pregunta. Por favor, inténtalo de nuevo más tarde.';
  }
}
