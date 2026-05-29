import { api } from "@/lib/api";
import { ChatbotFile } from "./types";

export const getChatbotFiles = async (): Promise<ChatbotFile[]> => {
  const res = await api.get("/chatbot/files");
  return res.data.data;
};

export const uploadChatbotFile = async (data: FormData): Promise<ChatbotFile> => {
  const res = await api.post("/chatbot/files", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
};

export const deleteChatbotFile = async (id: number): Promise<any> => {
  const res = await api.delete(`/chatbot/files/${id}`);
  return res.data;
};
