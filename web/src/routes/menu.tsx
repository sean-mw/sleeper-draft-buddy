import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './menu.css'
import { isValidDraftId } from '../util/sleeper';

export function Menu() {
    const navigate = useNavigate();
    const [draftId, setDraftId] = useState("");

    function handleStart(id: string) {
      isValidDraftId(id)
        .then((isValid) => {
          if (isValid) {
            navigate(`/draft/${id}`);
          } else {
            alert(`No draft with ID ${id} found`);
            setDraftId("");
          }
        })
        .catch(() => console.error);
    }

    return (
      <div className="main-menu">
        <input
          className="draft-id-input"
          type="text"
          value={draftId}
          placeholder="DRAFT ID"
          onChange={(e) => setDraftId(e.target.value)}
        />
        <button className="start-button" onClick={() => handleStart(draftId)}>
          START
        </button>
      </div>
    );
}