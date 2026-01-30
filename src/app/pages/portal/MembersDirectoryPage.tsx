import { Search, Filter, User, Phone, Mail, MapPin, DollarSign } from "lucide-react";
import { useState } from "react";
import { getPreferredCurrency, formatCurrency, CurrencyCode } from "@/app/utils/currency";

interface MembersDirectoryPageProps {
  primaryColor: string;
  secondaryColor: string;
  isMacbook: boolean;
}

export default function MembersDirectoryPage({ primaryColor, secondaryColor }: MembersDirectoryPageProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const members = [
    { 
      name: "Amina Konate", 
      location: "Abidjan, Côte d'Ivoire", 
      phone: "+225 07 45 89 23", 
      email: "amina.konate@example.com", 
      status: "Actif", 
      consultations: 12,
      subscription: "Premium",
      monthlyValue: 45000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Jean-Pierre Lumumba", 
      location: "Kinshasa, RD Congo", 
      phone: "+243 81 234 567", 
      email: "jp.lumumba@example.com", 
      status: "Actif", 
      consultations: 8,
      subscription: "Essentiel",
      monthlyValue: 42,
      currency: "USD" as CurrencyCode
    },
    { 
      name: "Fatoumata Diallo", 
      location: "Dakar, Sénégal", 
      phone: "+221 77 345 678", 
      email: "f.diallo@example.com", 
      status: "Actif", 
      consultations: 15,
      subscription: "Excellence",
      monthlyValue: 75000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Kwame Asante", 
      location: "Abidjan, Côte d'Ivoire", 
      phone: "+225 05 678 901", 
      email: "k.asante@example.com", 
      status: "Actif", 
      consultations: 6,
      subscription: "Essentiel",
      monthlyValue: 25000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Grace Mutombo", 
      location: "Kinshasa, RD Congo", 
      phone: "+243 82 789 012", 
      email: "g.mutombo@example.com", 
      status: "Actif", 
      consultations: 11,
      subscription: "Premium",
      monthlyValue: 75,
      currency: "USD" as CurrencyCode
    },
    { 
      name: "Omar Touré", 
      location: "Dakar, Sénégal", 
      phone: "+221 78 890 123", 
      email: "o.toure@example.com", 
      status: "Actif", 
      consultations: 9,
      subscription: "Premium",
      monthlyValue: 45000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Nadia Bamba", 
      location: "Abidjan, Côte d'Ivoire", 
      phone: "+225 01 234 567", 
      email: "n.bamba@example.com", 
      status: "En attente", 
      consultations: 3,
      subscription: "Essentiel",
      monthlyValue: 25000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Serge Kabila", 
      location: "Kinshasa, RD Congo", 
      phone: "+243 84 567 890", 
      email: "s.kabila@example.com", 
      status: "Actif", 
      consultations: 14,
      subscription: "Excellence",
      monthlyValue: 125,
      currency: "USD" as CurrencyCode
    },
    { 
      name: "Aïcha Ndiaye", 
      location: "Dakar, Sénégal", 
      phone: "+221 76 123 456", 
      email: "a.ndiaye@example.com", 
      status: "Actif", 
      consultations: 7,
      subscription: "Essentiel",
      monthlyValue: 25000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Moussa Traoré", 
      location: "Abidjan, Côte d'Ivoire", 
      phone: "+225 07 89 01 23", 
      email: "m.traore@example.com", 
      status: "Actif", 
      consultations: 10,
      subscription: "Premium",
      monthlyValue: 45000,
      currency: "XOF" as CurrencyCode
    },
    { 
      name: "Christelle Tshisekedi", 
      location: "Kinshasa, RD Congo", 
      phone: "+243 85 678 901", 
      email: "c.tshisekedi@example.com", 
      status: "Actif", 
      consultations: 13,
      subscription: "Excellence",
      monthlyValue: 125,
      currency: "USD" as CurrencyCode
    },
    { 
      name: "Abdoulaye Seck", 
      location: "Dakar, Sénégal", 
      phone: "+221 77 890 234", 
      email: "a.seck@example.com", 
      status: "Actif", 
      consultations: 5,
      subscription: "Essentiel",
      monthlyValue: 25000,
      currency: "XOF" as CurrencyCode
    }
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un membre..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{ focusRing: primaryColor }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={20} />
            Filtres
          </button>
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: primaryColor }}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  member.status === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {member.status}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {member.location}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                {member.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                {member.email}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Abonnement</span>
                <span className="font-semibold text-gray-900">{member.subscription}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Valeur mensuelle</span>
                <span className="font-semibold text-terracotta flex items-center gap-1">
                  <DollarSign size={14} />
                  {formatCurrency(member.monthlyValue, member.currency, { showSymbol: true, compact: true })}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{member.consultations}</span> consultations
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}