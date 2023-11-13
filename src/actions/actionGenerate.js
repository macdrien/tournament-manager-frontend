import { cloneDeep } from "lodash";
import {redirect} from "react-router-dom";

import { random } from "../utils";

export default async ({ request, _params }) => {
  const url = new URL(request.url);
  const tournament = JSON.parse(url.searchParams.get("tournament"));
  
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

  const toSend = encodeURI(JSON.stringify(tournament));
  return redirect(`/tournament?tournament=${toSend}`);
};