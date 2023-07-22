import { useState } from 'react';
import './menu.css'

export function Menu() {
    const [draftId, setDraftId] = useState("");

    return (
      <div className="main-menu">
        <input
          className="draft-id-input"
          type="text"
          value={draftId}
          placeholder="DRAFT ID"
          onChange={(e) => setDraftId(e.target.value)}
        />
        <a className="start-button" href={`draft/${draftId}`}>START</a>
      </div>
    );
}