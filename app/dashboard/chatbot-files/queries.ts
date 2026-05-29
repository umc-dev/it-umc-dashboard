import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChatbotFiles,
  uploadChatbotFile,
  deleteChatbotFile,
  getChatbotContext,
  updateChatbotContext,
} from "./api";

// GET ALL CHATBOT FILES
export const useChatbotFiles = () => {
  return useQuery({
    queryKey: ["chatbot-files"],
    queryFn: getChatbotFiles,
  });
};

// UPLOAD CHATBOT FILE
export const useUploadChatbotFile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: uploadChatbotFile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chatbot-files"] });
    },
  });
};

// DELETE CHATBOT FILE
export const useDeleteChatbotFile = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteChatbotFile,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["chatbot-files"] });
    },
  });
};

// GET CHATBOT CONTEXT
export const useChatbotContext = (name: string) => {
  return useQuery({
    queryKey: ["chatbot-context", name],
    queryFn: () => getChatbotContext(name),
  });
};

// UPDATE CHATBOT CONTEXT
export const useUpdateChatbotContext = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ name, context }: { name: string; context: string }) =>
      updateChatbotContext(name, context),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["chatbot-context", variables.name] });
    },
  });
};

