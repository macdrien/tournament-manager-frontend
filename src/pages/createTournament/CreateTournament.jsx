import { useState } from "react";
import { useDispatch } from "react-redux";

import { createTournament } from "../../reducers/tournamentSlice";

import TeamsCountSelector from "./TeamCountSelector";
import TeamsNames from "./TeamsNames";
import TournamentSection from "./TournamentSection";

import "./CreateTournament.css";

const CreateTournament = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    options: [2, 4, 8, 16],
    numberOfTeams: 4,
    teams: Array(16).fill("", 0),
    tournamentName: "",
    isFormValid: false,
  });

  const validateForm = () => {
    const { tournamentName, teams, numberOfTeams } = state;
    return !!(
      tournamentName?.length &&
      teams.slice(0, numberOfTeams).filter((team) => team?.length).length
    );
  };

  const onTeamsCountChange = (newValue) => {
    const isFormValid = validateForm();
    setState({ ...state, numberOfTeams: newValue, isFormValid });
  };

  const onTeamNameChange = (index, newName) => {
    const teams = state.teams;
    teams.splice(index, 1, newName);
    const isFormValid = validateForm();
    setState({ ...state, teams, isFormValid });
  };

  const onTournamentNameChange = (tournamentName) => {
    const isFormValid = validateForm();
    setState({ ...state, tournamentName, isFormValid });
  };

  const onCreateTournament = (event) => {
    event.preventDefault();
    dispatch(
      createTournament({
        name: state.tournamentName,
        teams: state.teams.slice(0, state.numberOfTeams),
      })
    );
  };

  return (
    <section className="createTournament">
      <form className="tournamentCreation">
        <TeamsCountSelector
          options={state.options}
          checkedValue={state.numberOfTeams}
          changeSelection={onTeamsCountChange}
        />
        <TeamsNames
          teams={state.teams}
          onChange={onTeamNameChange}
          teamsCount={state.numberOfTeams}
        />
        <TournamentSection
          tournamentName={state.tournamentName}
          onTournamentNameChange={onTournamentNameChange}
          onCreateTournament={onCreateTournament}
          isGenerationEnable={state.isFormValid}
        />
      </form>
    </section>
  );
};

export default CreateTournament;
