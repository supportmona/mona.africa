import * as kv from './kv_store.tsx';

/**
 * Types pour la messagerie interne
 */
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'member' | 'expert' | 'admin';
  recipientId: string;
  recipientName: string;
  recipientRole: 'member' | 'expert' | 'admin';
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    role: 'member' | 'expert' | 'admin';
  }[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: { [userId: string]: number };
}

/**
 * Envoie un message dans une conversation
 */
export async function sendMessage(
  senderId: string,
  senderName: string,
  senderRole: 'member' | 'expert' | 'admin',
  recipientId: string,
  recipientName: string,
  recipientRole: 'member' | 'expert' | 'admin',
  content: string
): Promise<{ success: boolean; message?: Message; error?: string }> {
  try {
    // Créer l'ID de conversation (toujours dans le même ordre pour cohérence)
    const conversationId = [senderId, recipientId].sort().join('_');
    
    // Créer le message
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    const message: Message = {
      id: messageId,
      conversationId,
      senderId,
      senderName,
      senderRole,
      recipientId,
      recipientName,
      recipientRole,
      content,
      timestamp,
      read: false,
    };

    // Sauvegarder le message
    await kv.set(`message:${messageId}`, message);
    
    // Ajouter à la liste des messages de la conversation
    const conversationMessagesKey = `conversation:${conversationId}:messages`;
    const existingMessages = await kv.get(conversationMessagesKey) || [];
    existingMessages.push(messageId);
    await kv.set(conversationMessagesKey, existingMessages);
    
    // Mettre à jour la conversation
    const conversationKey = `conversation:${conversationId}`;
    let conversation = await kv.get(conversationKey) as Conversation | null;
    
    if (!conversation) {
      // Créer nouvelle conversation
      conversation = {
        id: conversationId,
        participants: [
          { id: senderId, name: senderName, role: senderRole },
          { id: recipientId, name: recipientName, role: recipientRole },
        ],
        lastMessage: content.substring(0, 100),
        lastMessageTime: timestamp,
        unreadCount: { [senderId]: 0, [recipientId]: 1 },
      };
    } else {
      // Mettre à jour conversation existante
      conversation.lastMessage = content.substring(0, 100);
      conversation.lastMessageTime = timestamp;
      conversation.unreadCount[recipientId] = (conversation.unreadCount[recipientId] || 0) + 1;
    }
    
    await kv.set(conversationKey, conversation);
    
    // Ajouter la conversation aux listes de conversations des participants
    await addConversationToUser(senderId, conversationId);
    await addConversationToUser(recipientId, conversationId);
    
    return { success: true, message };
  } catch (error) {
    console.error('Erreur sendMessage:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Récupère les conversations d'un utilisateur
 */
export async function getUserConversations(
  userId: string
): Promise<Conversation[]> {
  try {
    const userConversationsKey = `user:${userId}:conversations`;
    const conversationIds = await kv.get(userConversationsKey) || [];
    
    const conversations: Conversation[] = [];
    for (const convId of conversationIds) {
      const conv = await kv.get(`conversation:${convId}`) as Conversation | null;
      if (conv) {
        conversations.push(conv);
      }
    }
    
    // Trier par dernière activité
    conversations.sort((a, b) => 
      new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
    );
    
    return conversations;
  } catch (error) {
    console.error('Erreur getUserConversations:', error);
    return [];
  }
}

/**
 * Récupère les messages d'une conversation
 */
export async function getConversationMessages(
  conversationId: string
): Promise<Message[]> {
  try {
    const conversationMessagesKey = `conversation:${conversationId}:messages`;
    const messageIds = await kv.get(conversationMessagesKey) || [];
    
    const messages: Message[] = [];
    for (const msgId of messageIds) {
      const msg = await kv.get(`message:${msgId}`) as Message | null;
      if (msg) {
        messages.push(msg);
      }
    }
    
    // Trier par timestamp
    messages.sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    
    return messages;
  } catch (error) {
    console.error('Erreur getConversationMessages:', error);
    return [];
  }
}

/**
 * Marque les messages d'une conversation comme lus
 */
export async function markConversationAsRead(
  conversationId: string,
  userId: string
): Promise<{ success: boolean }> {
  try {
    // Mettre à jour le compteur non-lus dans la conversation
    const conversationKey = `conversation:${conversationId}`;
    const conversation = await kv.get(conversationKey) as Conversation | null;
    
    if (conversation) {
      conversation.unreadCount[userId] = 0;
      await kv.set(conversationKey, conversation);
    }
    
    // Marquer tous les messages comme lus
    const messages = await getConversationMessages(conversationId);
    for (const message of messages) {
      if (message.recipientId === userId && !message.read) {
        message.read = true;
        await kv.set(`message:${message.id}`, message);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erreur markConversationAsRead:', error);
    return { success: false };
  }
}

/**
 * Ajoute une conversation à la liste d'un utilisateur
 */
async function addConversationToUser(userId: string, conversationId: string) {
  const userConversationsKey = `user:${userId}:conversations`;
  const conversations = await kv.get(userConversationsKey) || [];
  
  if (!conversations.includes(conversationId)) {
    conversations.push(conversationId);
    await kv.set(userConversationsKey, conversations);
  }
}

/**
 * Récupère le nombre total de messages non lus pour un utilisateur
 */
export async function getUnreadCount(userId: string): Promise<number> {
  try {
    const conversations = await getUserConversations(userId);
    let total = 0;
    
    for (const conv of conversations) {
      total += conv.unreadCount[userId] || 0;
    }
    
    return total;
  } catch (error) {
    console.error('Erreur getUnreadCount:', error);
    return 0;
  }
}
