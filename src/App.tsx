import "@fontsource/open-sans/variable.css";
import "@fontsource/fira-code/latin-400.css";
import "material-symbols/rounded.css";

import MediaPlayer from "./components/MediaPlayer/MediaPlayer";
import LinkInfo from "./components/LinkInfo/LinkInfo";
import PlayList from "./components/PlayList/PlayList";
import PeerStatus from "./components/PeerStatus/PeerStatus";

import useRoomStatus from "./hooks/useRoomStatus";

import "./App.css";

export default function App() {
  const [roomStatus, setRoomStatus] = useRoomStatus();

  return (
    <div className="app-layout">
      <div className="info-view center">
        <h1
          className="app-title"
          title="CoCast - Media Casting Application"
          aria-label="CoCast - Media Casting Application"
        >
          CoCast
        </h1>
        <a
          className="source-link"
          href="https://github.com/printfer/cocast"
          target="_blank"
          rel="noreferrer"
          title="Source Code"
          aria-label="Source Code"
        >
          <div className="git-icon"></div>
        </a>
        <div className="push">
          <PeerStatus peerTotal={roomStatus.peerTotal} />
        </div>
      </div>
      <div className="link-view center">
        <LinkInfo shareId={roomStatus.peerId} />
      </div>
      <div className="player-view center">
        <MediaPlayer roomStatus={roomStatus} setRoomStatus={setRoomStatus} />
      </div>
      <div className="playlist-view">
        <PlayList roomStatus={roomStatus} setRoomStatus={setRoomStatus} />
      </div>
    </div>
  );
}
