import { useState } from "react";
import { Form, redirect } from "react-router-dom";

import { random } from "../../utils/math";

import TeamsNumber from "./TeamsNumber";
import TeamsNames from "./TeamsNames";
import TournamentSection from "./TournamentSection";
import PlayersNames from "./PlayersNames";
import PlayersPerTeam from "./PlayersPerTeam.jsx";

import "./CreateTournament.css";

const actionCreate = async ({ request, _params }) => {
  const formData = await request.formData();
  let tournament = Object.fromEntries(formData);

  // Parse data
  tournament.teams = Object.entries(tournament)
    .filter(([name, _value]) => name.startsWith("teams["))
    .map(([name, value]) => {
      delete tournament[name];
      return value;
    });
  tournament.teams.sort();
  for (let counter = 0 ; counter < tournament.teams.length ; counter++) {
    tournament.teams[counter] = {
      name: tournament.teams[counter],
    };
  }

  // Teams generation with players if needed
  tournament.playersPerTeam = Number.parseInt(tournament.playersPerTeam);
  if (1 < tournament.playersPerTeam) {
    const players = Object.entries(tournament)
      .filter(([name, _value]) => name.startsWith("players["))
      .map(([name, value]) => {
        delete tournament[name];
        return value;
      });
    for (let counter = 0 ; counter < tournament.teams.length ; counter++) {
      const playersForTeam = [];
      for (let playersCounter = 0 ; playersCounter < tournament.playersPerTeam ; playersCounter++) {
        const playerIndex = random(players.length);
        playersForTeam.push(players[playerIndex]);
        players.splice(playerIndex, 1);
      }
      playersForTeam.sort();
      tournament.teams[counter].players = playersForTeam;
    }
  }

  tournament = encodeURI(JSON.stringify(tournament));
  return redirect(`/tournament?tournament=${tournament}`);
};

const CreateTournament = () => {
  const [state, setState] = useState({
    teamCountOptions: [2, 4, 8, 16],
    numberOfTeams: 4,
    playersPerTeam: 1,
    players: Array(1).fill("", 0),
    teams: Array(16).fill("", 0),
    tournamentName: "",
    isFormValid: false,
    isFormEmpty: true,
  });

  const checkFormEmpty = (formState = state) => {
    const { tournamentName, players, teams, playersPerTeam, numberOfTeams } = formState;
    return !!(
      !tournamentName?.length &&
      !teams.slice(0, numberOfTeams).filter((team) => team?.length).length &&
      !players.slice(0, playersPerTeam).filter((player) => player?.length).length
    );
  };

  const validateForm = (formState = state) => {
    const { tournamentName, players, teams, playersPerTeam, numberOfTeams } = formState;
    return !!(
      tournamentName?.length &&
      teams.slice(0, numberOfTeams).filter((team) => team?.length).length === numberOfTeams &&
      (
        (
          playersPerTeam !== 1 &&
          players.slice(0, playersPerTeam * numberOfTeams).filter((player) => player?.length).length === playersPerTeam * numberOfTeams
        ) ||
        playersPerTeam === 1
      )
    );
  };

  const onTeamCountChange = (newValue) => {
    const newFormState = {
      ...state,
      numberOfTeams: newValue,
      players: updatePlayersArray(newValue, state.playersPerTeam),
    };

    setState({
      ...newFormState,
      isFormValid: validateForm(newFormState),
      isFormEmpty: checkFormEmpty(newFormState),
    });
  };

  const updatePlayersArray = (countTeams, countPlayersPerTeam) => {
    const countMissingPlayers = countTeams * countPlayersPerTeam - state.players.length;
    return 0 < countMissingPlayers ? state.players.concat(Array(countMissingPlayers).fill("", 0)) : state.players;
  };

  const onPlayersPerTeamChange = newValue => {
    const newFormState = {
      ...state,
      playersPerTeam: newValue,
      players: updatePlayersArray(state.numberOfTeams, newValue),
    };
    setState({
      ...newFormState,
      isFormValid: validateForm(newFormState),
      isFormEmpty: checkFormEmpty(newFormState)
    });
  }

  const onTeamNameChange = (index, newName) => {
    const teams = state.teams;
    teams.splice(index, 1, newName);

    const newFormState = { ...state, teams };
    setState({
      ...newFormState,
      isFormValid: validateForm(newFormState),
      isFormEmpty: checkFormEmpty(newFormState)
    });
  };

  const onPlayerNameChange = (index, newName) => {
    const players = state.players;
    players.splice(index, 1, newName);

    const newFormState = { ...state, players };
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
        <TeamsNumber
          teamCountOptions={state.teamCountOptions}
          checkedNumberOfTeams={state.numberOfTeams}
          changeTeamCountSelection={onTeamCountChange}
        />
        <PlayersPerTeam
          onPlayersPerTeamChange={onPlayersPerTeamChange}
          playersPerTeam={state.playersPerTeam}
        />
        {state.playersPerTeam > 1 ?
          <PlayersNames
            players={state.players}
            onChange={onPlayerNameChange}
            playersCount={state.playersPerTeam * state.numberOfTeams}
          /> : ''
        }
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
