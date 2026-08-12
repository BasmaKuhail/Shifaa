# Shifaa

Shifaa is a healthcare platform interface built for patients, pharmacists, pharmacies, and administrators. The application provides medicine search, pharmacy discovery, medication requests, pharmacist workflows, pharmacy management, invitations, notifications, and medical assistance features.

> The project is currently under active development.

## Tech stack

- Next.js with the Pages Router
- React and TypeScript
- Tailwind CSS
- Axios for API communication
- Next-i18next and React-i18next for localization
- Framer Motion for animations
- Material UI and Lucide React for interface components

## Requirements

- Node.js 18 or newer
- npm
- A running Shifaa backend API


## Available scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm start        # Start the production server
npm run lint     # Run ESLint
```

## Main features

- Public landing pages and informational content
- Authentication and user profile management
- Medicine search and smart medicine search
- Pharmacy listing and pharmacy details
- Medication requests
- Pharmacist registration and switching to a pharmacist account
- Join-pharmacy requests and pharmacy invitations
- Pharmacy creation and pharmacy dashboard management
- Admin dashboard and request management
- Medical chatbot interface
- Notifications and responsive navigation


## Project structure

```text
components/   Reusable UI components and feature modules
contexts/     Shared React context providers
hooks/        Reusable React hooks
layouts/      Shared page layouts
lib/          API and application utilities
pages/        Next.js routes and API routes
public/       Images, icons, and other static assets
services/     Backend API service functions
styles/       Global styles and Tailwind-related styling
types/        Shared TypeScript types
utils/        Validation and general-purpose utilities
```

## Authentication

After login, the frontend stores the authentication token in browser `localStorage` under the key `token`. The shared Axios client automatically adds it as a Bearer token to authenticated API requests.


## API integration

API calls are organized in the `services/` directory and use the shared client in `lib/api.ts`. This keeps request logic separate from UI components and provides a single place for authentication headers and the API base URL.