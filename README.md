# Upvote Component System

This repository is a submission for the technical assessment. It implements a reusable upvote component system with state management and persistence.

## Technical Assessment Requirements

1. Start a new React project using JavaScript or TypeScript. Feel free to use one of the
   recommended starters:

   - Create React App
   - Vite

2. All components should be reusable, meaning, they should not be made limited just for this
   implementation

3. Feel free to use the provided SVG files or your own similar icons

4. Create the upvote component capable to show two states

   - A. It has the default (not-selected) and the selected states - a. Default background color #F4F6F8 with arrow #343A40 - b. Selected background color #E5E8FD with arrow #253CF2 - Note: The blue and red coloured upvotes for the wireframe is there only to
     represent the different groups. Use the same state colours for all lists as mentioned
     above.
   - B. Clicking on the component should allow the selection change to be toggled. The handler
     for this task should be passed through props.

5. Create the upvotes list

   - A. It toggles the current selection state for all the upvote components in the list through the
     upvote click
   - B. The selection from a list should not interfere with the selection from any other lists
   - C. Allow adding more upvotes to the list by clicking on the add button

6. Wireframe

   - A. The + button should add one new upvote to its own list
   - B. Any newly added upvote should be linked to the same state as the other upvotes in the list
   - C. The colour of the upvote is only a visual representation of their shared state. Your final
     product should not have multiple colours, only the selected and default states.

7. Data

   - A. Use React context, a hook or any way where the data state can be managed for all
     upvote lists together
   - B. Make the data persisted in the browser and allow to show all upvotes with their states
     when refreshing the page

8. Provide one test for selection change based on the click event

9. Take the opportunity to demonstrate the code consistency that you apply on your own job on
   a daily basis

## Implementation Details

- Built with React and TypeScript using Create React App
- State management via React Context API
- Browser persistence using localStorage
- Configured with absolute imports for better code organization
- Styled with TailwindCSS
- Unit tests with React Testing Library

## Project Structure

- `src/components` - Contains reusable UI components
- `src/context` - Contains the React Context for state management
- `src/types` - Contains TypeScript type definitions
- `src/components/UpvoteList/__tests__` - Contains component tests

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install
```

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### `npm test`

Launches the test runner in the interactive watch mode.
