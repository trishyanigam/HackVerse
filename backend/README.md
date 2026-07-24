# HackVerse Backend Architecture

Production-ready modular backend base utilizing the MVC (Model-View-Controller) pattern.

## Technologies Used
- Node.js & Express.js
- MongoDB & Mongoose
- Security tools (Cors, Helmet)
- Development utils (Morgan, dotenv, cookie-parser, express-validator)

## Folder Structure
- `config/`: Database configurations and credentials.
- `constants/`: Global variables and role matrices.
- `controllers/`: Handles incoming payload business requests.
- `middleware/`: Error managers, route validators, auth checkers.
- `models/`: Database schema modeling.
- `routes/`: Express endpoint mappings.
- `services/`: Custom helper services.
- `utils/`: Custom errors, loggers, response formatting tools.
- `validators/`: Verification structures.

## Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill variables.
3. Start in development mode:
   ```bash
   npm run dev
   ```
