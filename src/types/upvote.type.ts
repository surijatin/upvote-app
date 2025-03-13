/**
 * Represents a single upvote list with its data
 */
export interface UpvoteList {
  id: string;
  title: string;
  upvoteCount: number;
  isSelected: boolean;
}

/**
 * Global state shape for upvote lists
 */
export interface UpvoteState {
  lists: Record<string, UpvoteList>;
}

/**
 * Actions that can be dispatched to the upvote reducer
 */
export type UpvoteAction =
  | { type: "ADD_UPVOTE"; listId: string }
  | { type: "TOGGLE_SELECTION"; listId: string }
  | { type: "INITIALIZE_LIST"; list: UpvoteList };

/**
 * Context type definition for the upvote context
 */
export interface UpvoteContextType {
  state: UpvoteState;
  dispatch: React.Dispatch<UpvoteAction>;
  initializeList: (id: string, title: string, initialCount: number) => void;
}
