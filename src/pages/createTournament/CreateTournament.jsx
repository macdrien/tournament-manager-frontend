import { useState } from "react";
import "./CreateTournament.css";
import TeamsCountSelector from "./TeamCountSelector";

const CreateTournament = () => {
  const [state, setState] = useState({
    options: [2, 4, 8, 16],
    checkedValue: 4,
  });

  const changeSelection = newValue => {
    setState({...state, checkedValue: newValue});
  }

  return (
    <section className="createTournament">
      <form className="tournamentCreation">
        <TeamsCountSelector options={state.options} checkedValue={state.checkedValue} changeSelection={changeSelection}/>
      </form>
    </section>
  );
};

export default CreateTournament;
