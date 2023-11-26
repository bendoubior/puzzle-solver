# puzzle-solver

This project is a web application built with NestJS for the backend and Angular for the frontend.
The application is a puzzle solver program.

The NestJS backend is implementing all the logic - generating puzzles, making moves to the puzzles, and keeping all the information about the puzzles and the user's progress in a MongoDB database.

The Angular Frontend is showing all the puzzles available, give the possibility to generate new puzzles with different dimensions, and of course, try to solve the puzzle (you also have options to move a step forward, step backward, to the start, to the end and to delete the puzzle).

## Setting Up the Environment

### Prerequisites

-   [Docker](https://www.docker.com/)
-   [Node.js](https://nodejs.org/) (for NestJS and Angular)

### 1. Running MongoDB with Docker

To run MongoDB using Docker:

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### 2. Running NestJS with npm

```bash
cd backend
npm install
npm run start:dev
```

### 3. Running Angular with npm

```bash
cd ../frontend
npm install
npm start
```

The frontend will be accessible at http://localhost:4200.

## Running Backend Tests with Jest

```bash
cd backend
npm install
npm test
```

## Architecture Decisions

### Database (MongoDB): Explanation of the MongoDB database architecture decisions

MongoDB is a NoSQL general-purpose database suitable for various data types.
With MongoDB, you can create flexible schemas, fast and easily.
Our Database doesn't need advanced search functionalities as in SQL databases as Elasticsearch, so choosing a NoSQL will be enough for us.
From the NoSQL databases MongoDB is an easy and flexible option. By combining it with the mongoose library for nestjs, you can connect your backend very fast to a database.

### Docker Usage: Explanation of why Docker was chosen and its role in the project

Docker will run MongoDB image as a container.
Instead of running MongoDB with a long installation process, we let Docker do all the work by running a container for MongoDB that can by easily start and stop.

### Backend (NestJS): Explanation of the backend architecture decisions

NestJS backends can be created and developed very fast.
It provides an infrastructures for an HTTP REST API and for MongoDB's management.
For a small web project with a short deadline - it will definitly do the work.

### Frontend (Angular): Explanation of the frontend architecture decisions

Angular is a web application framework that can be used to create and develop web application fast.
It provides infrastructures that help connecting to a HTTP REST API and to design an organized ui code.
Angular is also a great combination with NestJS.

### Communication Between Services: Explanation of how the frontend and backend communicate

The frontend and the backend communicate through a HTTP REST API:

-   The frontend gets a list of all available puzzles on the database.
-   When the user choose a puzzle from the list - it will get the Puzzle data.
-   When the user wants to change the puzzle (make a step, go forward/backward/to the start/ to the end or to delete) - it will post the request to the backend and the backend will update the puzzle accordingly.
-   When the user wants to generate a new puzzle - it will post the request to the backend and the backend will add the puzzle to the database.

*   note that generating a puzzle can be a hard task, because as it's dimensions grow bigger, so is the computation of the it's solution's steps algorithems (BFS/DFS). Also, Sometimes there is no solution for a puzzle and the steps algorithem will fail. That's why the backend has limits on the generating puzzles' algorithems and it's possible no puzzle will be generated.
