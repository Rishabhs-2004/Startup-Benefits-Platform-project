# Startup Benefits & Deals Platform (Premium)

**🚀 [Live Demo](https://startup-benefits-platform-project.vercel.app)**

A premium full-stack platform built with Next.js 16 (App Router) and Node.js/Express, designed to connect early-stage startups with exclusive deals on top-tier SaaS tools.

---

## 📖 Table of Contents
1. [End-to-End Application Flow](#-end-to-end-application-flow)
2. [Authentication & Authorization Strategy](#-authentication--authorization-strategy)
3. [Internal Flow: Claiming a Deal](#-internal-flow-claiming-a-deal)
4. [Frontend & Backend Interaction](#-frontend--backend-interaction)
5. [UI & Performance Considerations](#-ui--performance-considerations)
6. [Known Limitations](#-known-limitations)
7. [Production Readiness Roadmap](#-production-readiness-roadmap)
8. [Setup & Installation](#-setup--installation)

---

## 🔄 End-to-End Application Flow

1.  **Landing**: User arrives at a high-conversion landing page highlighting the value proposition (saving $100k+ in credits).
2.  **Discovery**: Users browse the **Deals Marketplace**, where they can search and filter by category (Design, Dev, Marketing, etc.) and access level (Public vs. Restricted).
3.  **Authentication**: Users must register/login to view full deal details and initiate the claim process.
4.  **Verification**: Certain high-value deals (Restricted) are locked. Users see a "Verification Required" notice and must be verified by an admin (or meeting system criteria) to access them.
5.  **Claiming**: User clicks "Claim This Deal". The system validates eligibility against the backend.
6.  **Tracking**: Claimed deals appear in the **User Dashboard** with a status track (Pending -> Approved/Rejected).
7.  **Redemption**: Once approved, the unique redemption link or code is made available to the user in their dashboard.

---

## 🔐 Authentication & Authorization Strategy

-   **JWT-Based Auth**: Security is handled via JSON Web Tokens.
    -   Tokens are issued upon login/register and stored in `localStorage`.
    -   Axios interceptors automatically attach the `Authorization: Bearer <token>` header to protected requests.
-   **Role-Based Access Control (RBAC)**:
    -   **User**: Can browse, claim, and track their own benefits.
    -   **Admin**: Can manage deals (CRUD) and approve/reject claims.
-   **Resource Protection**:
    -   Backend middleware (`protect` and `admin`) ensures only authenticated users can access private routes and only admins can manage global state.
    -   Restricted deals have an additional check: `if (deal.accessLevel === 'restricted' && !user.isVerified)`.

---

## 🛠 Internal Flow: Claiming a Deal

1.  **Request**: Frontend sends a `POST` request to `/api/claims` with the `dealId`.
2.  **Validation**:
    -   Checks if the deal exists.
    -   Checks if the deal is 'restricted' and if the user is 'verified'.
    -   Checks if the user has already claimed this specific deal (prevents duplicates).
3.  **Persistence**: A new `Claim` document is created in MongoDB with a default status of `pending`.
4.  **Notification (Planned)**: Admin is notified of a new claim requiring review.
5.  **State Sync**: Frontend redirects user to the Dashboard, which re-fetches the latest claims list for real-time feedback.

---

## 📡 Frontend & Backend Interaction

-   **Frontend**: Next.js 16 (App Router) using TypeScript for type safety. States are managed via React Context (`AuthContext`).
-   **Backend**: CommonJS-based Node.js/Express server (REST API).
-   **Data Sync**: Axios is used for all HTTP communication.
-   **Models**:
    -   `User`: Identity and verification status.
    -   `Deal`: Product details, access levels, and eligibility rules.
    -   `Claim`: Link between a User and a Deal with status tracking.

---

## 🎨 UI & Performance Considerations

-   **Glassmorphism Design**: Uses a dark-mode first, premium aesthetic with `backdrop-blur` and subtle borders.
-   **Motion & Interaction**: Powered by `framer-motion` for page transitions, layout animations (on filters), and hover micro-interactions.
-   **Loading States**: Skeleton-like loaders and `Loader2` icons ensure users never see a static "broken" screen during data fetching.
-   **SEO**: Implemented proper metadata for search engine optimization.
-   **Responsiveness**: Mobile-first design ensures founders can browse perks on the go.

---

## ⚠️ Known Limitations

-   **Verification Process**: The verification apply/approval flow is currently manual (handled via database/admin dashboard).
-   **Search Performance**: Search is currently performed on the client side (suitable for <1000 deals). For scale, this would transition to MongoDB `$text` search.
-   **Real-time Updates**: Status changes require a page refresh or re-fetch. Socket.io could be added for instant approval notifications.

---

## 🚀 Production Readiness Roadmap

1.  **Image Optimization**: Use Next.js `<Image />` component with a remote pattern config for logo URLs.
2.  **Email Notifications**: Integrate SendGrid/Postmark for claim status updates.
3.  **Deployment Monitoring**: Setup Sentry and Vercel Analytics.
4.  **Database Indexing**: Add compound indexes on `claims` for `(user, deal)` to further optimize lookups.
5.  **Advanced 3D Components**: Enhance the Hero section with a Three.js interactive globe or tool cloud for "Wow" factor.

---

## 🛠 Setup & Installation

### 1. Backend Setup
```bash
cd server
npm install
# Configure .env with MONGO_URI and JWT_SECRET
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
# Configure .env.local with NEXT_PUBLIC_API_URL
npm run dev
```

---
*Created for the Full-Stack Developer Assignment.*
