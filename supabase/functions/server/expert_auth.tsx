import { createClient } from "jsr:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

/**
 * Crée un nouveau compte expert avec email @monafrica.net
 */
export async function signupExpert(
  email: string,
  password: string,
  expertData: {
    firstName: string;
    lastName: string;
    specialty: string;
    licenseNumber: string;
    phone?: string;
  }
) {
  // Validation de l'email @monafrica.net
  const allowedDomains = ["@monafrica.net"];
  const isValidDomain = allowedDomains.some(domain => email.endsWith(domain));
  
  if (!isValidDomain) {
    console.error("❌ Domaine email invalide:", email);
    return {
      error: `Email invalide. Seuls les emails ${allowedDomains.join(", ")} sont autorisés pour les experts.`,
      data: null,
    };
  }

  try {
    console.log("🔐 Création compte Supabase Auth pour:", email);
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    // D'abord, vérifier si l'utilisateur existe déjà
    console.log("🔍 Vérification si l'utilisateur existe déjà...");
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (!listError && existingUsers) {
      const existingUser = existingUsers.users.find(u => u.email === email);
      
      if (existingUser) {
        console.log("✅ Utilisateur existant trouvé:", existingUser.id);
        
        // Récupérer le profil depuis le KV store
        const existingProfile = await kv.get(`expert:${existingUser.id}`);
        
        if (!existingProfile) {
          // Le profil n'existe pas dans KV, le créer
          console.log("ℹ️ Profil KV manquant, création...");
          const expertProfile = {
            id: existingUser.id,
            email,
            firstName: expertData.firstName,
            lastName: expertData.lastName,
            specialty: expertData.specialty,
            licenseNumber: expertData.licenseNumber,
            phone: expertData.phone || "",
            status: "active",
            createdAt: new Date().toISOString(),
            totalConsultations: 0,
            rating: 0,
            languages: ["Français"],
            availability: {},
          };
          await kv.set(`expert:${existingUser.id}`, expertProfile);
          console.log("✅ Profil KV créé pour utilisateur existant");
          
          return {
            data: {
              user: existingUser,
              profile: expertProfile,
            },
            error: null,
          };
        }
        
        console.log("✅ Profil KV trouvé, retour des données existantes");
        return {
          data: {
            user: existingUser,
            profile: existingProfile,
          },
          error: null,
        };
      }
    }

    // L'utilisateur n'existe pas, le créer
    console.log("🆕 L'utilisateur n'existe pas, création...");
    // Créer l'utilisateur dans Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin
      .createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm car pas de serveur email configuré
        user_metadata: {
          role: "expert",
          firstName: expertData.firstName,
          lastName: expertData.lastName,
          specialty: expertData.specialty,
          licenseNumber: expertData.licenseNumber,
          phone: expertData.phone || "",
        },
      });

    if (authError) {
      console.error("❌ Erreur création utilisateur expert:", authError);
      console.log("🔍 Code erreur:", authError.code);
      console.log("🔍 Message erreur:", authError.message);
      
      return { error: authError.message, data: null };
    }

    console.log("✅ Utilisateur Auth créé:", authData.user.id);

    // Stocker le profil expert dans le KV store
    const expertProfile = {
      id: authData.user.id,
      email,
      firstName: expertData.firstName,
      lastName: expertData.lastName,
      specialty: expertData.specialty,
      licenseNumber: expertData.licenseNumber,
      phone: expertData.phone || "",
      status: "active",
      createdAt: new Date().toISOString(),
      totalConsultations: 0,
      rating: 0,
      languages: ["Français"],
      availability: {},
    };

    await kv.set(`expert:${authData.user.id}`, expertProfile);
    console.log("✅ Profil expert stocké dans KV:", authData.user.id);

    return {
      data: {
        user: authData.user,
        profile: expertProfile,
      },
      error: null,
    };
  } catch (error) {
    console.error("❌ Exception lors de la création du compte expert:", error);
    return {
      error: `Erreur serveur lors de la création du compte: ${error.message}`,
      data: null,
    };
  }
}

/**
 * Connexion d'un expert
 */
export async function loginExpert(email: string, password: string) {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erreur connexion expert:", error);
      return { error: error.message, data: null };
    }

    // Vérifier que l'utilisateur a bien le rôle expert
    const userRole = data.user?.user_metadata?.role;
    if (userRole !== "expert") {
      return {
        error: "Accès refusé. Ce compte n'est pas un compte expert.",
        data: null,
      };
    }

    // Récupérer le profil expert depuis le KV store
    const expertProfile = await kv.get(`expert:${data.user.id}`);

    return {
      data: {
        session: data.session,
        user: data.user,
        profile: expertProfile,
      },
      error: null,
    };
  } catch (error) {
    console.error("Erreur lors de la connexion expert:", error);
    return {
      error: `Erreur serveur lors de la connexion: ${error.message}`,
      data: null,
    };
  }
}

/**
 * Déconnexion d'un expert
 */
export async function logoutExpert(accessToken: string) {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erreur déconnexion expert:", error);
      return { error: error.message, success: false };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error("Erreur lors de la déconnexion expert:", error);
    return {
      error: `Erreur serveur lors de la déconnexion: ${error.message}`,
      success: false,
    };
  }
}

/**
 * Récupérer la session active d'un expert
 */
export async function getExpertSession(accessToken: string) {
  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);

    if (error || !user) {
      return { error: "Session invalide ou expirée", data: null };
    }

    // Vérifier le rôle expert
    if (user.user_metadata?.role !== "expert") {
      return { error: "Utilisateur non autorisé", data: null };
    }

    // Récupérer le profil expert
    const expertProfile = await kv.get(`expert:${user.id}`);

    return {
      data: {
        user,
        profile: expertProfile,
      },
      error: null,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération de la session expert:", error);
    return {
      error: `Erreur serveur lors de la récupération de la session: ${error.message}`,
      data: null,
    };
  }
}

/**
 * Mettre à jour le profil d'un expert
 */
export async function updateExpertProfile(
  expertId: string,
  updates: Partial<{
    phone: string;
    languages: string[];
    availability: Record<string, unknown>;
    bio: string;
  }>
) {
  try {
    const expertProfile = await kv.get(`expert:${expertId}`);

    if (!expertProfile) {
      return { error: "Profil expert introuvable", data: null };
    }

    const updatedProfile = {
      ...expertProfile,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(`expert:${expertId}`, updatedProfile);

    return { data: updatedProfile, error: null };
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil expert:", error);
    return {
      error: `Erreur serveur lors de la mise à jour: ${error.message}`,
      data: null,
    };
  }
}