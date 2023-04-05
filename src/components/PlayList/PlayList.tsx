import { useState, useEffect, ReactNode, MouseEvent } from "react";

import Modal from "../Modal/Modal";
import DropFile from "./DropFile";
import LinkInput from "./LinkInput";
import { RoomStatus } from "../../hooks/useRoomStatus";
import { MediaType, validateMediaLink } from "../../utils/mediaLink";

import "./PlayList.css";

interface PlayListProps {
  roomStatus: RoomStatus;
  setRoomStatus: (status: RoomStatus) => void;
}

export default function PlayList(props: PlayListProps) {
  return (
    <div className="playlist">
      <PlayListHeader>
        <h2>Add to PlayList</h2>
        <DropFile
          roomStatus={props.roomStatus}
          setRoomStatus={props.setRoomStatus}
        />
        <div className="separator"> OR </div>
        <LinkInput
          roomStatus={props.roomStatus}
          setRoomStatus={props.setRoomStatus}
        />
      </PlayListHeader>
      <PlayListContent
        roomStatus={props.roomStatus}
        setRoomStatus={props.setRoomStatus}
      />
    </div>
  );
}

const PlayListHeader = (props: { children: ReactNode }) => {
  // Add-to-playlist modal status
  const [isAddToPlayListModalOpen, setIsAddToPlayListModalOpen] =
    useState(false);
  const toggleAddToPlayListModal = () => {
    setIsAddToPlayListModalOpen(!isAddToPlayListModalOpen);
  };

  return (
    <div className="playlist-header">
      <h2> PlayList </h2>
      <button
        className="button"
        onClick={toggleAddToPlayListModal}
        title="Add to playlist"
        aria-label="Add to playlist"
      >
        <span className="material-symbols-rounded">playlist_add</span>
      </button>
      {isAddToPlayListModalOpen && (
        <Modal
          isOpen={isAddToPlayListModalOpen}
          onClose={toggleAddToPlayListModal}
        >
          {props.children}
        </Modal>
      )}
    </div>
  );
};

const PlayListContent = (props: PlayListProps) => {
  // Move one item in an array from one place to another
  const moveIndex = (arrayInput: string[], from: number, to: number) => {
    const array = arrayInput;
    const moveItem = array.splice(from, 1)[0];
    array.splice(to, 0, moveItem);
    return array;
  };
  const [isDragging, setIsDragging] = useState<{
    status: boolean;
    index: number;
  }>();
  const playListItems = props.roomStatus.mediaPlayList.map((link, index) => (
    <div
      key={link}
      className={
        isDragging?.status && isDragging.index === index ? "dragging" : ""
      }
      draggable
      onDragStart={(event) => {
        //console.debug("onDragStart:", index);
        setIsDragging({ status: true, index: index });
        event.currentTarget.style.opacity = "0.4";
      }}
      onDragEnd={(event) => {
        //console.debug("onDragEnd:", index);
        setIsDragging({ status: false, index: index });
        event.currentTarget.style.opacity = "1";
      }}
      onDragEnter={(event) => {
        //console.debug("onDragEnter:", index);
        if (isDragging?.status && index !== isDragging?.index) {
          const playlist = moveIndex(
            props.roomStatus.mediaPlayList,
            isDragging.index,
            index
          );
          props.setRoomStatus({ ...props.roomStatus, mediaPlayList: playlist });
          setIsDragging({ status: true, index: index });
        }
      }}
      onDragOver={(event) => {
        //console.debug("onDragOver:", index);
        event.preventDefault();
      }}
    >
      <PlayListItem
        key={link}
        index={index}
        link={link}
        roomStatus={props.roomStatus}
        setRoomStatus={props.setRoomStatus}
      />
    </div>
  ));

  return (
    <div className={`playlist-content${isDragging?.status ? " on-drag" : ""}`}>
      {playListItems}
    </div>
  );
};

const PlayListItem = (
  props: PlayListProps & { index: number; link: string }
) => {
  const isSelected = props.link === props.roomStatus.mediaSource;

  const handlePlayListItemSelect = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (props.roomStatus.mediaSource !== props.link) {
      props.setRoomStatus({ ...props.roomStatus, mediaSource: props.link });
    }
  };

  const handlePlayListItemRemove = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    props.setRoomStatus({
      ...props.roomStatus,
      mediaPlayList: props.roomStatus.mediaPlayList.filter(
        (media) => media !== props.link
      ),
    });
  };

  // Get media metadata
  const [noembedData, setNoembedData] = useState();
  useEffect(() => {
    async function getNoembedData() {
      const search = new URLSearchParams({ url: props.link });
      try {
        const res = await fetch(
          `https://noembed.com/embed?${search.toString()}`
        );
        const oembed = await res.json();
        console.debug("[playlist] (noembed)", oembed);
        setNoembedData(oembed);
      } catch (error) {
        console.error(error);
      }
    }
    const mediaLink = validateMediaLink(props.link);
    if (mediaLink && mediaLink.type == MediaType.YouTube) {
      getNoembedData();
    }
  }, []);

  const itemTitle = noembedData?.["title"] ?? "N/A";

  return (
    <div
      tabIndex={0}
      role={"button"}
      className={`playlist-item${isSelected ? " is-selected" : ""}`}
      onClick={handlePlayListItemSelect}
    >
      <div className="playlist-item-index">
        {`${isSelected ? "▶" : props.index + 1}`}
      </div>
      <div className="playlist-item-info">
        <div className="playlist-item-info-title" title={itemTitle}>
          {itemTitle}
        </div>
        <div className="playlist-item-info-link" title={props.link}>
          {props.link}
        </div>
      </div>
      <div className="playlist-item-delete">
        <button
          onClick={handlePlayListItemRemove}
          title={`Remove ${props.link} from playlist`}
          aria-label={`Remove ${props.link} from playlist`}
        >
          <span className="material-symbols-rounded">close</span>
        </button>
      </div>
    </div>
  );
};
