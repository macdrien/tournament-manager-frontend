import PropTypes from "prop-types";
import Brackets from "./Brackets";
import NextMatch from "./NextMatch";

const TournamentPlanning = (props) => {
  const { brackets } = props;

  return (
    <div className="tournamentPlanning">
      <Brackets brackets={brackets} />
      <div className="planningSeparator"></div>
      <NextMatch teams={["tlse", "albi"]} />
    </div>
  );
};

TournamentPlanning.propTypes = {
  brackets: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        teams: PropTypes.arrayOf(PropTypes.string),
        result: PropTypes.arrayOf(PropTypes.number),
      })
    )
  ),
};

export default TournamentPlanning;
