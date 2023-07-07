import { useState } from "react";
import "./CreateTournament.css";
import TeamsCountSelector from "./TeamCountSelector";
import TeamsNames from "./TeamsNames";
import TournamentSection from "./TournamentSection";

const CreateTournament = () => {
  const [state, setState] = useState({
    options: [2, 4, 8, 16],
    numberOfTeams: 4,
    teams: Array(16).fill('', 0),
    tournamentName: '',
  });

  const onTeamsCountChange = newValue => {
    setState({...state, numberOfTeams: newValue});
  }

  const onTeamNameChange = (index, newName) => {
    const teams = state.teams;
    teams.splice(index, 1, newName);
    setState({...state, teams});
  }

  const onTournamentNameChange = tournamentName => {
    setState({...state, tournamentName})
  }

  const onCreateTournament = (event) => {
    event.preventDefault();
    console.log(state);
  }

  return (
    <section className="createTournament">
      <form className="tournamentCreation">
        <TeamsCountSelector options={state.options} checkedValue={state.numberOfTeams} changeSelection={onTeamsCountChange}/>
        <TeamsNames teams={state.teams} onChange={onTeamNameChange} teamsCount={state.numberOfTeams}/>
        <TournamentSection tournamentName={state.tournamentName} onTournamentNameChange={onTournamentNameChange} onCreateTournament={onCreateTournament}/>
      </form>
    </section>
  );
};

export default CreateTournament;
