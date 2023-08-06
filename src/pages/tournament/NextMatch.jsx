import { cloneDeep } from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const NextMatch = (props) => {
  const { nextMatch, onMatchDone } = props;

  const [state, setState] = useState(null);

  const calcResultSize = result => {
    return (String(result).length * 25) + 'px'
  };

  useEffect(() => {
    if (nextMatch) {
      setState({
        match: nextMatch.match,
        resultSize: [calcResultSize(nextMatch.match.result[0]), calcResultSize(nextMatch.match.result[1])]
      });
    }
  }, [nextMatch]);

  const onScoreChange = (event, teamIndex) => {
    const newValue = Number.parseInt(event.target.value);
    event.target.value = 0; // To avoid useless zeros

    const match = state.match;
    match.result[teamIndex] = newValue;

    const resultSize = cloneDeep(state.resultSize);
    resultSize[teamIndex] = calcResultSize(match.result[teamIndex]);

    setState({...state, match, resultSize});
  }

  return state?.match && (
    <div className="nextMatch">
      <div className={`nextMatchTeam ${state.match.result[0] > state.match.result[1] ? 'winningTeam' : '' }`}>{state.match.teams[0].name}</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={state.match.result[0] !== 0 ? state.match.result[0] : ''}
        placeholder="0"
        onChange={event => onScoreChange(event, 0)}
        style={{width: state.resultSize[0]}}
      />
      <div className="nextMatchVs">VS</div>
      <input
        type="number"
        className="nextMatchScoreInput"
        value={state.match.result[1] !== 0 ? state.match.result[1] : ''}
        placeholder="0"
        onChange={event => onScoreChange(event, 1)}
        style={{width: state.resultSize[1]}}
      />
      <div className={`nextMatchTeam ${state.match.result[1] > state.match.result[0] ? 'winningTeam' : '' }`}>{state.match.teams[1].name}</div>
      <button onClick={_event => onMatchDone(nextMatch.round, nextMatch.matchIndex, state.match)}>Terminer</button>
    </div>
  );
};

NextMatch.propTypes = {
  nextMatch: PropTypes.shape({
    round: PropTypes.number,
    matchIndex: PropTypes.number,
    match: PropTypes.shape({
      teams: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        players: PropTypes.arrayOf(PropTypes.string),
      })),
      result: PropTypes.arrayOf(PropTypes.number),
    }),
  }),
  onMatchDone: PropTypes.func.isRequired,
};

export default NextMatch;
