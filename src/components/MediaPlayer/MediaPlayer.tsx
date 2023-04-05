import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  MutableRefObject,
} from "react";
import {
  APITypes,
  PlyrInstance,
  PlyrProps,
  usePlyr,
  PlyrSource,
} from "plyr-react";
import "plyr-react/plyr.css";

import { RoomStatus, MediaCode } from "../../hooks/useRoomStatus";
import {
  MediaType,
  validateMediaLink,
  getValidYouTubeId,
} from "../../utils/mediaLink";

import "./MediaPlayer.css";

const CustomPlyrInstance = forwardRef<APITypes, PlyrProps & MediaPlayerProps>(
  (props, ref) => {
    const { source, options = null, roomStatus, setRoomStatus } = props;
    const raptorRef = usePlyr(ref, { options, source });

    const [isPlyrReady, setIsPlyrReady] = useState<boolean>(false);

    // Do all api access here, it is guaranteed to be called with the latest plyr instance
    useEffect(() => {
      // Fool react for using forward ref as normal ref
      // https://github.com/chintan9/plyr-react/blob/master/example/react/src/audio-player/custom-audio-player.tsx
      const { current } = ref as MutableRefObject<APITypes>;
      if (current.plyr.source === null) return;

      // Check if plyr is ready
      if (!isPlyrReady) {
        const onReady = () => {
          setIsPlyrReady(true);
        };
        const api = current as { plyr: PlyrInstance };
        api.plyr.on("ready", onReady);
        return () => {
          api.plyr.off("ready", onReady);
        };
      }

      // Custom event listeners
      // https://github.com/sampotts/plyr#events
      const onPlay = () => {
        console.debug("[player] (play)", api.plyr.currentTime);
        setRoomStatus({
          ...roomStatus,
          mediaAction: MediaCode.Play,
          mediaTime: api.plyr.currentTime,
        });
      };
      const onPause = () => {
        console.debug("[player] (pause)", api.plyr.currentTime);
        setRoomStatus({
          ...roomStatus,
          mediaAction: MediaCode.Pause,
          mediaTime: api.plyr.currentTime,
        });
      };
      const onRateChange = () => {
        console.debug(
          "[player] (ratechange)",
          api.plyr.speed,
          "time:",
          api.plyr.currentTime
        );
        setRoomStatus({
          ...roomStatus,
          mediaAction: MediaCode.RateChange,
          mediaTime: api.plyr.currentTime,
          mediaSpeed: api.plyr.speed,
        });
      };

      // Call event listeners here
      const api = current as { plyr: PlyrInstance };
      api.plyr.on("play", onPlay);
      api.plyr.on("pause", onPause);
      api.plyr.on("ratechange", onRateChange);

      // When received remote media control, update the room status
      // TODO: add more media control later
      //console.debug("[player] seeking: ", api.plyr.seeking);
      if (roomStatus.isRemoteMediaControl) {
        switch (roomStatus.mediaAction) {
          case MediaCode.Play: {
            console.debug("[player] (remote play)", api.plyr.currentTime);
            api.plyr.play();
            setRoomStatus({ ...roomStatus, isRemoteMediaControl: true });
            break;
          }
          case MediaCode.Pause: {
            console.debug("[player] (remote pause)", api.plyr.currentTime);
            api.plyr.pause();
            setRoomStatus({ ...roomStatus, isRemoteMediaControl: true });
            break;
          }
          case MediaCode.RateChange: {
            console.debug(
              "[player] (remote ratechange)",
              api.plyr.speed,
              "time:",
              api.plyr.currentTime
            );
            api.plyr.speed = roomStatus.mediaSpeed;
            setRoomStatus({ ...roomStatus, isRemoteMediaControl: true });
            break;
          }
          default:
            console.warn(
              "[player] Unknown media control:",
              roomStatus.mediaAction
            );
        }
        api.plyr.currentTime = roomStatus.mediaTime;
      }

      // When received remote fetch, update current time
      if (roomStatus.isRemoteFetch) {
        setRoomStatus({ ...roomStatus, mediaTime: api.plyr.currentTime });
      }

      // Clean event listeners
      return () => {
        api.plyr.off("play", onPlay);
        api.plyr.off("pause", onPause);
        api.plyr.off("ratechange", onRateChange);
      };
    });

    return (
      <video
        ref={raptorRef as MutableRefObject<HTMLVideoElement>}
        className="plyr-react plyr"
      />
    );
  }
);
CustomPlyrInstance.displayName = "CustomPlyrInstance";

interface MediaPlayerProps {
  roomStatus: RoomStatus;
  setRoomStatus: (status: RoomStatus) => void;
}

export default function MediaPlayer({
  roomStatus,
  setRoomStatus,
}: MediaPlayerProps) {
  const ref = useRef<APITypes>(null);

  // https://github.com/sampotts/plyr#the-source-setter
  const [playerMediaSource, setPlayerMediaSource] = useState<PlyrSource>();
  // https://github.com/sampotts/plyr#options
  const mediaOptions = undefined;

  // Convert media source to acceptable object for media player
  const mediaSourceConvertor = (mediaSource: string) => {
    console.debug("[player] convert media source:", mediaSource);
    const possibleMediaLink = validateMediaLink(mediaSource);
    if (possibleMediaLink) {
      switch (possibleMediaLink.type) {
        // HTML video
        case MediaType.HTMLVideo: {
          setPlayerMediaSource({
            type: "video" as const,
            sources: [
              {
                src: mediaSource,
              },
            ],
          });
          break;
        }
        // HTML audio
        //case MediaType.HTMLAudio: {
        //  setPlayerMediaSource({
        //    type: "audio" as const,
        //    sources: [
        //      {
        //        src: mediaSource,
        //      }
        //    ]
        //  });
        //  break;
        //}
        // Media from YouTube
        case MediaType.YouTube: {
          setPlayerMediaSource({
            type: "video" as const,
            sources: [
              {
                src: getValidYouTubeId(mediaSource) as string,
                provider: "youtube",
                //src: "JOhiWY7XmoY",
                //provider: "youtube",
              },
            ],
          });
          break;
        }
        default:
          console.warn("[player] Unkown media source");
      }
    }
  };

  useEffect(() => {
    mediaSourceConvertor(roomStatus.mediaSource);
  }, [roomStatus.mediaSource]);

  return (
    <div className="media-player">
      {playerMediaSource && (
        <CustomPlyrInstance
          ref={ref}
          source={playerMediaSource}
          options={mediaOptions}
          roomStatus={roomStatus}
          setRoomStatus={setRoomStatus}
        />
      )}
    </div>
  );
}
