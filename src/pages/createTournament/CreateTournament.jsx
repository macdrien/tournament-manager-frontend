import { useState } from "react";
import { Form, redirect } from "react-router-dom";

import TeamsCountSelector from "./TeamCountSelector";
import TeamsNames from "./TeamsNames";
import TournamentSection from "./TournamentSection";

import "./CreateTournament.css";

const actionCreate = async ({ request, _params }) => {
  const formData = await request.formData();
  let tournament = Object.fromEntries(formData);
  tournament.teams = Object.entries(tournament)
    .filter(([name, _value]) => name.startsWith("teams["))
    .map(([name, value]) => {
      delete tournament[name];
      return value;
    });
  tournament = encodeURI(JSON.stringify(tournament));
  return redirect(`/tournament?tournament=${tournament}`);
};

const CreateTournament = () => {
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
      <Form className="tournamentCreation" method="post">
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
          isGenerationEnable={state.isFormValid}
          onResetClickProp={onResetClick}
          isFormEmpty={state.isFormEmpty}
        />
      </Form>
    </section>
  );
};

export { actionCreate };

export default CreateTournament;
