import React from 'react';
import ViewChecklistModal from '../components/ViewChecklistModal';
import CreateChecklistModal from '../components/CreateChecklistModal';

function Checklist() {
  return (
    <div className="checklist">
      <h1>Checklist</h1>
      <p>This is the checklist page.</p>
      <ViewChecklistModal />
      <CreateChecklistModal />
    </div>
  );
} export default Checklist;