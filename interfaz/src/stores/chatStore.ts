import { defineStore } from "pinia";
import axios from "axios";
const BASE_URL = "http://127.0.0.1:8005";
// Definir la interfaz para los mensajes
interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

// Definir el estado de la tienda
interface ChatState {
  messages: ChatMessage[];
  history: { id: number; title: string; content: ChatMessage[] }[];
}

// Crear la tienda
export const useChatStore = defineStore("chatStore", {
  state: (): ChatState => ({
    messages: [
      {
        id: 1,
        role: "assistant",
        content: "¡Hola! ¿En qué puedo ayudarte hoy?",
      },
    ],
    history: [],
  }),
  actions: {
    addMessage(message: Omit<ChatMessage, "id">) {
      // Generar un ID único y agregar el mensaje al estado
      const newMessage: ChatMessage = {
        id: this.messages.length + 1,
        ...message,
      };
      this.messages.push(newMessage);
    },
    async sendMessage(payload: {
      user_id: string;
      prompt: string;
      max_length: number;
      temperature: "baja" | "media" | "alta";
    }) {
      try {
        const response = await axios.post(`${BASE_URL}/chat`, payload);

        // Agregar el mensaje del usuario al estado
        this.addMessage({ role: "user", content: payload.prompt });

        // Procesar la respuesta de la IA
        const aiResponse = response.data.response;

        if (Array.isArray(aiResponse)) {
          const tableMarkdown = generateTableMarkdown(aiResponse);
          this.addMessage({ role: "assistant", content: tableMarkdown });
        } else {
          this.addMessage({ role: "assistant", content: aiResponse });
        }

        // Refrescar el historial desde el backend
        await this.fetchHistory(payload.user_id);
      } catch (error) {
        console.error("Error enviando mensaje:", error);
        alert(
          "Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo."
        );
      }
    },
    async fetchHistory(userId: string) {
      try {
        const response = await axios.get(`${BASE_URL}/history`, {
          params: { user_id: userId },
        });

        if (Array.isArray(response.data)) {
          this.history = response.data.map((item, index) => ({
            id: index + 1,
            title: item.prompt.slice(0, 20) + "...", // Abreviar el título
            content: [
              { role: "user", content: item.prompt },
              { role: "assistant", content: item.response },
            ],
          }));
        } else {
          alert(
            response.data.message || "No se encontró historial para el usuario."
          );
        }
      } catch (error) {
        console.error("Error al obtener el historial:", error);
        alert("No se pudo cargar el historial. Verifica tu conexión.");
      }
    },
  },
});
