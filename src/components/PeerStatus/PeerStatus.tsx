import "./PeerStatus.css";

interface PeerStatusProps {
  peerTotal: number;
}

const peerStatusTitle = (total: number): string => {
  switch (total) {
    case 0:
      return "Nobody is watching right now";
    case 1:
      return "1 person is currently watching";
    default:
      return `${total} people are currently watching`;
  }
};

export default function PeerStatus(props: PeerStatusProps) {
  return (
    <div
      className="peer-status"
      title={peerStatusTitle(props.peerTotal)}
      aria-label={peerStatusTitle(props.peerTotal)}
    >
      <span className="icon material-symbols-rounded" aria-hidden="true">
        account_circle
      </span>
      <span className="notification" role="status" aria-live="polite">
        {props.peerTotal > 10 ? "10+" : props.peerTotal}
      </span>
    </div>
  );
}
