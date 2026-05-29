export interface ChatbotFile {
  id: number;
  filename: string;
  filePath: string;
  fileUrl: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatbotFilesResponse {
  success: boolean;
  message: string;
  data: ChatbotFile[];
}

export interface ChatbotFileUploadResponse {
  success: boolean;
  message: string;
  data: ChatbotFile;
}

export interface ChatbotContext {
  id: number;
  name: string;
  context: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatbotContextResponse {
  success: boolean;
  message: string;
  data: ChatbotContext;
}

