/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LoginView } from './components/LoginView';
import { WorkspaceView } from './components/WorkspaceView';
import { BackendHealthModal } from './components/BackendHealthModal';

export default function App() {
  const [currentView, setCurrentView] = useState<'login' | 'workspace'>('login');
  const [isHealthModalOpen, setIsHealthModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-[#0b131f]">
      {currentView === 'login' ? (
        <LoginView
          onLoginSuccess={() => setCurrentView('workspace')}
          onOpenHealthModal={() => setIsHealthModalOpen(true)}
        />
      ) : (
        <WorkspaceView
          onLogout={() => setCurrentView('login')}
          onOpenHealthModal={() => setIsHealthModalOpen(true)}
        />
      )}

      {/* Modal de Diagnóstico da Fundação do Backend (GET /api/health) */}
      <BackendHealthModal
        isOpen={isHealthModalOpen}
        onClose={() => setIsHealthModalOpen(false)}
      />
    </div>
  );
}
