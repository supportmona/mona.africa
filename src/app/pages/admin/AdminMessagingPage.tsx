import { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  User,
  Clock,
  Mail,
  Send,
  Paperclip,
  Archive,
  Trash2,
  UserPlus,
  X,
  File,
  Image,
  FileText,
  Plus,
  MoreVertical,
  Download,
} from "lucide-react";
import { projectId, publicAnonKey } from "/utils/supabase/info";

interface Conversation {
  id: string;
  memberId: string;
  memberName: string;
  expertId: string;
  expertName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  archived?: boolean;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  message: string;
  sentAt: string;
  read: boolean;
  attachments?: Attachment[];
  cc?: string[];
}

interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export default function AdminMessagingPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Nouveau message
  const [showNewMessage, setShowNewMessage] = useState(false);
  const [newMessageText, setNewMessageText] = useState("");
  const [ccRecipients, setCcRecipients] = useState<string[]>([]);
  const [ccInput, setCcInput] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  
  // Filtres
  const [showArchived, setShowArchived] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState<string | null>(null);

  const serverUrl = `https://${projectId}.supabase.co/functions/v1/make-server-6378cc81`;

  useEffect(() => {
    loadConversations();
  }, [showArchived]);

  const loadConversations = async () => {
    try {
      const response = await fetch(
        `${serverUrl}/messages/conversations${showArchived ? '?archived=true' : ''}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setConversations(data.data);
        }
      }
    } catch (error) {
      console.error("Erreur chargement conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      const response = await fetch(
        `${serverUrl}/messages/conversation/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setMessages(data.data);
        }
      }
    } catch (error) {
      console.error("Erreur chargement messages:", error);
    }
  };

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation.id);
    setShowNewMessage(false);
  };

  const handleSendMessage = async () => {
    if (!newMessageText.trim() && attachments.length === 0) return;
    if (!selectedConversation) return;

    const formData = new FormData();
    formData.append("conversationId", selectedConversation.id);
    formData.append("message", newMessageText);
    formData.append("cc", JSON.stringify(ccRecipients));
    
    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      const response = await fetch(
        `${serverUrl}/messages/send`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        setNewMessageText("");
        setCcRecipients([]);
        setAttachments([]);
        setShowNewMessage(false);
        loadMessages(selectedConversation.id);
        loadConversations();
      }
    } catch (error) {
      console.error("Erreur envoi message:", error);
    }
  };

  const handleArchiveConversation = async (conversationId: string) => {
    try {
      const response = await fetch(
        `${serverUrl}/messages/conversation/${conversationId}/archive`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        loadConversations();
        if (selectedConversation?.id === conversationId) {
          setSelectedConversation(null);
        }
      }
    } catch (error) {
      console.error("Erreur archivage:", error);
    }
  };

  const handleDeleteConversation = async (conversationId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette conversation ?")) {
      return;
    }

    try {
      const response = await fetch(
        `${serverUrl}/messages/conversation/${conversationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        loadConversations();
        if (selectedConversation?.id === conversationId) {
          setSelectedConversation(null);
        }
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments([...attachments, ...Array.from(e.target.files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const addCcRecipient = () => {
    if (ccInput.trim() && !ccRecipients.includes(ccInput.trim())) {
      setCcRecipients([...ccRecipients, ccInput.trim()]);
      setCcInput("");
    }
  };

  const removeCcRecipient = (email: string) => {
    setCcRecipients(ccRecipients.filter((r) => r !== email));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    if (type.includes("pdf")) return FileText;
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const filteredConversations = conversations.filter((conv) =>
    `${conv.memberName} ${conv.expertName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full bg-gradient-to-br from-white via-beige/5 to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-beige/30 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-anthracite font-serif">
              Messagerie Interne
            </h1>
            <p className="text-sm text-anthracite/60 font-sans mt-1">
              Conversations entre membres et experts
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                showArchived
                  ? "bg-gradient-to-br from-terracotta/70 to-gold/60 text-white shadow-lg shadow-terracotta/10"
                  : "border border-beige/30 text-anthracite/70 hover:bg-beige/10"
              }`}
            >
              <Archive className="w-4 h-4 inline-block mr-2" />
              {showArchived ? "Conversations actives" : "Voir archives"}
            </button>
            
            <button
              onClick={() => {
                setShowNewMessage(true);
                setSelectedConversation(null);
              }}
              className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              Nouveau message
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
          {/* Liste des conversations */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 overflow-hidden flex flex-col shadow-sm">
            {/* Recherche */}
            <div className="p-4 border-b border-beige/20 bg-gradient-to-r from-beige/10 to-transparent">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-anthracite/40" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une conversation..."
                  className="w-full pl-10 pr-4 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-transparent font-sans text-sm bg-white/50"
                />
              </div>
            </div>

            {/* Liste */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center">
                  <div className="inline-block w-6 h-6 border-3 border-terracotta/70 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-anthracite/60 font-sans mt-3">
                    Chargement...
                  </p>
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-anthracite/20 mx-auto mb-3" />
                  <p className="text-sm text-anthracite/60 font-sans">
                    {showArchived ? "Aucune conversation archivée" : "Aucune conversation"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-beige/20">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.id}
                      className={`relative group ${
                        selectedConversation?.id === conv.id ? "bg-gradient-to-r from-terracotta/5 to-gold/5" : ""
                      }`}
                    >
                      <button
                        onClick={() => handleSelectConversation(conv)}
                        className="w-full p-4 text-left hover:bg-beige/10 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-anthracite font-sans truncate">
                              {conv.memberName}
                            </p>
                            <p className="text-xs text-anthracite/60 font-sans truncate">
                              Expert: {conv.expertName}
                            </p>
                          </div>
                          {conv.unreadCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-terracotta/70 text-white text-xs font-bold rounded-full flex-shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-anthracite/50 font-sans line-clamp-1 mb-1">
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-anthracite/50 font-sans">
                          <Clock className="w-3 h-3" />
                          {new Date(conv.lastMessageAt).toLocaleDateString("fr-FR")}
                        </div>
                      </button>

                      {/* Menu options */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowOptionsMenu(showOptionsMenu === conv.id ? null : conv.id);
                          }}
                          className="p-1 hover:bg-beige/20 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 text-anthracite/60" />
                        </button>

                        {showOptionsMenu === conv.id && (
                          <div className="absolute right-0 top-8 bg-white border border-beige/30 rounded-lg shadow-lg py-1 z-10 min-w-[150px]">
                            <button
                              onClick={() => {
                                handleArchiveConversation(conv.id);
                                setShowOptionsMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-anthracite/70 hover:bg-beige/10 flex items-center gap-2"
                            >
                              <Archive className="w-4 h-4" />
                              Archiver
                            </button>
                            <button
                              onClick={() => {
                                handleDeleteConversation(conv.id);
                                setShowOptionsMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm text-red-600/70 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Supprimer
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Zone de messages */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-xl border border-beige/30 overflow-hidden flex flex-col shadow-sm">
            {showNewMessage ? (
              <>
                {/* Header nouveau message */}
                <div className="p-4 border-b border-beige/20 bg-gradient-to-r from-beige/10 to-transparent">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-anthracite font-serif">
                      Nouveau message
                    </h3>
                    <button
                      onClick={() => setShowNewMessage(false)}
                      className="p-1 hover:bg-beige/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-anthracite/60" />
                    </button>
                  </div>
                </div>

                {/* Formulaire nouveau message */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-anthracite/70 mb-2">
                      Destinataires (CC)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="email"
                        value={ccInput}
                        onChange={(e) => setCcInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addCcRecipient()}
                        placeholder="email@exemple.com"
                        className="flex-1 px-3 py-2 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm bg-white/50"
                      />
                      <button
                        onClick={addCcRecipient}
                        className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg transition-all"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                    {ccRecipients.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {ccRecipients.map((email) => (
                          <span
                            key={email}
                            className="px-3 py-1 bg-terracotta/10 text-terracotta/80 rounded-full text-xs font-medium flex items-center gap-2"
                          >
                            {email}
                            <button
                              onClick={() => removeCcRecipient(email)}
                              className="hover:bg-terracotta/20 rounded-full p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-anthracite/70 mb-2">
                      Message
                    </label>
                    <textarea
                      value={newMessageText}
                      onChange={(e) => setNewMessageText(e.target.value)}
                      placeholder="Écrivez votre message..."
                      rows={10}
                      className="w-full px-4 py-3 border border-beige/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta/30 font-sans text-sm bg-white/50 resize-none"
                    />
                  </div>

                  {/* Pièces jointes */}
                  <div>
                    <label className="block text-sm font-medium text-anthracite/70 mb-2">
                      Pièces jointes
                    </label>
                    <div className="border-2 border-dashed border-beige/30 rounded-lg p-4 text-center hover:border-terracotta/30 transition-colors">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Paperclip className="w-8 h-8 text-anthracite/40" />
                        <p className="text-sm text-anthracite/60 font-sans">
                          Cliquez pour ajouter des fichiers
                        </p>
                      </label>
                    </div>

                    {attachments.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {attachments.map((file, index) => {
                          const Icon = getFileIcon(file.type);
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-3 bg-beige/10 rounded-lg border border-beige/30"
                            >
                              <Icon className="w-5 h-5 text-terracotta/70 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-anthracite truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-anthracite/50">
                                  {formatFileSize(file.size)}
                                </p>
                              </div>
                              <button
                                onClick={() => removeAttachment(index)}
                                className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4 text-red-600/70" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer nouveau message */}
                <div className="p-4 border-t border-beige/20 bg-white flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowNewMessage(false)}
                    className="px-4 py-2 border border-beige/30 text-anthracite/70 rounded-lg hover:bg-beige/10 transition-colors text-sm font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessageText.trim() && attachments.length === 0}
                    className="px-4 py-2 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg hover:shadow-terracotta/20 transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer
                  </button>
                </div>
              </>
            ) : selectedConversation ? (
              <>
                {/* Header conversation */}
                <div className="p-4 border-b border-beige/20 bg-gradient-to-r from-beige/10 to-transparent">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-terracotta/40 to-gold/30 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-anthracite font-sans">
                        {selectedConversation.memberName}
                      </p>
                      <p className="text-xs text-anthracite/60 font-sans">
                        avec {selectedConversation.expertName}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowNewMessage(true)}
                      className="px-3 py-1.5 bg-gradient-to-br from-terracotta/70 to-gold/60 text-white rounded-lg hover:shadow-lg transition-all text-xs font-medium"
                    >
                      Répondre
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-beige/5 to-white">
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <Mail className="w-12 h-12 text-anthracite/20 mx-auto mb-3" />
                      <p className="text-sm text-anthracite/60 font-sans">
                        Aucun message dans cette conversation
                      </p>
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderRole === "member" ? "justify-start" : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl p-3 shadow-sm ${
                            msg.senderRole === "member"
                              ? "bg-white border border-beige/50"
                              : "bg-gradient-to-br from-terracotta/70 to-gold/60 text-white"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <p className={`text-xs font-medium font-sans ${
                              msg.senderRole === "member" ? "text-anthracite" : "text-white/90"
                            }`}>
                              {msg.senderName}
                            </p>
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                msg.senderRole === "member"
                                  ? "bg-terracotta/10 text-terracotta/80"
                                  : "bg-white/20 text-white"
                              }`}
                            >
                              {msg.senderRole === "member" ? "Membre" : "Expert"}
                            </span>
                          </div>
                          
                          {msg.cc && msg.cc.length > 0 && (
                            <div className="mb-2 text-xs opacity-70">
                              CC: {msg.cc.join(", ")}
                            </div>
                          )}

                          <p className={`text-sm font-sans mb-1 ${
                            msg.senderRole === "member" ? "text-anthracite" : "text-white"
                          }`}>
                            {msg.message}
                          </p>

                          {/* Pièces jointes */}
                          {msg.attachments && msg.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {msg.attachments.map((att) => {
                                const Icon = getFileIcon(att.type);
                                return (
                                  <a
                                    key={att.id}
                                    href={att.url}
                                    download
                                    className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                      msg.senderRole === "member"
                                        ? "bg-beige/10 hover:bg-beige/20"
                                        : "bg-white/10 hover:bg-white/20"
                                    }`}
                                  >
                                    <Icon className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-xs flex-1 truncate">{att.name}</span>
                                    <Download className="w-3 h-3 flex-shrink-0" />
                                  </a>
                                );
                              })}
                            </div>
                          )}

                          <p className={`text-xs font-sans mt-1 ${
                            msg.senderRole === "member" ? "text-anthracite/50" : "text-white/70"
                          }`}>
                            {new Date(msg.sentAt).toLocaleString("fr-FR")}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 text-anthracite/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-anthracite font-serif mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-sm text-anthracite/60 font-sans">
                    Choisissez une conversation dans la liste pour voir les messages
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
