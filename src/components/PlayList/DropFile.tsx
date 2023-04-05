import { useState, useRef, DragEvent, ChangeEvent } from "react";

import { RoomStatus } from "../../hooks/useRoomStatus";

import "./DropFile.css";

interface DropFileProps {
  roomStatus: RoomStatus;
  setRoomStatus: (status: RoomStatus) => void;
}

export default function DropFile(props: DropFileProps) {
  // Drag state
  const [dragActive, setDragActive] = useState<boolean>(false);
  // Ref for file input
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (event.type === "dragenter" || event.type === "dragover") {
      setDragActive(true);
    } else if (event.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop events
  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setDragActive(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFiles(event.dataTransfer.files);
    }
  };

  // Handle click to upload events
  const handleClickToUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (event.target.files && event.target.files[0]) {
      handleFiles(event.target.files);
    }
  };

  // Handle button click, this is for better keyboard navigation
  const handleClick = () => {
    (inputRef.current as HTMLInputElement).click();
  };

  // Handle uploaded files
  const handleFiles = (files: FileList) => {
    // TODO: handle files here
  };

  return (
    <div className="drop-zone">
      <form
        className="file-upload-form"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          className="file-upload-input"
          id="file-upload-input"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleClickToUpload}
        />
        <label
          className={`file-upload-label${dragActive ? " drag-active" : ""}`}
          htmlFor="file-upload-input"
        >
          <button
            className="upload-button drop-zone-placeholder"
            onClick={handleClick}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            Drag and drop files here or click to upload
          </button>
        </label>
      </form>
    </div>
  );
}
