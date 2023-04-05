import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import PeerStatus from "./PeerStatus";

describe("PeerStatus", () => {
  it("should visible", () => {
    render(<PeerStatus peerTotal={0} />);
    expect(screen.getByRole("status")).toBeVisible();
  });

  it("should show 0 when there is 0 peer", () => {
    render(<PeerStatus peerTotal={0} />);
    expect(screen.getByRole("status")).toHaveTextContent("0");
  });

  it("should show 10 when there are 10 peers", () => {
    render(<PeerStatus peerTotal={10} />);
    expect(screen.getByRole("status")).toHaveTextContent("10");
  });

  it("should show 10+ when there are 100 peers", () => {
    render(<PeerStatus peerTotal={100} />);
    expect(screen.getByRole("status")).toHaveTextContent("10+");
  });
});
