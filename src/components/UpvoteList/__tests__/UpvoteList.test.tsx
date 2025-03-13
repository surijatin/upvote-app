import { render, screen, fireEvent } from "@testing-library/react";
import UpvoteList from "@/components/UpvoteList";
import { UpvoteProvider } from "@/context/UpvoteContext";

// Mock console.error to avoid noisy logs during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => {
      if (key === "upvoteState") {
        return JSON.stringify({ lists: {} });
      }
      return store[key] || null;
    }),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("UpvoteList Component", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test("should toggle selection state in UI when upvote is clicked", () => {
    // Arrange - Render the component with the required provider
    render(
      <UpvoteProvider>
        <UpvoteList id="test-list" title="Test List" initialCount={1} />
      </UpvoteProvider>
    );

    // Assert - Initially, the upvote should not be selected
    const upvoteButton = screen.getByRole("button", { pressed: false });
    expect(upvoteButton).toBeInTheDocument();
    expect(upvoteButton).toHaveAttribute("aria-pressed", "false");

    // Act - Click the upvote button to select it
    fireEvent.click(upvoteButton);

    // Assert - After clicking, the upvote should be selected
    const selectedButton = screen.getByRole("button", { pressed: true });
    expect(selectedButton).toBeInTheDocument();
    expect(selectedButton).toHaveAttribute("aria-pressed", "true");

    // Act - Click again to toggle it back
    fireEvent.click(selectedButton);

    // Assert - After clicking again, the upvote should be not selected
    const unselectedButton = screen.getByRole("button", { pressed: false });
    expect(unselectedButton).toBeInTheDocument();
    expect(unselectedButton).toHaveAttribute("aria-pressed", "false");
  });

  test("should persist selection state in localStorage when toggled", () => {
    // Arrange - Render the component with the required provider
    render(
      <UpvoteProvider>
        <UpvoteList id="test-list" title="Test List" initialCount={1} />
      </UpvoteProvider>
    );

    // Act - Initial render should store default state
    expect(localStorageMock.setItem).toHaveBeenCalled();

    // Reset mocks to clearly track only selection changes
    localStorageMock.setItem.mockClear();

    // Find and click the upvote button
    const upvoteButton = screen.getByRole("button", { pressed: false });
    fireEvent.click(upvoteButton);

    // Assert - localStorage should have been updated with selection set to true
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "upvoteState",
      expect.any(String)
    );
    const lastCallArgs = localStorageMock.setItem.mock.calls[0];
    const savedState = JSON.parse(lastCallArgs[1]);
    expect(savedState.lists["test-list"].isSelected).toBe(true);

    // Reset mocks again
    localStorageMock.setItem.mockClear();

    // Act - Click again to toggle it back
    const selectedButton = screen.getByRole("button", { pressed: true });
    fireEvent.click(selectedButton);

    // Assert - localStorage should have been updated with selection set to false
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "upvoteState",
      expect.any(String)
    );
    const lastCallArgsForUnselected = localStorageMock.setItem.mock.calls[0];
    const savedStateForUnselected = JSON.parse(lastCallArgsForUnselected[1]);
    expect(savedStateForUnselected.lists["test-list"].isSelected).toBe(false);
  });
});
