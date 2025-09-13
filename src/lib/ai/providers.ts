// src/lib/ai/providers.ts

import { createOpenAI } from '@ai-sdk/openai'; // Correct import
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
// We are removing the Vercel Gateway import
// import { gateway } from '@ai-sdk/gateway';
import { isTestEnvironment } from '../constants';

// --- START: MOCK PROVIDER FOR TESTS ---
// This part remains the same
const mockProvider = (() => {
  const {
    artifactModel,
    chatModel,
    reasoningModel,
    titleModel,
  } = require('./models.mock');
  return customProvider({
    languageModels: {
      'chat-model': chatModel,
      'chat-model-reasoning': reasoningModel,
      'title-model': titleModel,
      'artifact-model': artifactModel,
    },
  });
})();
// --- END: MOCK PROVIDER FOR TESTS ---


// --- START: REAL PROVIDER FOR DEVELOPMENT/PRODUCTION ---
// Create a direct OpenAI provider instance using the factory function.
// This will read the OPENAI_API_KEY from your .env.local file.
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const realProvider = customProvider({
  languageModels: {
    // Replaced Grok with a fast and capable OpenAI model
    'chat-model': openai.chat('gpt-4o-mini'), // Use .chat() for chat models

    // Preserved the reasoning middleware but swapped the underlying model
    'chat-model-reasoning': wrapLanguageModel({
      model: openai.chat('gpt-4-turbo'), // Use .chat() for chat models
      middleware: extractReasoningMiddleware({ tagName: 'think' }),
    }),

    // Replaced Grok with a fast and capable OpenAI model
    'title-model': openai.chat('gpt-4o-mini'), // Use .chat() for chat models

    // Replaced Grok with a fast and capable OpenAI model
    'artifact-model': openai.chat('gpt-4o-mini'), // Use .chat() for chat models
  },
});
// --- END: REAL PROVIDER FOR DEVELOPMENT/PRODUCTION ---


// The final export now chooses between the mock and real provider
export const myProvider = isTestEnvironment ? mockProvider : realProvider;