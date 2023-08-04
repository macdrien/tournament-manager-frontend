import PropTypes from "prop-types";

const TeamsNames = (props) => {
  const { teams, onChange, teamsCount } = props;

  return (
    <div className="teamsNames">
      <p className="title">Noms</p>
      {teams.slice(0, teamsCount).map((team, index) => (
        <input
          key={index}
          type="text"
          name={`teams[${index}]`}
          value={team}
          onChange={(event) => onChange(index, event.target.value)}
          placeholder={["Equipe", index + 1].join(" ")}
        />
      ))}
    </div>
  );
};

TeamsNames.propTypes = {
  teams: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  teamsCount: PropTypes.number.isRequired,
};

export default TeamsNames;
