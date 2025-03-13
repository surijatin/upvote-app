import { ReactNode } from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import {
  UpvoteState,
  UpvoteAction,
  UpvoteContextType,
} from "@/types/upvote.type";

export interface UpvoteProviderProps {
  children: ReactNode;
}

const initialState: UpvoteState = {
  lists: {},
};

const loadState = (): UpvoteState => {
  try {
    const savedState = localStorage.getItem("upvoteState");
    if (savedState === null) {
      return initialState;
    }
    return JSON.parse(savedState);
  } catch (error) {
    console.error("Error loading upvote state from localStorage:", error);
    return initialState;
  }
};

const upvoteReducer = (
  state: UpvoteState,
  action: UpvoteAction
): UpvoteState => {
  switch (action.type) {
    case "ADD_UPVOTE": {
      const list = state.lists[action.listId];
      if (!list) return state;

      const updatedList = {
        ...list,
        upvoteCount: list.upvoteCount + 1,
      };

      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: updatedList,
        },
      };
    }

    case "TOGGLE_SELECTION": {
      const list = state.lists[action.listId];
      if (!list) return state;

      const updatedList = {
        ...list,
        isSelected: !list.isSelected,
      };

      return {
        ...state,
        lists: {
          ...state.lists,
          [action.listId]: updatedList,
        },
      };
    }

    case "INITIALIZE_LIST": {
      // Skip if list already exists
      if (state.lists[action.list.id]) {
        return state;
      }

      return {
        ...state,
        lists: {
          ...state.lists,
          [action.list.id]: action.list,
        },
      };
    }

    default:
      return state;
  }
};

const UpvoteContext = createContext<UpvoteContextType | undefined>(undefined);

export const UpvoteProvider = ({ children }: UpvoteProviderProps) => {
  const [state, dispatch] = useReducer(upvoteReducer, loadState());

  const initializeList = (id: string, title: string, initialCount: number) => {
    if (!state.lists[id]) {
      dispatch({
        type: "INITIALIZE_LIST",
        list: {
          id,
          title,
          upvoteCount: initialCount,
          isSelected: false,
        },
      });
    }
  };

  // Persist state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("upvoteState", JSON.stringify(state));
  }, [state]);

  return (
    <UpvoteContext.Provider value={{ state, dispatch, initializeList }}>
      {children}
    </UpvoteContext.Provider>
  );
};

export const useUpvote = () => {
  const context = useContext(UpvoteContext);
  if (context === undefined) {
    throw new Error("useUpvote must be used within an UpvoteProvider");
  }
  return context;
};
