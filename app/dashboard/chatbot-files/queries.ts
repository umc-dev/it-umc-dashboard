import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getChatbotFiles,
  uploadChatbotFile,
  deleteChatbotFile,
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
