import { Hono } from "npm:hono@4.7.11";
import { cors } from "npm:hono@4.7.11/cors";
import { logger } from "npm:hono@4.7.11/logger";
import * as kv from "./kv_store.tsx";
import { sendApprovalEmail, sendRejectionEmail } from "./emailService.tsx";
import * as expertAuth from "./expert_auth.tsx";
import * as messaging from "./messaging.tsx";
import * as tickets from "./tickets.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-6378cc81/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== EXPERT AUTHENTICATION ROUTES ====================

/**
 * Inscription d'un nouvel expert
 * POST /make-server-6378cc81/expert/signup
 */
app.post("/make-server-6378cc81/expert/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, firstName, lastName, specialty, licenseNumber, phone } = body;

    console.log("📝 Tentative création compte expert:", { email, firstName, lastName, specialty, licenseNumber });

    // Validation des champs requis
    if (!email || !password || !firstName || !lastName || !specialty || !licenseNumber) {
      console.error("❌ Champs manquants:", { email, password: !!password, firstName, lastName, specialty, licenseNumber });
      return c.json(
        { error: "Tous les champs obligatoires doivent être remplis (email, password, firstName, lastName, specialty, licenseNumber)" },
        400
      );
    }

    // Validation du mot de passe (minimum 8 caractères)
    if (password.length < 8) {
      console.error("❌ Mot de passe trop court:", password.length);
      return c.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        400
      );
    }

    const result = await expertAuth.signupExpert(email, password, {
      firstName,
      lastName,
      specialty,
      licenseNumber,
      phone,
    });

    if (result.error) {
      console.error("❌ Erreur signup:", result.error);
      return c.json({ error: result.error }, 400);
    }

    console.log("✅ Compte expert créé:", result.data?.user?.id);
    return c.json({
      success: true,
      message: "Compte expert créé avec succès",
      data: result.data,
    });
  } catch (error) {
    console.error("❌ Erreur dans la route signup expert:", error);
    return c.json(
      { error: `Erreur serveur lors de l'inscription: ${error.message}` },
      500
    );
  }
});

/**
 * Connexion d'un expert
 * POST /make-server-6378cc81/expert/login
 */
app.post("/make-server-6378cc81/expert/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json(
        { error: "Email et mot de passe requis" },
        400
      );
    }

    const result = await expertAuth.loginExpert(email, password);

    if (result.error) {
      return c.json({ error: result.error }, 401);
    }

    return c.json({
      success: true,
      message: "Connexion réussie",
      data: result.data,
    });
  } catch (error) {
    console.error("Erreur dans la route login expert:", error);
    return c.json(
      { error: `Erreur serveur lors de la connexion: ${error.message}` },
      500
    );
  }
});

/**
 * Déconnexion d'un expert
 * POST /make-server-6378cc81/expert/logout
 */
app.post("/make-server-6378cc81/expert/logout", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      return c.json({ error: "Token d'authentification manquant" }, 401);
    }

    const result = await expertAuth.logoutExpert(accessToken);

    if (result.error) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({
      success: true,
      message: "Déconnexion réussie",
    });
  } catch (error) {
    console.error("Erreur dans la route logout expert:", error);
    return c.json(
      { error: `Erreur serveur lors de la déconnexion: ${error.message}` },
      500
    );
  }
});

/**
 * Récupérer la session active d'un expert
 * GET /make-server-6378cc81/expert/session
 */
app.get("/make-server-6378cc81/expert/session", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      return c.json({ error: "Token d'authentification manquant" }, 401);
    }

    const result = await expertAuth.getExpertSession(accessToken);

    if (result.error) {
      return c.json({ error: result.error }, 401);
    }

    return c.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("Erreur dans la route session expert:", error);
    return c.json(
      { error: `Erreur serveur lors de la récupération de la session: ${error.message}` },
      500
    );
  }
});

/**
 * Mettre à jour le profil d'un expert
 * PUT /make-server-6378cc81/expert/profile
 */
app.put("/make-server-6378cc81/expert/profile", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      return c.json({ error: "Token d'authentification manquant" }, 401);
    }

    // Vérifier la session
    const sessionResult = await expertAuth.getExpertSession(accessToken);
    if (sessionResult.error) {
      return c.json({ error: sessionResult.error }, 401);
    }

    const body = await c.req.json();
    const { phone, languages, availability, bio } = body;

    const result = await expertAuth.updateExpertProfile(
      sessionResult.data.user.id,
      { phone, languages, availability, bio }
    );

    if (result.error) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({
      success: true,
      message: "Profil mis à jour avec succès",
      data: result.data,
    });
  } catch (error) {
    console.error("Erreur dans la route update profile expert:", error);
    return c.json(
      { error: `Erreur serveur lors de la mise à jour du profil: ${error.message}` },
      500
    );
  }
});

/**
 * Soumettre une candidature expert
 * POST /make-server-6378cc81/expert/application
 */
app.post("/make-server-6378cc81/expert/application", async (c) => {
  try {
    const body = await c.req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      profession,
      experience,
      diplomas,
      specialties,
      languages,
      availability,
      linkedin,
      motivation,
      licenseNumber,
      status,
      submittedAt,
    } = body;

    // Validation des champs requis
    if (!firstName || !lastName || !email || !phone || !profession || !licenseNumber) {
      return c.json(
        { error: "Tous les champs obligatoires doivent être remplis" },
        400
      );
    }

    // Générer un ID unique pour la candidature
    const applicationId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Stocker la candidature dans le KV store
    const application = {
      id: applicationId,
      firstName,
      lastName,
      email,
      phone,
      city,
      profession,
      experience,
      diplomas,
      specialties,
      languages,
      availability,
      linkedin,
      motivation,
      licenseNumber,
      status: status || "pending",
      submittedAt: submittedAt || new Date().toISOString(),
    };

    await kv.set(`application:${applicationId}`, application);

    // Ajouter à la liste des candidatures en attente
    const pendingApplications = await kv.get("applications:pending") || [];
    pendingApplications.push(applicationId);
    await kv.set("applications:pending", pendingApplications);

    return c.json({
      success: true,
      message: "Candidature enregistrée avec succès",
      data: { applicationId },
    });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la candidature:", error);
    return c.json(
      { error: `Erreur serveur lors de l'enregistrement: ${error.message}` },
      500
    );
  }
});

/**
 * Récupérer toutes les candidatures en attente (admin uniquement pour l'instant)
 * GET /make-server-6378cc81/expert/applications
 */
app.get("/make-server-6378cc81/expert/applications", async (c) => {
  try {
    // Récupérer toutes les candidatures (pas seulement pending)
    const allApps = await kv.getByPrefix("application:") || [];
    const applications = allApps.filter((app: any) => app && app.id);

    return c.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures:", error);
    return c.json(
      { error: `Erreur serveur lors de la récupération: ${error.message}` },
      500
    );
  }
});

/**
 * Récupérer tous les experts approuvés
 * GET /make-server-6378cc81/expert/list
 */
app.get("/make-server-6378cc81/expert/list", async (c) => {
  try {
    const approvedIds = await kv.get("applications:approved") || [];
    const experts = [];

    for (const id of approvedIds) {
      const expert = await kv.get(`application:${id}`);
      if (expert) {
        experts.push(expert);
      }
    }

    return c.json({
      success: true,
      data: experts,
    });
  } catch (error) {
    console.error("Erreur récupération experts:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Créer un expert manuellement (admin)
 * POST /make-server-6378cc81/expert/create
 */
app.post("/make-server-6378cc81/expert/create", async (c) => {
  try {
    const body = await c.req.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      profession,
      experience,
      specialties,
      languages,
      licenseNumber,
    } = body;

    if (!firstName || !lastName || !email || !profession || !licenseNumber) {
      return c.json({ error: "Champs obligatoires manquants" }, 400);
    }

    // Créer l'expert directement comme approuvé
    const expertId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const expert = {
      id: expertId,
      firstName,
      lastName,
      email,
      phone,
      city,
      profession,
      experience,
      specialties,
      languages,
      licenseNumber,
      status: "approved",
      createdAt: new Date().toISOString(),
      createdBy: "admin",
    };

    await kv.set(`application:${expertId}`, expert);

    // Ajouter à la liste des approuvés
    const approvedIds = await kv.get("applications:approved") || [];
    approvedIds.push(expertId);
    await kv.set("applications:approved", approvedIds);

    return c.json({
      success: true,
      message: "Expert créé avec succès",
      data: expert,
    });
  } catch (error) {
    console.error("Erreur création expert:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Modifier un expert (admin)
 * PUT /make-server-6378cc81/expert/:id
 */
app.put("/make-server-6378cc81/expert/:id", async (c) => {
  try {
    const expertId = c.req.param("id");
    const body = await c.req.json();

    const existingExpert = await kv.get(`application:${expertId}`);
    if (!existingExpert) {
      return c.json({ error: "Expert introuvable" }, 404);
    }

    const updatedExpert = {
      ...existingExpert,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`application:${expertId}`, updatedExpert);

    return c.json({
      success: true,
      message: "Expert mis à jour avec succès",
      data: updatedExpert,
    });
  } catch (error) {
    console.error("Erreur mise à jour expert:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Supprimer un expert (admin)
 * DELETE /make-server-6378cc81/expert/:id
 */
app.delete("/make-server-6378cc81/expert/:id", async (c) => {
  try {
    const expertId = c.req.param("id");

    const expert = await kv.get(`application:${expertId}`);
    if (!expert) {
      return c.json({ error: "Expert introuvable" }, 404);
    }

    // Retirer de toutes les listes
    const approvedIds = await kv.get("applications:approved") || [];
    const newApprovedIds = approvedIds.filter((id: string) => id !== expertId);
    await kv.set("applications:approved", newApprovedIds);

    const pendingIds = await kv.get("applications:pending") || [];
    const newPendingIds = pendingIds.filter((id: string) => id !== expertId);
    await kv.set("applications:pending", newPendingIds);

    // Supprimer l'expert
    await kv.del(`application:${expertId}`);

    return c.json({
      success: true,
      message: "Expert supprimé avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression expert:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Activer/Désactiver un expert (admin)
 * PUT /make-server-6378cc81/expert/:id/toggle-active
 */
app.put("/make-server-6378cc81/expert/:id/toggle-active", async (c) => {
  try {
    const expertId = c.req.param("id");

    const expert = await kv.get(`application:${expertId}`);
    if (!expert) {
      return c.json({ error: "Expert introuvable" }, 404);
    }

    expert.active = !expert.active;
    expert.updatedAt = new Date().toISOString();
    await kv.set(`application:${expertId}`, expert);

    return c.json({
      success: true,
      message: expert.active ? "Expert activé" : "Expert désactivé",
      data: expert,
    });
  } catch (error) {
    console.error("Erreur toggle active expert:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Mettre à jour une candidature
 * PUT /make-server-6378cc81/expert/application/:id
 */
app.put("/make-server-6378cc81/expert/application/:id", async (c) => {
  try {
    const applicationId = c.req.param("id");
    const body = await c.req.json();

    // Récupérer la candidature existante
    const existingApp = await kv.get(`application:${applicationId}`);

    if (!existingApp) {
      return c.json({ error: "Candidature introuvable" }, 404);
    }

    // Mettre à jour la candidature
    const updatedApp = {
      ...existingApp,
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`application:${applicationId}`, updatedApp);

    // Si le statut passe à "approved", retirer de la liste pending
    if (body.status === "approved") {
      const pendingIds = await kv.get("applications:pending") || [];
      const newPendingIds = pendingIds.filter((id: string) => id !== applicationId);
      await kv.set("applications:pending", newPendingIds);

      // Ajouter à la liste des approuvés
      const approvedIds = await kv.get("applications:approved") || [];
      approvedIds.push(applicationId);
      await kv.set("applications:approved", approvedIds);

      // Envoyer un email d'approbation
      await sendApprovalEmail(updatedApp.email, updatedApp.firstName, updatedApp.lastName);
    } else if (body.status === "rejected") {
      // Envoyer un email de rejet
      await sendRejectionEmail(updatedApp.email, updatedApp.firstName, updatedApp.lastName);
    }

    return c.json({
      success: true,
      message: "Candidature mise à jour avec succès",
      data: updatedApp,
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la candidature:", error);
    return c.json(
      { error: `Erreur serveur lors de la mise à jour: ${error.message}` },
      500
    );
  }
});

// ==================== MESSAGERIE INTERNE ROUTES ====================

/**
 * Récupérer toutes les conversations (admin)
 * GET /make-server-6378cc81/messages/conversations
 */
app.get("/make-server-6378cc81/messages/conversations", async (c) => {
  try {
    const archived = c.req.query("archived") === "true";
    
    // Récupérer toutes les conversations
    const allConvs = await kv.getByPrefix("conversation:") || [];
    const conversations = allConvs
      .filter((item: any) => item && item.id && !item.id.includes(":messages"))
      .filter((conv: any) => archived ? conv.archived === true : !conv.archived)
      .map((conv: any) => ({
        id: conv.id,
        memberId: conv.participants?.find((p: any) => p.role === "member")?.id || "",
        memberName: conv.participants?.find((p: any) => p.role === "member")?.name || "Inconnu",
        expertId: conv.participants?.find((p: any) => p.role === "expert")?.id || "",
        expertName: conv.participants?.find((p: any) => p.role === "expert")?.name || "Inconnu",
        lastMessage: conv.lastMessage || "",
        lastMessageAt: conv.lastMessageTime || new Date().toISOString(),
        unreadCount: Object.values(conv.unreadCount || {}).reduce((a: any, b: any) => a + b, 0),
        archived: conv.archived || false,
      }));

    // Trier par date décroissante
    conversations.sort((a: any, b: any) => 
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
    );

    return c.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    console.error("Erreur récupération conversations admin:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer les messages d'une conversation (admin)
 * GET /make-server-6378cc81/messages/conversation/:conversationId
 */
app.get("/make-server-6378cc81/messages/conversation/:conversationId", async (c) => {
  try {
    const conversationId = c.req.param("conversationId");
    const messages = await messaging.getConversationMessages(conversationId);

    const formattedMessages = messages.map((msg: any) => ({
      id: msg.id,
      conversationId: msg.conversationId,
      senderId: msg.senderId,
      senderName: msg.senderName,
      senderRole: msg.senderRole,
      message: msg.content,
      sentAt: msg.timestamp,
      read: msg.read,
      cc: msg.cc || [],
      attachments: msg.attachments || [],
    }));

    return c.json({
      success: true,
      data: formattedMessages,
    });
  } catch (error) {
    console.error("Erreur récupération messages:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Envoyer un message admin avec CC et pièces jointes
 * POST /make-server-6378cc81/messages/send
 */
app.post("/make-server-6378cc81/messages/send", async (c) => {
  try {
    const body = await c.req.json();
    const { conversationId, message, cc, attachments } = body;

    if (!conversationId || !message) {
      return c.json({ error: "conversationId et message requis" }, 400);
    }

    // Récupérer la conversation
    const conversation = await kv.get(`conversation:${conversationId}`);
    if (!conversation) {
      return c.json({ error: "Conversation introuvable" }, 404);
    }

    // Créer le message avec admin comme expéditeur
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    const newMessage = {
      id: messageId,
      conversationId,
      senderId: "admin",
      senderName: "Administrateur M.O.N.A",
      senderRole: "admin",
      recipientId: conversation.participants[0].id,
      recipientName: conversation.participants[0].name,
      recipientRole: conversation.participants[0].role,
      content: message,
      timestamp,
      read: false,
      cc: cc || [],
      attachments: attachments || [],
    };

    // Sauvegarder le message
    await kv.set(`message:${messageId}`, newMessage);

    // Ajouter à la liste des messages
    const conversationMessagesKey = `conversation:${conversationId}:messages`;
    const existingMessages = await kv.get(conversationMessagesKey) || [];
    existingMessages.push(messageId);
    await kv.set(conversationMessagesKey, existingMessages);

    // Mettre à jour la conversation
    conversation.lastMessage = message.substring(0, 100);
    conversation.lastMessageTime = timestamp;
    await kv.set(`conversation:${conversationId}`, conversation);

    return c.json({
      success: true,
      message: "Message envoyé avec succès",
      data: newMessage,
    });
  } catch (error) {
    console.error("Erreur envoi message admin:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Archiver une conversation
 * PUT /make-server-6378cc81/messages/conversation/:conversationId/archive
 */
app.put("/make-server-6378cc81/messages/conversation/:conversationId/archive", async (c) => {
  try {
    const conversationId = c.req.param("conversationId");
    
    const conversation = await kv.get(`conversation:${conversationId}`);
    if (!conversation) {
      return c.json({ error: "Conversation introuvable" }, 404);
    }

    conversation.archived = !conversation.archived;
    await kv.set(`conversation:${conversationId}`, conversation);

    return c.json({
      success: true,
      message: conversation.archived ? "Conversation archivée" : "Conversation désarchivée",
    });
  } catch (error) {
    console.error("Erreur archivage conversation:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Supprimer une conversation
 * DELETE /make-server-6378cc81/messages/conversation/:conversationId
 */
app.delete("/make-server-6378cc81/messages/conversation/:conversationId", async (c) => {
  try {
    const conversationId = c.req.param("conversationId");
    
    // Supprimer tous les messages
    const conversationMessagesKey = `conversation:${conversationId}:messages`;
    const messageIds = await kv.get(conversationMessagesKey) || [];
    
    for (const msgId of messageIds) {
      await kv.del(`message:${msgId}`);
    }
    
    // Supprimer la liste des messages
    await kv.del(conversationMessagesKey);
    
    // Supprimer la conversation
    await kv.del(`conversation:${conversationId}`);

    return c.json({
      success: true,
      message: "Conversation supprimée avec succès",
    });
  } catch (error) {
    console.error("Erreur suppression conversation:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Envoyer un message
 * POST /make-server-6378cc81/messaging/send
 */
app.post("/make-server-6378cc81/messaging/send", async (c) => {
  try {
    const body = await c.req.json();
    const { senderId, senderName, senderRole, recipientId, recipientName, recipientRole, content } = body;

    if (!senderId || !senderName || !senderRole || !recipientId || !recipientName || !recipientRole || !content) {
      return c.json({ error: "Tous les champs sont requis" }, 400);
    }

    const result = await messaging.sendMessage(
      senderId,
      senderName,
      senderRole,
      recipientId,
      recipientName,
      recipientRole,
      content
    );

    if (!result.success) {
      return c.json({ error: result.error }, 500);
    }

    return c.json({
      success: true,
      message: "Message envoyé avec succès",
      data: result.message,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer les conversations d'un utilisateur
 * GET /make-server-6378cc81/messaging/conversations/:userId
 */
app.get("/make-server-6378cc81/messaging/conversations/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const conversations = await messaging.getUserConversations(userId);

    return c.json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des conversations:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer les messages d'une conversation
 * GET /make-server-6378cc81/messaging/conversation/:conversationId/messages
 */
app.get("/make-server-6378cc81/messaging/conversation/:conversationId/messages", async (c) => {
  try {
    const conversationId = c.req.param("conversationId");
    const messages = await messaging.getConversationMessages(conversationId);

    return c.json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Marquer une conversation comme lue
 * POST /make-server-6378cc81/messaging/conversation/:conversationId/read
 */
app.post("/make-server-6378cc81/messaging/conversation/:conversationId/read", async (c) => {
  try {
    const conversationId = c.req.param("conversationId");
    const body = await c.req.json();
    const { userId } = body;

    if (!userId) {
      return c.json({ error: "userId requis" }, 400);
    }

    const result = await messaging.markConversationAsRead(conversationId, userId);

    if (!result.success) {
      return c.json({ error: "Erreur lors de la mise à jour" }, 500);
    }

    return c.json({
      success: true,
      message: "Conversation marquée comme lue",
    });
  } catch (error) {
    console.error("Erreur lors du marquage comme lu:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer le nombre de messages non lus
 * GET /make-server-6378cc81/messaging/unread/:userId
 */
app.get("/make-server-6378cc81/messaging/unread/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const count = await messaging.getUnreadCount(userId);

    return c.json({
      success: true,
      data: { count },
    });
  } catch (error) {
    console.error("Erreur lors du comptage des messages non lus:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

// ==================== SYSTÈME DE TICKETS ROUTES ====================

/**
 * Créer un nouveau ticket
 * POST /make-server-6378cc81/tickets/create
 */
app.post("/make-server-6378cc81/tickets/create", async (c) => {
  try {
    const body = await c.req.json();
    const { createdBy, createdByName, createdByRole, category, subject, description, priority } = body;

    if (!createdBy || !createdByName || !createdByRole || !category || !subject || !description) {
      return c.json({ error: "Tous les champs obligatoires doivent être remplis" }, 400);
    }

    const result = await tickets.createTicket(
      createdBy,
      createdByName,
      createdByRole,
      category,
      subject,
      description,
      priority || 'medium'
    );

    if (!result.success) {
      return c.json({ error: result.error }, 500);
    }

    return c.json({
      success: true,
      message: "Ticket créé avec succès",
      data: result.ticket,
    });
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Ajouter un message à un ticket
 * POST /make-server-6378cc81/tickets/:ticketId/message
 */
app.post("/make-server-6378cc81/tickets/:ticketId/message", async (c) => {
  try {
    const ticketId = c.req.param("ticketId");
    const body = await c.req.json();
    const { authorId, authorName, authorRole, content, isStaffReply } = body;

    if (!authorId || !authorName || !authorRole || !content) {
      return c.json({ error: "Tous les champs sont requis" }, 400);
    }

    const result = await tickets.addTicketMessage(
      ticketId,
      authorId,
      authorName,
      authorRole,
      content,
      isStaffReply || false
    );

    if (!result.success) {
      return c.json({ error: result.error }, 500);
    }

    return c.json({
      success: true,
      message: "Message ajouté au ticket",
      data: result.message,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du message au ticket:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Mettre à jour le statut d'un ticket
 * PUT /make-server-6378cc81/tickets/:ticketId/status
 */
app.put("/make-server-6378cc81/tickets/:ticketId/status", async (c) => {
  try {
    const ticketId = c.req.param("ticketId");
    const body = await c.req.json();
    const { status, assignedTo } = body;

    if (!status) {
      return c.json({ error: "Le statut est requis" }, 400);
    }

    const result = await tickets.updateTicketStatus(ticketId, status, assignedTo);

    if (!result.success) {
      return c.json({ error: result.error }, 500);
    }

    return c.json({
      success: true,
      message: "Statut du ticket mis à jour",
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer tous les tickets
 * GET /make-server-6378cc81/tickets/all
 */
app.get("/make-server-6378cc81/tickets/all", async (c) => {
  try {
    const allTickets = await tickets.getAllTickets();

    return c.json({
      success: true,
      data: allTickets,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des tickets:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer les tickets d'un utilisateur
 * GET /make-server-6378cc81/tickets/user/:userId
 */
app.get("/make-server-6378cc81/tickets/user/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const userTickets = await tickets.getUserTickets(userId);

    return c.json({
      success: true,
      data: userTickets,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des tickets utilisateur:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer un ticket par ID
 * GET /make-server-6378cc81/tickets/:ticketId
 */
app.get("/make-server-6378cc81/tickets/:ticketId", async (c) => {
  try {
    const ticketId = c.req.param("ticketId");
    const ticket = await tickets.getTicket(ticketId);

    if (!ticket) {
      return c.json({ error: "Ticket non trouvé" }, 404);
    }

    return c.json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération du ticket:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

/**
 * Récupérer les statistiques des tickets
 * GET /make-server-6378cc81/tickets/stats
 */
app.get("/make-server-6378cc81/tickets/stats", async (c) => {
  try {
    const stats = await tickets.getTicketStats();

    return c.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return c.json({ error: `Erreur serveur: ${error.message}` }, 500);
  }
});

Deno.serve(app.fetch);