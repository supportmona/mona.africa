import { Info, Copy, Check } from "lucide-react";
import { useState } from "react";

export default function TestCredentialsBanner() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const email = "dr.alice.obambi@monafrica.net";
  const password = "Mona2024!";

  const copyToClipboard = (text: string, type: 'email' | 'password') => {
    // Méthode alternative compatible avec tous les navigateurs
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
      document.execCommand('copy');
      if (type === 'email') {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    } finally {
      document.body.removeChild(textarea);
    }
  };

  return (
    <div className="max-w-md mx-auto mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
      <div className="flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h4 className="font-semibold text-blue-900 mb-2">Compte de test disponible</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
              <div>
                <div className="text-xs text-blue-700 font-medium">Email</div>
                <div className="text-blue-900 font-mono text-xs">{email}</div>
              </div>
              <button
                onClick={() => copyToClipboard(email, 'email')}
                className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                title="Copier l'email"
              >
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-blue-600" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-between bg-white/60 rounded-lg px-3 py-2">
              <div>
                <div className="text-xs text-blue-700 font-medium">Mot de passe</div>
                <div className="text-blue-900 font-mono text-xs">{password}</div>
              </div>
              <button
                onClick={() => copyToClipboard(password, 'password')}
                className="p-1.5 hover:bg-blue-100 rounded transition-colors"
                title="Copier le mot de passe"
              >
                {copiedPassword ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-blue-600" />
                )}
              </button>
            </div>
          </div>
          <p className="text-xs text-blue-700 mt-2">
            ✨ Utilisez ces identifiants pour découvrir le portail expert
          </p>
        </div>
      </div>
    </div>
  );
}