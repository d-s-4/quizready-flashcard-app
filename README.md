# QuizReady – Flashcard Learning App

## Description
QuizReady is a single-page flashcard learning application that helps users study more effectively through active recall. Users can create, view, update, delete, and study flashcards, as well as organise them into sets for structured learning. The app is built using a React frontend, Node.js backend, and MongoDB database.

## Problem Statement
Traditional study methods (e.g., notes, passive reading) are often ineffective for memory retention. QuizReady solves this by:
- Promoting active recall through flashcards
- Enabling structured learning using categorised sets
- Providing a focused study session flow (cards disappear after use)
- Allowing users to reset sessions and repeat practice

## Technical Stack
Frontend
- React (SPA)
- JavaScript
- HTML 
Styling 
- CSS
- Responsive layout with Flexbox and Grid
Backend
- Node.js
- Express.js
Database
- MongoDB
Data Flow
- REST API (GET, POST, PUT, DELETE)
- JSON-based communication between frontend and backend

## Features
- Create flashcards (question, answer, set/category)
- View flashcards dynamically
- Reveal answers by clicking on cards
- Edit flashcards
- Delete flashcards
- Mark flashcards as used (disappear during study)
- Reset study session
- Categorise flashcards into sets
- Filter flashcards by selected set
- Responsive and visually styled user interface
- Data persistence using MongoDB

## CRUP Operations
The application fully implements all CRUD operations:

Operation - Functionality
Create	- Add new flashcards
Read    - Fetch and display all flashcards
Update  - Edit existing flashcards
Delete  - Remove flashcards

All operations interact with MongoDB through API endpoints.

## Business Logic and Worflow
The application is designed around an intuitive study workflow:
- User creates flashcards (optionally assigning them to a set)
- Flashcards are displayed dynamically
- User clicks a card to reveal the answer
- Card is marked as “used” and removed from the session
- User resets session to study again
This mirrors real-world flashcard learning behaviour and ensures:
- Minimal steps
- Logical flow
- No unnecessary navigation

## User Experience and Presentation
Visual Design
- Custom branding: QuizReady
- Nature-inspired green colour palette (focus + calm)
- Consistent typography and spacing
- Visual hierarchy using cards and sections
Interaction Design
- Click-to-reveal answers
- Immediate UI updates
- Hover animations and transitions
- Clear feedback for user actions
Performance
- Fast rendering using React state updates
- Minimal re-renders
- Efficient data fetching
Accessibility
- High contrast between text and background
- Clear button labels
- Readable font sizes
- Structured layout 

## Folder Structure
flashcard-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── App.js       # Main component
│   │   ├── App.css      # Styling
│   │   └── index.js
│
├── server/              # Backend
│   ├── server.js        # Express server & API
│   └── models/          # Mongoose schemas
│
└── README.md

## Technologies Used
- React (Single Page Application)
- Node.js
- Express
- MongoDB
- Mongoose
- CSS

## How to Run

### Backend
cd server  
npm install  
node server.js  

### Frontend
cd client  
npm install  
npm start  

## API Endpoints
- GET /flashcards  
- POST /flashcards  
- PUT /flashcards/:id  
- DELETE /flashcards/:id  

## Challenges and Solutions
One key challenge was ensuring that newly added flashcards appeared immediately without requiring a page refresh. This was resolved by properly updating React state after API responses and ensuring the new card object matched the expected UI structure.

Another challenge involved implementing study session logic, where cards disappear after use. This required careful state management using a used flag and filtering logic.

Additionally, integrating categories (sets) introduced complexity in filtering and UI rendering, which was addressed by dynamically generating set options and updating the filtering logic. 

## Notes
This application is implemented as a single-page application (SPA), meaning all interactions occur dynamically without page reloads. React state is used to update the interface in real time, providing a seamless user experience.