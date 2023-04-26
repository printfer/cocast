import { Peer } from "peerjs";
import type { DataConnection } from "peerjs";
import { useEffect, useRef, useState } from "react";

// Media control
export const enum MediaCode {
  Play,
  Pause,
  RateChange,
}

// Room Status
export interface RoomStatus {
  // Peer status
  peerId: string | null;
  peerTotal: number;
  // Media status
  mediaPlayList: string[];
  mediaSource: string;
  mediaAction: MediaCode;
  mediaTime: number;
  mediaSpeed: number;
  // Remote status
  isRemoteMediaControl: boolean;
  isRemoteFetch: string | null;
}

export default function useRoomStatus(): [
  RoomStatus,
  (status: RoomStatus) => void
] {
  // TODO: another default media url option: https://youtu.be/JOhiWY7XmoY
  const defaultMediaURL =
    "https://archive.org/download/ElephantsDream/ed_1024_512kb.mp4";

  // Local media status
  const [mediaPlayList, setMediaPlayList] = useState<string[]>([
    defaultMediaURL,
  ]);
  const [mediaSource, setMediaSource] = useState<string>(defaultMediaURL);
  const [mediaAction, setMediaAction] = useState<MediaCode>(MediaCode.Pause);
  const [mediaTime, setMediaTime] = useState<number>(0);
  const [mediaSpeed, setMediaSpeed] = useState<number>(1);

  // Remote status
  const [isRemoteMediaControl, setIsRemoteMediaControl] =
    useState<boolean>(false);
  const [isRemoteFetch, setIsRemoteFetch] = useState<string | null>(null);

  // Local peer status: peerId, peerInstance
  const [peerId, setPeerId] = useState<string | null>(null);
  const peerInstance = useRef<Peer | null>(null);

  // Remote peer status: remotePeerList, totalPeerNumber
  const peerConnections = useRef(new Map<string, DataConnection>());
  const [peerConnectionsState, setPeerConnectionsState] = useState(
    new Map(peerConnections.current)
  );

  // Set ref and state of peerConnections
  const peerConnectionsSet = (peerKey: string, peerValue: DataConnection) => {
    peerConnections.current.set(peerKey, peerValue);
    setPeerConnectionsState(new Map(peerConnections.current));
  };

  // Delete ref and state of peerConnections
  const peerConnectionsDelete = (peerKey: string) => {
    peerConnections.current.delete(peerKey);
    setPeerConnectionsState(new Map(peerConnections.current));
  };

  // Initialize connection
  useEffect(() => {
    const peer = new Peer();

    // Get peerId for current user
    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("connection", (conn) => {
      connectionControl(conn);
    });

    peerInstance.current = peer;
  }, []);

  // Join connection
  useEffect(() => {
    if (document.location.hash && peerInstance.current && peerId) {
      // Join the sharedId from URL
      const sharedId = document.location.hash.substring(1);
      const conn = peerInstance.current.connect(sharedId);
      connectionControl(conn, sharedId);
      // Remove the URL after join
      history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search
      );
    }
  }, [peerId]);

  // Connection control codes
  const enum ControlCode {
    SyncPeerInit,
    SyncPeer,
    FetchMediaStatus,
    UpdateMediaStatus,
  }

  type PeerData = ConnectionData | MediaData;

  interface ConnectionData {
    controlCode:
      | ControlCode.SyncPeer
      | ControlCode.SyncPeerInit
      | ControlCode.FetchMediaStatus;
    controlMessage: string[];
  }

  interface MediaData {
    controlCode: ControlCode.UpdateMediaStatus;
    controlMessage: {
      mediaPlayList: string[];
      mediaSource: string;
      mediaAction: MediaCode;
      mediaTime: number;
      mediaSpeed: number;
    };
  }

  // Connection control - sharedId can be null
  const connectionControl = (conn: DataConnection, sharedId?: string) => {
    // When connection open
    conn.on("open", () => {
      // Add opened peer connection to peerConnections
      peerConnectionsSet(conn.peer, conn);

      // Receive messages
      conn.on("data", (data) => {
        handleReceivedData(data as PeerData, conn);
      });

      // Send messages
      if (sharedId) {
        // Init peer connection
        sendSyncPeerInit(conn);
        // Fetch all media status from peer
        sendFetchMediaStatus(conn);
      }
    });

    // When connection closed
    conn.on("close", () => {
      // Remove closed peer connection from peerConnections
      peerConnectionsDelete(conn.peer);
    });
  };

  const handleReceivedData = (data: PeerData, conn: DataConnection) => {
    const peerData = data as PeerData;
    switch (peerData.controlCode) {
      case ControlCode.SyncPeerInit:
        handleSyncPeerInit(peerData, conn);
        break;
      case ControlCode.SyncPeer:
        handleSyncPeer(peerData);
        break;
      case ControlCode.FetchMediaStatus:
        handleFetchMediaStatus(conn);
        break;
      case ControlCode.UpdateMediaStatus:
        handleUpdateMediaStatus(peerData);
        break;
      default:
        console.warn("[room] Unknown data received", data);
    }
  };

  const handleSyncPeerInit = (peerData: PeerData, conn: DataConnection) => {
    console.debug(
      "[room] sync peer init request from:",
      peerData.controlMessage
    );
    if (peerConnections.current.size === 1) {
      return;
    }
    // Send this new connected peer to all other peers
    for (const [peerKey, peerConn] of peerConnections.current.entries()) {
      if (peerKey !== conn.peer) {
        sendSyncPeer(peerConn, [conn.peer]);
      }
    }
    // Send all other peers to this new connected peer
    const otherPeers = [...peerConnections.current.keys()].filter(
      (peerKey) => peerKey !== conn.peer
    );
    sendSyncPeer(conn, otherPeers);
  };

  const handleSyncPeer = (peerData: PeerData) => {
    console.debug("[room] sync peer for:", peerData.controlMessage);
    // Connect to received peers if not inside current peerConnections
    for (const peerKey of (peerData as ConnectionData).controlMessage) {
      if (!peerConnections.current.has(peerKey)) {
        const conn = peerInstance.current?.connect(peerKey) as DataConnection;
        connectionControl(conn);
      }
    }
  };

  const handleFetchMediaStatus = (conn: DataConnection) => {
    console.debug("[room] fetch media status for:", conn.peer);
    setIsRemoteFetch(conn.peer);
  };

  const handleUpdateMediaStatus = (peerData: PeerData) => {
    console.debug(
      "[room] update local media status to:",
      peerData.controlMessage
    );
    const { mediaSource, mediaAction, mediaTime, mediaSpeed, mediaPlayList } = (
      peerData as MediaData
    ).controlMessage;
    // Local media status
    setMediaPlayList(mediaPlayList);
    setMediaSource(mediaSource);
    setMediaAction(mediaAction);
    setMediaTime(mediaTime);
    setMediaSpeed(mediaSpeed);
    // Remote status
    setIsRemoteMediaControl(true);
  };

  const sendSyncPeerInit = (conn: DataConnection) => {
    conn.send({
      controlCode: ControlCode.SyncPeerInit,
      controlMessage: [conn.peer],
    } as ConnectionData);
  };

  const sendSyncPeer = (conn: DataConnection, peers: string[]) => {
    conn.send({
      controlCode: ControlCode.SyncPeer,
      controlMessage: peers,
    } as ConnectionData);
  };

  const sendFetchMediaStatus = (conn: DataConnection) => {
    conn.send({
      controlCode: ControlCode.FetchMediaStatus,
      controlMessage: [conn.peer],
    } as ConnectionData);
  };

  const sendUpdateMediaStatus = (conn: DataConnection, status: RoomStatus) => {
    conn.send({
      controlCode: ControlCode.UpdateMediaStatus,
      controlMessage: {
        mediaPlayList: status.mediaPlayList,
        mediaSource: status.mediaSource,
        mediaAction: status.mediaAction,
        mediaTime: status.mediaTime,
        mediaSpeed: status.mediaSpeed,
      },
    } as MediaData);
  };

  const setRoomStatus = (status: RoomStatus): void => {
    console.debug("[room] (setRoomStatus) set room status to:", status);
    // Local update
    setMediaPlayList(status.mediaPlayList);
    setMediaSource(status.mediaSource);
    setMediaAction(status.mediaAction);
    setMediaTime(status.mediaTime);
    setMediaSpeed(status.mediaSpeed);

    // Remote media control update
    if (status.isRemoteMediaControl) {
      console.debug("[room] (setRoomStatus) is remote media control");
      setIsRemoteMediaControl(false);
    } else if (status.isRemoteFetch) {
      console.debug(
        "[room] (setRoomStatus) response remote fetch, send room status to",
        status.isRemoteFetch
      );
      sendUpdateMediaStatus(
        peerConnections.current.get(status.isRemoteFetch)!,
        status
      );
      setIsRemoteFetch(null);
    } else {
      console.debug("[room] (setRoomStatus) send room status to all");
      peerConnections.current.forEach((conn) => {
        sendUpdateMediaStatus(conn, status);
      });
    }
  };

  const roomStatus: RoomStatus = {
    // Peer status
    peerId: peerId,
    peerTotal: peerConnectionsState.size,
    // Media status
    mediaPlayList: mediaPlayList,
    mediaSource: mediaSource,
    mediaAction: mediaAction,
    mediaTime: mediaTime,
    mediaSpeed: mediaSpeed,
    // Remote status
    isRemoteMediaControl: isRemoteMediaControl,
    isRemoteFetch: isRemoteFetch,
  };

  console.debug(
    `[room] (roomStatus) Room URL: ${document.location.origin}/#${roomStatus.peerId}`
  );
  console.debug(`[room] (roomStatus) Peer id: ${roomStatus.peerId}`);
  console.debug(
    `[room] (roomStatus) Total connection: ${roomStatus.peerTotal}`
  );

  return [roomStatus, setRoomStatus];
}
