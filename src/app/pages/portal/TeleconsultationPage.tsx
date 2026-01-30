import { 
  Video, 
  Mic, 
  MicOff, 
  VideoOff, 
  Phone, 
  Monitor,
  MonitorOff,
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Camera,
  AlertTriangle
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface TeleconsultationPageProps {
  primaryColor: string;
  secondaryColor: string;
  isMacbook: boolean;
}

interface Message {
  sender: "expert" | "member";
  text: string;
  time: string;
}

export default function TeleconsultationPage({ primaryColor }: TeleconsultationPageProps) {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isAudioOnly, setIsAudioOnly] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const screenVideoRef = useRef<HTMLVideoElement>(null);

  const upcomingSessions = [
    { 
      time: "09:00", 
      patient: "Amina K.", 
      duration: "50 min", 
      status: "confirmed" as const,
      type: "Première consultation",
      city: "Kinshasa"
    },
    { 
      time: "11:00", 
      patient: "Jean-Pierre L.", 
      duration: "30 min", 
      status: "confirmed" as const,
      type: "Suivi mensuel",
      city: "Kinshasa"
    },
    { 
      time: "14:30", 
      patient: "Fatoumata D.", 
      duration: "60 min", 
      status: "pending" as const,
      type: "Thérapie de couple",
      city: "Dakar"
    },
    { 
      time: "16:00", 
      patient: "Omar T.", 
      duration: "45 min", 
      status: "confirmed" as const,
      type: "Consultation anxiété",
      city: "Dakar"
    }
  ];

  // Démarrer le flux vidéo local
  const startVideo = async () => {
    setPermissionError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: isAudioOnly ? false : { width: 1280, height: 720 },
        audio: true,
      });
      setStream(mediaStream);
      if (localVideoRef.current && !isAudioOnly) {
        localVideoRef.current.srcObject = mediaStream;
      }
      setIsVideoOn(!isAudioOnly);
      return true; // Succès
    } catch (error: any) {
      // Gestion des différents types d'erreurs
      if (error.name === 'NotAllowedError') {
        setPermissionError("Vous avez refusé l'accès à la caméra/micro. Pour activer, cliquez sur l'icône de caméra dans la barre d'adresse de votre navigateur.");
      } else if (error.name === 'NotFoundError') {
        setPermissionError("Aucune caméra ou micro détecté. Vérifiez que vos périphériques sont bien connectés.");
      } else if (error.name === 'NotReadableError') {
        setPermissionError("Votre caméra/micro est déjà utilisé par une autre application. Fermez les autres applications et réessayez.");
      } else {
        setPermissionError("Erreur d'accès aux périphériques. Essayez le mode audio uniquement.");
      }
      return false; // Échec
    }
  };

  // Démarrer en mode audio uniquement
  const startAudioOnly = async () => {
    setIsAudioOnly(true);
    setPermissionError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      setStream(mediaStream);
      setIsVideoOn(false);
      setIsInCall(true);
      setMessages([
        {
          sender: "member",
          text: "Bonjour Docteur, je suis prêt pour la consultation.",
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    } catch (error: any) {
      console.error("Erreur d'accès au micro:", error);
      if (error.name === 'NotAllowedError') {
        setPermissionError("Accès au micro refusé. Vérifiez les autorisations de votre navigateur.");
      } else {
        setPermissionError("Impossible d'accéder au micro. Veuillez réessayer.");
      }
    }
  };

  // Arrêter le flux vidéo
  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
    }
  };

  // Toggle vidéo
  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
      }
    }
  };

  // Toggle micro
  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  // Partage d'écran
  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        setScreenStream(displayStream);
        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = displayStream;
        }
        setIsScreenSharing(true);

        // Arrêter le partage d'écran quand l'utilisateur clique sur "Arrêter le partage"
        displayStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          setScreenStream(null);
        };
      } catch (error) {
        console.error("Erreur de partage d'écran:", error);
      }
    } else {
      if (screenStream) {
        screenStream.getTracks().forEach(track => track.stop());
        setScreenStream(null);
      }
      setIsScreenSharing(false);
    }
  };

  // Démarrer l'appel
  const startCall = async () => {
    const success = await startVideo();
    if (success) {
      setIsInCall(true);
      // Simuler un message de connexion
      setMessages([
        {
          sender: "member",
          text: "Bonjour Docteur, je suis prêt pour la consultation.",
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
    }
    // Si échec, on reste sur la salle d'attente avec le message d'erreur affiché
  };

  // Terminer l'appel
  const endCall = () => {
    stopVideo();
    setIsInCall(false);
    setShowChat(false);
    setMessages([]);
    setIsScreenSharing(false);
  };

  // Envoyer un message
  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          sender: "expert",
          text: newMessage,
          time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
        }
      ]);
      setNewMessage("");
    }
  };

  // Cleanup au démontage
  useEffect(() => {
    return () => {
      stopVideo();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Video Container */}
      <div className="bg-anthracite rounded-2xl overflow-hidden shadow-2xl" style={{ height: isInCall ? "600px" : "500px" }}>
        {isInCall ? (
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-anthracite to-gray-900">
            {/* Vidéo principale (membre simulé) */}
            <div className="relative w-full h-full flex items-center justify-center">
              {isScreenSharing && screenStream ? (
                <video
                  ref={screenVideoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-white text-center">
                  <div className="w-32 h-32 rounded-full bg-terracotta/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl font-serif">A</span>
                  </div>
                  <p className="text-2xl mb-2 font-sans">Amina K.</p>
                  <p className="text-sm text-gray-400 font-sans">Consultation en cours • 12:34</p>
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-gray-400">Connexion stable</span>
                  </div>
                </div>
              )}
            </div>

            {/* Vidéo locale (vous) */}
            <div className="absolute top-4 right-4 w-64 h-48 bg-gray-900 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl">
              {isVideoOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover mirror"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white bg-gray-800">
                  <div className="text-center">
                    <VideoOff size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-xs font-sans">Caméra désactivée</p>
                  </div>
                </div>
              )}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded font-sans">Vous</span>
                {!isMicOn && (
                  <div className="bg-red-500 p-1 rounded">
                    <MicOff size={12} />
                  </div>
                )}
              </div>
            </div>

            {/* Contrôles */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-4 rounded-full">
              <button
                onClick={toggleMic}
                className={`p-4 rounded-full transition-all ${
                  isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={isMicOn ? "Couper le micro" : "Activer le micro"}
              >
                {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>
              
              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full transition-all ${
                  isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
                title={isVideoOn ? "Désactiver la caméra" : "Activer la caméra"}
              >
                {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
              </button>

              <button
                onClick={toggleScreenShare}
                className={`p-4 rounded-full transition-all ${
                  isScreenSharing ? 'bg-terracotta hover:bg-terracotta/90' : 'bg-white/10 hover:bg-white/20'
                } text-white`}
                title={isScreenSharing ? "Arrêter le partage" : "Partager l'écran"}
              >
                {isScreenSharing ? <MonitorOff size={24} /> : <Monitor size={24} />}
              </button>

              <button
                onClick={() => setShowChat(!showChat)}
                className="relative p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                title="Chat"
              >
                <MessageSquare size={24} />
                {messages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta rounded-full flex items-center justify-center text-xs font-sans">
                    {messages.length}
                  </span>
                )}
              </button>

              <button
                onClick={endCall}
                className="p-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-all ml-2"
                title="Terminer l'appel"
              >
                <Phone size={24} className="rotate-135" />
              </button>
            </div>

            {/* Chat Panel */}
            {showChat && (
              <div className="absolute top-4 left-4 w-80 h-[calc(100%-100px)] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-beige/30 flex items-center justify-between">
                  <h3 className="font-sans font-semibold text-anthracite">Chat</h3>
                  <button
                    onClick={() => setShowChat(false)}
                    className="text-gray-500 hover:text-anthracite"
                  >
                    ×
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === "expert" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          msg.sender === "expert"
                            ? "bg-terracotta text-white"
                            : "bg-beige/30 text-anthracite"
                        }`}
                      >
                        <p className="text-sm font-sans">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1 font-sans">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-beige/30 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Écrivez un message..."
                    className="flex-1 px-3 py-2 border border-beige/30 rounded-lg focus:outline-none focus:border-terracotta/50 text-sm font-sans"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-terracotta text-white rounded-lg hover:bg-opacity-90 transition-all font-sans"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Envoyer
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white bg-gradient-to-br from-anthracite to-gray-900 p-8">
            <div className="text-center max-w-xl">
              <div className="w-20 h-20 bg-terracotta/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Video size={40} className="text-terracotta" />
              </div>
              <h3 className="text-3xl font-serif mb-3 text-white">Salle d'attente virtuelle</h3>
              <p className="text-gray-400 mb-8 font-sans">
                Mode Offline-First • Chiffrement de bout en bout • Conformité RGPD
              </p>

              {/* Erreur de permission */}
              {permissionError && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 text-left">
                  <div className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-yellow-200 font-sans mb-3">{permissionError}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => {
                            setPermissionError(null);
                            startCall();
                          }}
                          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-sans transition-all"
                        >
                          Réessayer
                        </button>
                        <button
                          onClick={startAudioOnly}
                          className="px-4 py-2 bg-terracotta hover:bg-terracotta/90 rounded-lg text-sm font-sans transition-all flex items-center justify-center gap-2"
                          style={{ backgroundColor: primaryColor }}
                        >
                          <Mic size={16} />
                          Mode audio uniquement
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={startCall}
                  className="px-8 py-4 rounded-xl text-white font-sans font-semibold hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Camera size={20} />
                  Démarrer avec vidéo
                </button>
                <button
                  onClick={startAudioOnly}
                  className="px-8 py-4 rounded-xl text-white font-sans font-semibold hover:bg-white/20 transition-all border-2 border-white/30 flex items-center justify-center gap-2"
                >
                  <Mic size={20} />
                  Audio seulement
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-6 font-sans">
                💡 Si la caméra ne fonctionne pas, essayez le mode audio uniquement
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-2xl p-6 border border-beige/30 shadow-sm">
        <h3 className="text-2xl font-serif text-anthracite mb-6 flex items-center gap-3">
          <Users size={24} style={{ color: primaryColor }} />
          Sessions programmées aujourd'hui
        </h3>
        <div className="space-y-4">
          {upcomingSessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-5 rounded-xl border border-beige/30 hover:border-terracotta/30 hover:shadow-md transition-all bg-gradient-to-r from-white to-beige/5"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center min-w-[70px]">
                  <Clock size={16} className="text-terracotta mb-1" />
                  <div className="text-lg font-semibold text-anthracite font-sans">{session.time}</div>
                </div>
                <div className="border-l border-beige/30 pl-6">
                  <div className="font-semibold text-anthracite font-sans text-lg">{session.patient}</div>
                  <div className="text-sm text-muted-foreground font-sans mt-1">{session.type}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-muted-foreground font-sans">⏱ {session.duration}</span>
                    <span className="text-xs text-muted-foreground font-sans">📍 {session.city}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {session.status === "confirmed" ? (
                  <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm text-green-700 font-sans font-medium">Confirmé</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg">
                    <AlertCircle size={16} className="text-yellow-600" />
                    <span className="text-sm text-yellow-700 font-sans font-medium">En attente</span>
                  </div>
                )}
                <button
                  onClick={startCall}
                  className="px-6 py-3 rounded-xl text-white font-sans font-medium hover:opacity-90 transition-all shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  Rejoindre
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info card */}
      <div className="bg-gradient-to-r from-terracotta/10 to-gold/10 rounded-2xl p-6 border border-terracotta/20">
        <h4 className="text-lg font-serif text-anthracite mb-3">📋 Fonctionnalités de téléconsultation</h4>
        <ul className="space-y-2 text-sm text-muted-foreground font-sans">
          <li className="flex items-start gap-2">
            <span className="text-terracotta">✓</span>
            <span>Vidéo HD en temps réel avec votre caméra</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-terracotta">✓</span>
            <span>Contrôles audio/vidéo fonctionnels</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-terracotta">✓</span>
            <span>Partage d'écran pour documents thérapeutiques</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-terracotta">✓</span>
            <span>Chat textuel intégré pour notes et ressources</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-terracotta">✓</span>
            <span>Enregistrement automatique dans le dossier FHIR (après consentement)</span>
          </li>
        </ul>
      </div>
    </div>
  );
}