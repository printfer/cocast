import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";

import Modal from "../Modal/Modal";

import "./LinkInfo.css";

interface LinkInfoProps {
  shareId: string | null;
}

export default function LinkInfo(props: LinkInfoProps) {
  if (props.shareId) {
    const shareURL = `${document.location}#${props.shareId}`;
    return (
      <div className="link-info">
        <ClipboardCopy copyText={shareURL} />
        <QRCodeComponent qrCodeValue={shareURL} />
      </div>
    );
  }

  return <div className="loading"> Connecting </div>;
}

const ClipboardCopy = (props: { copyText: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text: string) {
    return await navigator.clipboard.writeText(text);
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(props.copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="clipboard-copy">
      <input type="text" value={props.copyText} readOnly />
      <button
        className="button"
        onClick={handleCopyClick}
        title="Copy"
        aria-label="Copy"
      >
        {isCopied ? (
          <span className="material-symbols-rounded">check_circle</span>
        ) : (
          <span className="material-symbols-rounded">content_copy</span>
        )}
      </button>
    </div>
  );
};

const QRCodeComponent = (props: { qrCodeValue: string }) => {
  // QRCode ref
  const qrCodeRef = useRef(null);

  // QRCode modal status
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const toggleQRCodeModal = () => {
    setIsQRCodeModalOpen(!isQRCodeModalOpen);
  };

  // QRCode options
  // https://github.com/soldair/node-qrcode#qr-code-options
  const qrCodeOptions = {
    margin: 2,
    scale: 5,
  };

  useEffect(() => {
    QRCode.toCanvas(
      qrCodeRef.current,
      props.qrCodeValue,
      qrCodeOptions,
      (error) => {
        if (error) console.error(error);
      }
    );
  }, [props.qrCodeValue]);

  return (
    <div className="qrcode-component">
      <Modal isOpen={isQRCodeModalOpen} onClose={toggleQRCodeModal}>
        <canvas ref={qrCodeRef} />
      </Modal>
      <button
        className="button"
        onClick={toggleQRCodeModal}
        title="QR code"
        aria-label="QR code"
      >
        <span className="material-symbols-rounded">qr_code_2</span>
      </button>
    </div>
  );
};
