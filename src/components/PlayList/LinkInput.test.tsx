import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import LinkInput from "./LinkInput";
import { RoomStatus } from "../../hooks/useRoomStatus";

describe("LinkInput", () => {
  it("should render media link input element", () => {
    const mockSetRoomStatus = vi.fn();
    const mockRoomStatus = {} as RoomStatus;

    render(
      <LinkInput
        roomStatus={mockRoomStatus}
        setRoomStatus={mockSetRoomStatus}
      />
    );

    const linkInputElement = screen.getByPlaceholderText(
      /Add a new media link here.../i
    );
    expect(linkInputElement).toBeInTheDocument();
  });

  it("should be able to type in media link input", () => {
    const mockSetRoomStatus = vi.fn();
    const mockRoomStatus = {} as RoomStatus;
    const linkInput = "https://youtu.be/dQw4w9WgXcQ";

    render(
      <LinkInput
        roomStatus={mockRoomStatus}
        setRoomStatus={mockSetRoomStatus}
      />
    );

    const linkInputElement = screen.getByPlaceholderText(
      /Add a new media link here.../i
    );
    fireEvent.change(linkInputElement, { target: { value: linkInput } });
    expect((linkInputElement as HTMLInputElement).value).toBe(linkInput);
  });
});
