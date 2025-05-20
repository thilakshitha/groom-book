
# Men's Salon Booking Platform

A responsive web application built with React and Firebase for booking salon services.

## Features

- **User Authentication**: Sign up and login with email/password or Google
- **User Profile Management**: Update profile information
- **Service Browsing**: View available salon services with details
- **Appointment Booking**: Select services, dates, and times for appointments
- **Appointment Management**: View, cancel, and reschedule appointments

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Backend**: Firebase (Authentication, Firestore)
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure Firebase:
   - Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google sign-in)
   - Create a Firestore database
   - Update the Firebase configuration in `src/lib/firebase.ts` with your project credentials

4. Start the development server:
   ```
   npm run dev
   ```

## Firebase Configuration

The app requires the following Firebase services:

1. **Authentication**:
   - Email/Password authentication
   - Google sign-in

2. **Firestore Database**:
   - Collections:
     - `users`: User profile information
     - `services`: Available salon services
     - `appointments`: Booked appointments

## App Structure

- `/src/components`: Reusable UI components
- `/src/contexts`: Context providers (Auth)
- `/src/hooks`: Custom hooks
- `/src/lib`: Utility functions and configuration
- `/src/pages`: Main application pages
- `/src/types`: TypeScript type definitions

## Deployment

1. Build the project:
   ```
   npm run build
   ```

2. Deploy to Firebase Hosting:
   ```
   firebase deploy
   ```

## License

This project is open source and available under the MIT License.
