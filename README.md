# StewardHQ Web

StewardHQ is a people-centric platform for managing team scheduling, availability, assignments, and training. This repository contains the frontend web app built on StewardHQ's API.

## Architecture

- [React.js](https://react.dev/) - JavaScript/TypeScript UI web framework
- [Vite](https://vite.dev/) - Frontend build tool
- [TailwindCSS](https://tailwindcss.com/) - Utility-based styling
- [Railway](https://railway.com/) - Hosting an infrastructure

## Getting Started / Installation

1. Clone this repo
2. Install dependencies:
    ```bash
    npm install
    ```
3. Configure environment variables
    - `.env`
        - `VITE_STEWARDHQ_API_BASE_URL` – StewardHQ API URL
        - `VITE_STEWARDHQ_API_KEY` – StewardHQ API key
4. Run dev server

    ```bash
    npm run dev
    ```

    Server is running on [localhost:5173](http://localhost:5173)
