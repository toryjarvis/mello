# Mello  

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Firebase](https://img.shields.io/badge/firebase-a08021?style=for-the-badge&logo=firebase&logoColor=ffcd34) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

**Mello** is a full-stack task management tool built for collaborative planning, designed to emulate the utility and structure of internal tools used in modern tech teams. Inspired by productivity platforms like Trello, Asana, and Taigi, Mello demonstrates user-friendly and scalable architecture, secure authentication, modular UI/UX, and real-time responsiveness.

## Features

- **Secure Authentication**: Firebase Auth with email/password login
- **Board/Task System**: Dynamic board creation, task card organization
- **Real-Time Sync**: Firestore-backed updates across sessions
- **Responsive Design**: Built with Material UI for desktop and mobile
- **Reusable Components**: Modular, testable frontend structure

## Tech Stack

- **Frontend**: React, Material UI (MUI)
- **Backend**: Node.js, Express
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Hosting**: Local (for now), CI/CD planned

## Setup & Installation  

1. **Clone the repository**  

   ```sh
   git clone https://github.com/your-username/mello.git
   cd mello
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up Firebase**

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/)  
   - Enable Firestore and Authentication (Email/Password)  
   - Copy your Firebase config into `firebaseConfig.js`  

4. **Run the application**  

   ```sh
   npm start
   ```

## Roadmap

Last Updated: June 2025

### (Current) Phase 1: Structural and Feature Foundations

Shift focus to becoming an internal enterprise tool: Board and card enhancements, account and user preferences, and Firestore optimizations (a migration to Postgres is being considered).

### Phase 2: UX/UI Rebuild/Refinements

Continue UI integrations and refine to align with modern internal tools: Complete Material UI migration, streamline design, continue attention to accessibility, establish drag and drop enhancements and real-time updates.

### Phase 3: Collaboration and Organizational Features

Build like internal HR/DevOps: Multi-user support, tracking, advanced notifications, comments, mentions.

### Phase 4: Security and Scaling

Making Mello production-grade: Auth and RBAC features, scale the infrastructure

### Phase 5: AI Enhancement

Introduce machine learning where it matters: Task analytics, integrate GPT features.

## Contributions  

While this is a personal portfolio project, contributions are always welcome. If you notice any potential improvements or issues that could help the application run more smoothly, feel free to reach out, or fork the repository, submit issues, or open pull requests to help improve Mello!

### About The Author

**Victor "Tory" Jarvis**  
Full Stack Software Engineer | [GitHub](https://github.com/toryjarvis) | [LinkedIn](https://www.linkedin.com/in/victorjarvis)
