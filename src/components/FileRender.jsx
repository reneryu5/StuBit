import { useState } from 'react';
import './FileRender.css';

const FileRender = () => {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleDelete = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
    if (selectedFile && selectedFile.name === fileName) {
      setSelectedFile(null);
    }
  };

  const handleUpload = (file) => {
    const newFile = {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      date: new Date().toISOString().split('T')[0],
      type: file.type,
      content: URL.createObjectURL(file),
    };
    setFiles([...files, newFile]);
  };

  const handleFileInputChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      handleUpload(uploadedFile);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      handleUpload(droppedFile);
    }
  };

  const handleFileClick = (file) => {
    setSelectedFile(file);
  };

  const closeViewer = () => {
    setSelectedFile(null);
  };

  const renderFileContent = () => {
    if (!selectedFile) return null;

    if (selectedFile.type.startsWith('text')) {
      return (
        <iframe
          src={selectedFile.content}
          className="file-preview"
          title="Text Preview"
        />
      );
    } else if (selectedFile.type.startsWith('image')) {
      return (
        <img
          src={selectedFile.content}
          alt={selectedFile.name}
          className="file-preview"
        />
      );
    } else if (selectedFile.type === 'application/pdf') {
      return (
        <iframe
          src={selectedFile.content}
          className="file-preview"
          title="PDF Preview"
        />
      );
    } else {
      return <p>Cannot preview this file type</p>;
    }
  };

  return (
    <div className="FileRender-container">
      <h2>View your study material here</h2>
      <input type="file" onChange={handleFileInputChange} />
      <div
        className={`drop-zone ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        Drag and drop your files here
      </div>
      <ul className="file-list">
        {files.map(file => (
          <li
            key={file.name}
            className="file-item"
            onClick={() => handleFileClick(file)}
          >
            <span>{file.name}</span>
            <span>{file.size}</span>
            <span>{file.date}</span>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(file.name); }}>X</button>
          </li>
        ))}
      </ul>
      {selectedFile && (
        <div className="file-viewer">
          <button className="close-button" onClick={closeViewer}>Close</button>
          {renderFileContent()}
        </div>
      )}
    </div>
  );
};

export default FileRender;
