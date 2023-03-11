import { ReactNode } from "react";
import Icon from "react-material-symbols/rounded";

import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Modal(props: ModalProps) {
  return (
    <div className={`modal ${props.isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={props.onClose}></div>
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={props.onClose}
          title="Close"
          aria-label="close"
        >
          <Icon icon="close" />
        </button>
        <div>{props.children}</div>
      </div>
    </div>
  );
}
