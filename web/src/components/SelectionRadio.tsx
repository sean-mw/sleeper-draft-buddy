import { Position } from "../util/player";
import './SelectionRadio.css';

interface SelectionRadioProps {
    setRankingSelection: React.Dispatch<React.SetStateAction<Position>>;
}

export function SelectionRadio(props: SelectionRadioProps) {

    function rankingSelectionChange(event: React.FormEvent) {
        const target = event.target as HTMLInputElement;
        const selection = target.value as Position;
        props.setRankingSelection(selection);
    }

    return (
        <div className="radio" onChange={rankingSelectionChange}>
            <input type="radio" id="ALL" name="position" value={Position.ALL} defaultChecked />
            <label htmlFor="ALL">ALL</label>

            <input type="radio" id="WR" name="position" value={Position.WR} />
            <label htmlFor="WR">WR</label>

            <input type="radio" id="RB" name="position" value={Position.RB} />
            <label htmlFor="RB">RB</label>

            <input type="radio" id="TE" name="position" value={Position.TE} />
            <label htmlFor="TE">TE</label>
            
            <input type="radio" id="QB" name="position" value={Position.QB} />
            <label htmlFor="QB">QB</label>
        </div>
    );
}