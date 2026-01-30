import { Calendar, ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react";
import { useState } from "react";

interface AgendaViewPageProps {
  primaryColor: string;
  secondaryColor: string;
  isMacbook: boolean;
}

export default function AgendaViewPage({ primaryColor, secondaryColor }: AgendaViewPageProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysOfWeek = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8h to 19h

  const appointments = [
    { day: 1, hour: 9, duration: 1, patient: "Amina K.", type: "Thérapie cognitive" },
    { day: 1, hour: 11, duration: 0.5, patient: "Jean-Pierre L.", type: "Suivi" },
    { day: 2, hour: 10, duration: 1, patient: "Fatoumata D.", type: "Première consultation" },
    { day: 2, hour: 14, duration: 0.75, patient: "Omar T.", type: "Téléconsultation" },
    { day: 3, hour: 9, duration: 1, patient: "Grace M.", type: "Thérapie" },
    { day: 4, hour: 15, duration: 1, patient: "Kwame A.", type: "Suivi mensuel" },
    { day: 5, hour: 11, duration: 0.5, patient: "Nadia B.", type: "Consultation" }
  ];

  const getMonthYear = () => {
    return currentDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 capitalize">{getMonthYear()}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() - 1);
                setCurrentDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium hover:bg-gray-100 rounded-lg transition-colors"
            >
              Aujourd'hui
            </button>
            <button
              onClick={() => {
                const newDate = new Date(currentDate);
                newDate.setMonth(newDate.getMonth() + 1);
                setCurrentDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <button
            className="flex items-center gap-2 px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-all"
            style={{ backgroundColor: primaryColor }}
          >
            <Plus size={20} />
            Nouveau rendez-vous
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-8 border-b border-gray-200">
          <div className="p-4 text-sm font-semibold text-gray-600">Heure</div>
          {daysOfWeek.map((day, index) => (
            <div key={index} className="p-4 text-center text-sm font-semibold text-gray-900 border-l border-gray-200">
              {day}
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 border-b border-gray-200">
              <div className="p-4 text-sm text-gray-600 border-r border-gray-200">
                {hour}:00
              </div>
              {daysOfWeek.map((_, dayIndex) => {
                const appointment = appointments.find(
                  (apt) => apt.day === dayIndex + 1 && apt.hour === hour
                );
                return (
                  <div
                    key={dayIndex}
                    className="relative p-2 border-l border-gray-200 hover:bg-gray-50 transition-colors min-h-[80px]"
                  >
                    {appointment && (
                      <div
                        className="absolute inset-2 p-2 rounded-lg text-white text-xs overflow-hidden"
                        style={{
                          backgroundColor: primaryColor,
                          height: `${appointment.duration * 80}px`
                        }}
                      >
                        <div className="font-semibold">{appointment.patient}</div>
                        <div className="opacity-90">{appointment.type}</div>
                        <div className="flex items-center gap-1 mt-1 opacity-75">
                          <Clock size={10} />
                          {appointment.duration === 1 ? "60 min" : `${appointment.duration * 60} min`}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}