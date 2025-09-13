// 'use server';

// import { generateText, type UIMessage } from 'ai';
// import { cookies } from 'next/headers';
// import { createOpenAI } from '@ai-sdk/openai';
// import {
//   deleteMessagesByChatIdAfterTimestamp,
//   getMessageById,
//   updateChatVisiblityById,
// } from '@/lib/db/queries';
// import type { VisibilityType } from '@/components/visibility-selector';
// import { myProvider } from '@/lib/ai/providers';

// export async function saveChatModelAsCookie(model: string) {
//   const cookieStore = await cookies();
//   cookieStore.set('chat-model', model);
// }

// export async function generateTitleFromUserMessage({
//   message,
// }: {
//   message: UIMessage;
// }) {
//   const openai = createOpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
//   });

//   const { text: title } = await generateText({
//     model: openai.chat('gpt-4o-mini'), // @DylanPrinsloo Please pay attention here
//     system: `
//       - you will generate a short title based on the first message a user begins a conversation with
//       - you will not use any markdown
//       - you will not use any quotes
//       - you will be concise
//       - you will not use any punctuation
//       - you will not use any capitalization
//       - you will not use any special characters
//       - you will not use any emojis
//       - you will not use any numbers
//       - you will not use any symbols
//     `,
//     prompt: JSON.stringify(message),
//   });

//   return title;
// }

// export async function deleteTrailingMessages({ id }: { id: string }) {
//   const [message] = await getMessageById({ id });

//   await deleteMessagesByChatIdAfterTimestamp({
//     chatId: message.chatId,
//     timestamp: message.createdAt,
//   });
// }

// export async function updateChatVisibility({
//   chatId,
//   visibility,
// }: {
//   chatId: string;
//   visibility: VisibilityType;
// }) {
//   await updateChatVisiblityById({ chatId, visibility });
// }

// src/app/(chat)/actions.ts
'use server';

import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import type { UIMessage } from 'ai';

export async function generateTitleFromUserMessage({
  message,
}: {
  message: UIMessage;
}) {
  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { text: title } = await generateText({
      model: openai.chat('gpt-4o-mini'),
      system: `
        - you will generate a short title based on the first message a user begins a conversation with
        - you will not use any markdown
        - you will not use any quotes
        - you will be concise
        - you will not use any punctuation
        - you will not use any capitalization
        - you will not use any special characters
        - you will not use any emojis
        - you will not use any numbers
        - you will not use any symbols
      `,
      // prompt: message.parts.map((part) => part.value).join('\n'),
      prompt: JSON.stringify(message),
    });
    return title;
  } catch (error: any) {
    // Check if the error is the specific 'insufficient_quota' error
    if (error?.data?.error?.code === 'insufficient_quota') {
      console.log('OpenAI quota exceeded during title generation. Using default title.');
      // Return a default title so the app doesn't crash
      return 'New Chat';
    }
    // For any other error, re-throw it to see what went wrong
    throw error;
  }
}