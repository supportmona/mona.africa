import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from '@/app/routes';
import { AuthProvider } from '@/app/contexts/AuthContext';
import { ExpertAuthProvider } from '@/app/contexts/ExpertAuthContext';
import { B2BAuthProvider } from '@/app/contexts/B2BAuthContext';
import { Toaster } from '@/app/components/ui/sonner';
import '@/styles/index.css';
import '@/styles/tailwind.css';
import '@/styles/theme.css';
import '@/styles/fonts.css';
import '@/styles/teleconsultation.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <ExpertAuthProvider>
        <B2BAuthProvider>
          <RouterProvider router={router} />
          <Toaster />
        </B2BAuthProvider>
      </ExpertAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
