export const enum MediaType {
  HTMLVideo,
  HTMLAudio,
  YouTube,
}

// Check if input media source is valid.
// TODO: return source as string[] is reserved for playlist url.
export const validateMediaLink = (
  mediaSource: string
): { type: MediaType; source: string[] } | null => {
  // HTML Video
  if (mediaSource.endsWith(".mp4")) {
    return { type: MediaType.HTMLVideo, source: [mediaSource] };
  }
  // HTML Audio
  //if (mediaSource.endsWith(".mp3")) {
  //  return { type: MediaType.HTMLAudio, source: [mediaSource]}
  //}
  // YouTube
  const possibleYouTubeId = getValidYouTubeId(mediaSource);
  if (possibleYouTubeId) {
    return {
      type: MediaType.YouTube,
      source: [`https://youtu.be/${possibleYouTubeId}`],
    };
  }

  // Unknown media source
  console.debug("[utils] (mediaLink) Unknown media source");
  return null;
};

// Check if input URL is a valid YouTube link
// Based on: https://stackoverflow.com/a/27728417
export const getValidYouTubeId = (url: string): string | null => {
  const regExp =
    /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  const match = url.match(regExp);

  return match && match[1].length === 11 ? match[1] : null;
};
