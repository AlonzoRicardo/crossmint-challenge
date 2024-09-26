# Crossmint Challenge

This project is a solution to the Crossmint challenge, which involves interacting with the Megaverse API to create and manage entities on a map. The project is divided into multiple phases, each with specific tasks to accomplish.

### Thank You Note

I would like to express my sincere gratitude to Crossmint for considering my candidacy. This challenge was fun. I appreciate the opportunity to showcase my skills and look forward to the possibility of contributing to your team. Thank you for your time and consideration.

## Project Structure

- `bin/`: Contains the executable scripts for different phases of the challenge.
  - `megaverse.ts`: Script for Phase 1 and Phase 2 of the challenge.
- `src/`: Contains the core logic and services for interacting with the Megaverse API.
  - `client.ts`: Defines the `MegaverseClient` class for making API requests.
  - `megaverse-service.ts`: Defines the `MegaverseService` class for higher-level operations.
  - `types.ts`: Defines TypeScript types used throughout the project.

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/crossmint-challenge.git
   cd crossmint-challenge
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

### Configuration

The `candidateId` is passed as a command-line argument when running the script. This approach avoids hardcoding sensitive information.

### Running the Scripts

To build and run the binary, you can use the following command:

1. Build the TypeScript code:
   ```sh
   npm run build
   ```

2. Run the script with your candidate ID:
   ```sh
   npm run start -- --candidate-id c8c6a11c-3fda-4dd7-b0a5-cae630b2c613
   ```

This will compile the TypeScript code and run the script with the specified candidate ID.

### Running in a Docker Container

If you prefer to run the project in a Docker container, follow these steps:

1. Build the Docker image:
   ```sh
   docker build -t crossmint-challenge .
   ```

2. Run the Docker container with your candidate ID as an argument:
   ```sh
   docker run crossmint-challenge --candidate-id c8c6a11c-3fda-4dd7-b0a5-cae630b2c613
   ```

This will build the Docker image and run the container. Make sure to pass the candidate ID as an argument.

### Running Tests

To run the test suite for this project, follow these steps:

1. Ensure you have installed all dependencies as described in the Installation section above.

2. Run the following command in the project root directory:
   ```sh
   npm test
   ```

