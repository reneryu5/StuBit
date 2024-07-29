import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

  const truncateBody = (body, wordLimit) => {
    const words = body.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : body;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Notes</h1>
        <button className="sidebar-button" onClick={onAddNote}>
          <FontAwesomeIcon icon={faPlusSquare} className="add-icon" />
        </button>
      </div>
      <div className="sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }) => (
          <div
            key={id}
            className={`sidebar-note ${id === activeNote ? "active" : ""}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button
                className="sidebar-button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(id);
                }}
              >
                <FontAwesomeIcon icon={faMinusSquare} className="del-icon" />
              </button>
            </div>

            <p>{body && truncateBody(body, 3)}</p> {/* Limiting to 10 words */}
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string,
      lastModified: PropTypes.number.isRequired,
    })
  ).isRequired,
  onAddNote: PropTypes.func.isRequired,
  onDeleteNote: PropTypes.func.isRequired,
  activeNote: PropTypes.string,
  setActiveNote: PropTypes.func.isRequired,
};

export default Sidebar;
