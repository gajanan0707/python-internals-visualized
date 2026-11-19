import React from 'react';
import { useAppContext } from '../../context/AppContext.jsx';
import LearnView from '../views/learn/LearnView.jsx';
import PracticeView from '../views/practice/PracticeView.jsx';
import LabView from '../views/lab/LabView.jsx';
import CheatsheetsView from '../views/cheatsheets/CheatsheetsView.jsx';

export function ViewRouter() {
    const { activeTab } = useAppContext();

    switch (activeTab) {
        case 'learn':
            return <LearnView />;
        case 'practice':
            return <PracticeView />;
        case 'lab':
            return <LabView />;
        case 'cheatsheets':
            return <CheatsheetsView />;
        default:
            return <LearnView />;
    }
}

export default ViewRouter;
