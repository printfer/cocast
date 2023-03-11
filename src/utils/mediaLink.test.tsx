import { describe, it, expect } from "vitest";

import { getValidYouTubeId } from "./mediaLink";

describe("getValidYouTubeId", () => {
  it("should get video id from YouTube watch URL", () => {
    const YouTubeURL = "http://www.youtube.com/watch?v=dQw4w9WgXcQ";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe("dQw4w9WgXcQ");
  });

  it("should get video id from YouTube embed URL", () => {
    const YouTubeURL = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe("dQw4w9WgXcQ");
  });

  it("should get video id from YouTube v URL", () => {
    const YouTubeURL = "https://www.youtube.com/v/dQw4w9WgXcQ";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe("dQw4w9WgXcQ");
  });

  it("should get video id from YouTube shorts URL", () => {
    const YouTubeURL = "https://www.youtube.com/shorts/dQw4w9WgXcQ";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe("dQw4w9WgXcQ");
  });

  it("should get video id from YouTube timestamped URL", () => {
    const YouTubeURL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=10s";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe("dQw4w9WgXcQ");
  });

  it("should get video id from YouTube share URL", () => {
    const YouTubeURL = "https://youtu.be/dQw4w9WgXcQ";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe("dQw4w9WgXcQ");
  });

  it("shouldn't get video id from YouTube watch URL with empty id", () => {
    const YouTubeURL = "youtube.com/watch?v=";
    const YouTubeVideoId = getValidYouTubeId(YouTubeURL);
    expect(YouTubeVideoId).toBe(null);
  });
});
