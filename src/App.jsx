import React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AppProvider } from './context/AppContext.jsx';
import Header from './components/layout/Header.jsx';
import ViewRouter from './components/layout/ViewRouter.jsx';
import SearchModal from './components/common/SearchModal.jsx';
import MobileDrawer from './components/layout/MobileDrawer.jsx';

export default function App() {
    return (
        <AppProvider>
            <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)]">
                <Header />
                <ViewRouter />
                <SearchModal />
                <MobileDrawer />
                <SpeedInsights />
            </div>
        </AppProvider>
    );
}
