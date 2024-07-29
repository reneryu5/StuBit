import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const Note = ({ activeNote, onUpdateNote }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const toggleBold = () => {
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };

  const textStyle = {
    fontWeight: isBold ? "bold" : "normal",
    fontStyle: isItalic ? "italic" : "normal",
  };
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="note-main">
      <div className="main-note-edit">
        <button className="bold-button" onClick={toggleBold}>
          B
        </button>
        <button className="italics-button" onClick={toggleItalic}>
          I
        </button>
        <input
          style={textStyle}
          className="note-input"
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <textarea
          style={textStyle}
          className="note-text"
          id="body"
          placeholder="Write your note here..."
          value={activeNote.body}
          onChange={(e) => onEditField("body", e.target.value)}
        />
      </div>
      <div className="main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <ReactMarkdown className="markdown-preview">
          {activeNote.body}
        </ReactMarkdown>
      </div>
    </div>
  );
};

Note.propTypes = {
  activeNote: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    lastModified: PropTypes.number,
  }),
  onUpdateNote: PropTypes.func.isRequired,
};

export default Note;
