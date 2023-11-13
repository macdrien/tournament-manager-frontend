import { redirect } from "react-router-dom";
import { cloneDeep } from "lodash";

import { random } from "../utils.js";

export default async ({ request, _params }) => {
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

  // Duels tree generation
  const teamsBuffer = cloneDeep(tournament.teams);
  const brackets = [];
  const round0 = [];
  while (teamsBuffer.length) {
    const match = { teams: [], result: [0, 0], matchDone: false };
    const firstIndex = random(teamsBuffer.length);
    match.teams.push(teamsBuffer[firstIndex]);
    teamsBuffer.splice(firstIndex, 1);
    const secondIndex = random(teamsBuffer.length);
    match.teams.push(teamsBuffer[secondIndex]);
    teamsBuffer.splice(secondIndex, 1);
    round0.push(match);
  }
  brackets.push(round0);
  for (let counter = tournament.teams.length / 2; counter > 1; counter /= 2) {
    const round = [];
    for (let bracket = 0; bracket < counter / 2; bracket++) {
      round.push({ teams: [], result: [0, 0], matchDone: false });
    }
    brackets.push(round);
  }

  tournament.brackets = brackets;

  tournament = encodeURI(JSON.stringify(tournament));
  return redirect(`/tournament?tournament=${tournament}`);
};