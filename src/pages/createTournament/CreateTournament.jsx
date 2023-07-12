import { useState } from "react";

import TeamsCountSelector from "./TeamCountSelector";
import TeamsNames from "./TeamsNames";
import TournamentSection from "./TournamentSection";

import "./CreateTournament.css";
import { useNavigate } from "react-router-dom";

const CreateTournament = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    options: [2, 4, 8, 16],
    numberOfTeams: 4,
    teams: Array(16).fill("", 0),
    tournamentName: "",
    isFormValid: false,
    isFormEmpty: true,
  });

  const checkFormEmpty = (formState = state) => {
    const { tournamentName, teams, numberOfTeams } = formState;
    return !!(
      !tournamentName?.length &&
      !teams.slice(0, numberOfTeams).filter((team) => team?.length).length
    );
  };

  const validateForm = (formState = state) => {
    const { tournamentName, teams, numberOfTeams } = formState;
    return !!(
      tournamentName?.length &&
      teams.slice(0, numberOfTeams).filter((team) => team?.length).length
    );
  };

  const onTeamsCountChange = (newValue) => {
    const newFormState = { ...state, numberOfTeams: newValue };
    const isFormValid = validateForm(newFormState);
    const isFormEmpty = checkFormEmpty(newFormState);

    setState({ ...newFormState, isFormValid, isFormEmpty });
  };

  const onTeamNameChange = (index, newName) => {
    const teams = state.teams;
    teams.splice(index, 1, newName);

    const newFormState = { ...state, teams };
    const isFormValid = validateForm(newFormState);
    const isFormEmpty = checkFormEmpty(newFormState);

    setState({ ...newFormState, isFormValid, isFormEmpty });
  };

  const onTournamentNameChange = (tournamentName) => {
    const newFormState = { ...state, tournamentName };
    const isFormValid = validateForm(newFormState);
    const isFormEmpty = checkFormEmpty(newFormState);

    setState({ ...newFormState, isFormValid, isFormEmpty });
  };

  const onCreateTournament = (event) => {
    event.preventDefault();
    navigate(`/tournament/${state.tournamentName}`);
  };

  const onResetClick = () => {
    setState({
      ...state,
      teams: Array(16).fill("", 0),
      tournamentName: "",
      isFormValid: false,
      isFormEmpty: true,
    });
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
          onResetClickProp={onResetClick}
          isFormEmpty={state.isFormEmpty}
        />
      </form>
    </section>
  );
};

export default CreateTournament;
