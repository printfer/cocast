import { useState } from "react";

import { RoomStatus } from "../../hooks/useRoomStatus";
import { validateMediaLink } from "../../utils/mediaLink";

import "./LinkInput.css";

interface LinkInputProps {
  roomStatus: RoomStatus;
  setRoomStatus: (status: RoomStatus) => void;
}

export default function LinkInput(props: LinkInputProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInvalidLink, setIsInvalidLink] = useState(false);
  // TODO: add notification when the link is already exist in the playlist
  //const [isDuplicatedLink, setIsDuplicatedLink] = useState(false);
  const [inputURL, setInputURL] = useState("");

  const handleInputURL = () => {
    // TODO: change the logic here
    const possibleMediaLink = validateMediaLink(inputURL);

    if (possibleMediaLink) {
      setIsInvalidLink(false);

      // TODO: change the logic here
      // TODO: add notification when the link is already exist in the playlist
      const newLinks = possibleMediaLink.source.filter(
        (link) => !props.roomStatus.mediaPlayList.includes(link)
      );
      if (newLinks.length > 0) {
        props.setRoomStatus({
          ...props.roomStatus,
          mediaPlayList: [...props.roomStatus.mediaPlayList, ...newLinks],
        });

        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
        }, 1000);
      }
    } else {
      setIsInvalidLink(true);
      setTimeout(() => {
        setIsInvalidLink(false);
      }, 2500);
    }
  };

  // TODO:
  // 1. Change invalid notification text
  // 2. Add warning button icon when sumbit invalid url
  return (
    <>
      {isInvalidLink && (
        <p className="warning-text">
          * Sorry, only HTML video links and YouTube links are supported.
        </p>
      )}
      <div className="link-input">
        <input
          type="text"
          value={inputURL}
          placeholder="Add a new media link here..."
          onChange={(e) => setInputURL(e.target.value)}
        />
        <button
          className="button"
          onClick={() => {
            handleInputURL();
          }}
          title={`Add ${inputURL ? `"${inputURL}"` : "link"} to playlist`}
          aria-label={`Add ${inputURL ? `"${inputURL}"` : "link"} to playlist`}
        >
          {isSubmitted ? (
            <span className="material-symbols-rounded">check_circle</span>
          ) : (
            <span className="material-symbols-rounded">add_link</span>
          )}
        </button>
      </div>
    </>
  );
}
