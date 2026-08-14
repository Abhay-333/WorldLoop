# WorldLoop — Codebase Status and Next-Feature Guide

Last reviewed: 12 August 2026

## 1. Product snapshot

WorldLoop is a MERN social-media application with an Instagram-style interface. The project has a solid visual foundation and a working authentication backend. User and post MongoDB models exist, including a development data seeder. The product-facing areas beyond authentication are currently UI prototypes or partial backend foundations rather than end-to-end features.

The most valuable next feature is **the post system**: create/upload a post, retrieve a paginated feed, and render real posts in the existing feed and profile grid. It unlocks the central product loop and provides the data foundation for likes, comments, Explore, notifications, and eventually messaging context.

## 2. Repository map

```text
WorldLoop/
├── backend/                 Express + MongoDB API
│   ├── server.js             database startup and HTTP listener
│   └── src/
│       ├── modules/          auth and user controller/service/route layers
│       ├── models/           User and Post Mongoose schemas
│       ├── repositories/     database access classes
│       ├── middlewares/      auth, security, validation, error handling
│       ├── config/           environment, DB, mail, passport, logger
│       └── scripts/          fake-user/fake-post seeder
├── frontend/                React 19 + Vite web app
│   └── src/
│       ├── app/              router, providers, layouts, query client/store
│       ├── features/         auth, feed, explore, messages, profile, theme
│       ├── components/       shared custom and shadcn/Radix UI components
│       └── shared/lib/       Axios client
├── docs/                    project material and this status document
└── docker-compose.yml        frontend, backend, and MongoDB development stack
```

## 3. Technology actually in use

| Area | Current implementation |
| --- | --- |
| Frontend | React 19, Vite, JavaScript/JSX with TypeScript configuration, Tailwind CSS 4, shadcn/Radix UI, Lucide icons |
| Client state/data | TanStack React Query, Redux Toolkit, Axios, React Hook Form, React Hot Toast |
| Backend | Node.js, Express 5, Mongoose/MongoDB, JWT in cookies, Passport Google OAuth, Nodemailer |
| Security/operations | CORS with credentials, Helmet, HPP, compression, cookie-parser, Pino logging, Docker Compose |

Some technologies named in the earlier `docs/Tech Stack.md` are planned rather than present in code: Socket.IO, Cloudinary, Multer, Redis, RTK Query, Framer Motion, Husky/lint-staged, CI/CD, comments, notifications, conversations, and search APIs.

## 4. What works today

### Authentication

The API base path is `/api/v1`. Authentication is the most complete vertical slice:

| Method | Endpoint | Status | Notes |
| --- | --- | --- | --- |
| POST | `/auth/register` | Implemented | Validates input, creates an unverified user, sends a 15-minute verification link. |
| POST | `/auth/login` | Implemented | Requires a verified email; creates 1-day access and 7-day refresh tokens. |
| POST | `/auth/refresh` | Implemented | Rotates the refresh token stored in the cookie and database. |
| POST | `/auth/logout` | Implemented | Clears auth cookies and invalidates the stored refresh token. |
| POST | `/auth/forgot-password` | Implemented | Sends a 5-minute reset link. |
| POST | `/auth/reset-password/:token` | Implemented | Updates the password and invalidates refresh tokens. |
| GET | `/auth/verify-email/:token` | Implemented | Verifies a registration email token. |
| POST | `/auth/resend-verification` | Implemented | Generates and emails a replacement verification token. |
| GET | `/auth/me` | Implemented | Cookie-authenticated current-user lookup. |
| GET | `/auth/google` and `/auth/google/callback` | Backend implemented | Passport login/callback and cookie creation are configured. The UI does not currently initiate this flow. |

The frontend provides login, registration, verification, resend verification, forgotten-password, reset-password, protected/public routing, logout, and toasts. Session cookies are sent by Axios through `withCredentials: true`.

### User/profile foundation

Implemented server routes:

| Method | Endpoint | Status | Notes |
| --- | --- | --- | --- |
| GET | `/users/:username` | Partial | Finds a user by username. It currently returns the raw user document. |
| GET | `/users/:username/posts` | Partial | Authenticated; currently returns posts for the logged-in user, not the username in the URL. |
| PATCH | `/users/profile` | Partial | Updates `fullName`, `bio`, `website`, and `location`. |
| POST | `/users/profile/avatar` | Not functional as advertised | Calls the text profile-update controller; no multipart upload or avatar field support exists. |

The frontend has a well-developed profile header, tabs, grid, loading skeletons, and infinite-scroll design. However, its three data hooks (`useProfile`, `useProfilePosts`, `useToggleFollow`) are empty, and the router only exposes `/home/profile` while the page expects a `:username` parameter. It therefore cannot yet display a real profile.

### Data model and development tooling

- `User` supports identity, password hashing, profile text, avatar/cover metadata, follower/following arrays, verification/reset/session fields, and timestamps.
- `Post` supports author, captions, one-or-more image/video items, location, tagged users, likes, comment count, archive/comments settings, virtual counts, and useful MongoDB indexes.
- `npm run seed` creates verified fake users, a random follow graph, and fake image posts. Pass arguments directly to the script, for example `node src/scripts/seedUsers.js --count=30 --posts=8`; `--clear` deletes existing users and posts first, so only use it intentionally in development.
- Docker Compose starts frontend (5173), backend (5000 by default), and MongoDB (27017 by default). Backend environment is read from `backend/.env`; frontend needs Vite variables such as `VITE_API_BASE_URL` and `VITE_GOOGLE_CLIENT_ID`.

## 5. Current UI state

| Screen | Current behavior | Data status |
| --- | --- | --- |
| Home feed | Stories, post cards, likes/saves/comment composer, suggestions | All post/story/suggestion data is local mock data. Like/save interactions are local only. |
| Explore | Search-looking UI and masonry grid | Uses a local mock array; search does not filter or call an API. |
| Messages | Conversation list, thread, composer | Uses local mock conversations/messages. Sending, calls, and information buttons are not connected. |
| Profile | Header, post/saved/tagged tabs, infinite grid UI | Components expect API data, but their hooks are empty and route/data contracts do not yet align. |
| Navigation | Sidebar/mobile navigation | Notifications (`/home/notifications`) and Create (`/home/create`) targets are shown but not routed. Profile navigation has no username. |
| Theme | Light/dark preference | Implemented with a theme provider and Redux; reset to light on logout. |

## 6. Important gaps and risks

### Functional gaps

1. There is no post module/API yet: no create, feed, detail, update/delete, media upload, like, save, archive, or Explore endpoint.
2. Comments, follow/unfollow, saved posts, notifications, search, stories, conversations/messages, and realtime sockets have no backend models/services/routes.
3. The UI uses mock data for feed, Explore, messages, suggestions, navigation identity, and parts of profile behavior.
4. No automated tests are configured; backend `npm test` is a placeholder.

### Integration and correctness items

1. `GET /users/:username/posts` ignores `:username` and queries `req.user.id`, so viewing another user's posts will be wrong.
2. Profile API and UI shapes differ. The API stores `fullName`, `avatar.url`, follower arrays, etc.; the UI expects `displayName`, `avatarUrl`, `postsCount`, `followersCount`, `followingCount`, `isOwnProfile`, and `isFollowedByMe`. Introduce response DTOs before wiring the UI.
3. The profile page expects `:username`, but no corresponding frontend route exists. The current `/home/profile` route supplies no username.
4. `GET /users/:username` returns the model document without a public projection/DTO. It may expose session and verification/reset fields such as `refreshToken`; create a public-user response that explicitly omits all sensitive fields.
5. Registration generates access/refresh tokens but does not set cookies or return them; this is harmless but unnecessary for the email-verification flow.
6. The Google strategy can derive duplicate usernames for different users, and the frontend Google button has no action handler.
7. The backend currently has no rate limiting, request-size limits tailored to media, upload validation, or test coverage. Add these before opening the app beyond trusted development users.

## 7. Recommended next feature: real posts and feed

Build this as a vertical slice, in the order below. It provides a working core loop with the least dependency on later modules.

```text
Post API + media storage
        ↓
Feed query and profile-post query
        ↓
TanStack Query hooks/API adapters
        ↓
Real Feed and Profile grid
        ↓
Create-post screen and optimistic interactions
```

### Scope for the first post milestone

1. **Define API contracts**
   - Create a public `UserSummary` and a `PostCard` DTO. Standardize `id`, `author`, `thumbnailUrl`, `media`, `likesCount`, `commentsCount`, and cursor metadata.
   - Choose cursor pagination (`createdAt` plus `_id`) for `/posts/feed`, `/posts/explore`, and `/users/:username/posts`.
   - Decide media storage now. Cloudinary + Multer (or another object store) is required before a true create-post feature; do not accept arbitrary remote image URLs in production.

2. **Implement a `post` backend module**
   - Add routes, validation, controller, service, and repository around the existing `Post` model.
   - Start with authenticated `POST /posts`, authenticated `GET /posts/feed`, public/authenticated `GET /posts/:id`, and `GET /users/:username/posts`.
   - Enforce ownership for editing/deleting and return DTOs instead of raw Mongoose documents.
   - Correct the existing profile-post route to look up `req.params.username` while using the authenticated user only for relationship flags.

3. **Wire frontend data**
   - Add `posts.api.js` and React Query hooks for the feed and profile posts.
   - Replace `POSTS` in `Feed.jsx` and adapt `PostCard` to the server DTO.
   - Implement `useProfile` and `useProfilePosts`, add a username route such as `/home/profile/:username`, and navigate to the logged-in username for the own-profile item.
   - Keep API-specific transformation in hooks/adapters, not inside presentational components.

4. **Add a minimum test and verification set**
   - Backend: create post, unauthenticated request rejection, media validation, feed cursor behavior, profile-post ownership/username behavior.
   - Frontend: loading, empty, successful feed, and failed request states.
   - Smoke-test with the seed script, then run the frontend build and lint.

## 8. Near-term roadmap after posts

| Priority | Feature | Why it follows posts |
| --- | --- | --- |
| P1 | Likes, comments, saved posts | They operate directly on the newly real post surface. |
| P1 | Follow/unfollow and suggestions | Makes the feed socially relevant and enables profile actions. |
| P2 | Explore and search | Reuses post query/index/pagination patterns. |
| P2 | Notifications | Can be emitted from likes, comments, and follows. |
| P3 | Messages + Socket.IO | Requires conversation/message models, authorization, presence, and realtime infrastructure. |
| P3 | Stories, calls, richer media | Higher-complexity product work after the core loop is stable. |

## 9. Development and quality checklist

- Frontend production build currently passes (`npm.cmd run build`).
- Frontend lint currently fails on `src/components/ui/button.tsx` because it exports non-component values alongside a component; it also reports two `useEffect` dependency warnings in `src/app/theme-provider.tsx`.
- The Vite build reports a minified JavaScript chunk over 500 kB. Consider route-level lazy loading after the core data features are wired.
- The root README is only a placeholder. After the post milestone, replace it with setup instructions, environment-variable templates (never actual secrets), seed instructions, test commands, and an API/docs link.
- Keep `.env` out of version control. Provide `.env.example` files for both frontend and backend.

## 10. Definition of done for the next feature

The post/feed milestone is complete when a verified user can create a validated image post, see it in a cursor-paginated feed after refresh, view it on their profile grid, and receive safe/consistent API responses for loading, empty, validation, and authorization errors. No mocked feed or profile-post data should remain in that path.
