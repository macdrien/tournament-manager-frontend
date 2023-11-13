import {redirect, useSubmit} from "react-router-dom";

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

  tournament = encodeURI(JSON.stringify(tournament));
  return redirect(`/generate?tournament=${tournament}`);
};