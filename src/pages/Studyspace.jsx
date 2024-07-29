import Whiteboard from "../components/Whiteboard";
import Spotify from "../components/Spotify";
import Chatbot from "../components/Chatbot";
import FileRender from "../components/FileRender";


const Studyspace = () => {
  return (
    <div>
        <Spotify />
        <FileRender />
        <Whiteboard />
        <Chatbot />
    </div>
  );
};

export default Studyspace;
