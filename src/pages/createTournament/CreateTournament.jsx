import { useState } from "react";
import "./CreateTournament.css";
import TeamsCountSelector from "./TeamCountSelector";
import TeamsNames from "./TeamsNames";

const CreateTournament = () => {
  const [state, setState] = useState({
    options: [2, 4, 8, 16],
    numberOfTeams: 4,
    teams: Array(16).fill('', 0),
  });

  const onTeamsCountChange = newValue => {
    setState({...state, numberOfTeams: newValue});
  }

  const onTeamNameChange = (index, newName) => {
    const teams = state.teams;
    teams.splice(index, 1, newName);
    setState({...state, teams});
  }

  return (
    <section className="createTournament">
      <form className="tournamentCreation">
        <TeamsCountSelector options={state.options} checkedValue={state.numberOfTeams} changeSelection={onTeamsCountChange}/>
        <TeamsNames teams={state.teams} onChange={onTeamNameChange} teamsCount={state.numberOfTeams}/>
      </form>
    </section>
  );
};

export default CreateTournament;
