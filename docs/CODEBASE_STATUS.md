# WorldLoop — Codebase Status

Last reviewed: 15 August 2026

## Product snapshot

WorldLoop is a MERN social-media application with an Instagram-style React interface. Authentication is the most complete end-to-end area. Profile management has progressed since the previous status review: users can update profile text, upload or remove avatars through Cloudinary, toggle account privacy, and retrieve public follower/following lists. The central post/feed experience, social interactions, and most data-driven frontend views remain incomplete.

## Repository map

```text
WorldLoop/
├── backend/                 Express + MongoDB API
│   └── src/
│       ├── modules/         auth, user, and in-progress post modules
│       ├── models/          User and Post Mongoose schemas
│       ├── repositories/    data-access classes
│       ├── middlewares/     auth, upload, security, validation, errors
│       ├── config/          environment, DB, mail, Passport, Cloudinary
│       └── scripts/         fake user/post seeder
├── frontend/                React 19 + Vite web application
│   └── src/
│       ├── app/             routing, providers, layouts, store/query client
│       ├── features/        auth, feed, explore, messages, profile, theme
│       └── components/      shared custom and shadcn/Radix components
├── assets/                  default avatar asset
├── docs/                    requirements, stack notes, status document
└── docker-compose.yml       frontend, backend, and MongoDB development stack
```

## Technology in use

| Area | Current implementation |
| --- | --- |
| Frontend | React 19, Vite, JavaScript/JSX with TypeScript config, Tailwind CSS 4, shadcn/Radix UI, Lucide |
| Client state/data | TanStack React Query, Redux Toolkit, Axios, React Hook Form, React Hot Toast |
| Backend | Node.js, Express 5, Mongoose/MongoDB, JWT cookies, Passport Google OAuth, Nodemailer |
| Media | Multer memory storage, Cloudinary upload/delete helpers for avatars |
| Operations/security | CORS credentials, Helmet, HPP, compression, cookie-parser, Pino logging, Docker Compose |

Not implemented despite earlier planning/docs: Socket.IO, Redis, RTK Query, Framer Motion, CI/CD, automated tests, comments, notifications, conversations, search APIs, and post-media upload.

## Implemented functionality

### Authentication

All endpoints use the `/api/v1` base path.

| Method | Endpoint | Status | Notes |
| --- | --- | --- | --- |
| POST | `/auth/register` | Implemented | Creates an unverified account and emails a 15-minute verification link. |
| POST | `/auth/login` | Implemented | Requires verified email and sets access/refresh-token cookies. |
| POST | `/auth/refresh` | Implemented | Rotates the stored refresh token. |
| POST | `/auth/logout` | Implemented | Clears cookies and invalidates refresh token storage. |
| POST | `/auth/forgot-password` | Implemented | Emails a five-minute reset link. |
| POST | `/auth/reset-password/:token` | Implemented | Resets password and invalidates refresh tokens. |
| GET | `/auth/verify-email/:token` | Implemented | Verifies registration email. |
| POST | `/auth/resend-verification` | Implemented | Issues a replacement verification token. |
| GET | `/auth/me` | Implemented | Returns the authenticated current user. |
| GET | `/auth/google`, `/auth/google/callback` | Backend implemented | Passport OAuth/cookie flow exists; the frontend button is not wired to start it. |

The frontend provides login, registration, email verification/resend, password reset, protected/public routes, logout, and toast feedback. Axios sends cookies with requests.

### User and profile API

| Method | Endpoint | Status | Notes |
| --- | --- | --- | --- |
| GET | `/users/:username` | Implemented, unsafe response shape | Finds a username and returns the raw user document. A public DTO/projection is still required. |
| GET | `/users/:username/posts` | Partial | Requires authentication but currently fetches the authenticated user's posts, ignoring `:username`. |
| PATCH | `/users/profile` | Implemented | Updates `fullName`, `bio`, `website`, and `location`. |
| PATCH | `/users/profile/avatar` | Implemented | Accepts one `avatar` image via Multer, uploads it to Cloudinary, and removes the prior non-default Cloudinary asset. JPEG, PNG, and WebP are accepted up to 5 MB. |
| DELETE | `/users/profile/avatar` | Implemented | Deletes the existing non-default Cloudinary avatar and restores the configured default avatar. |
| PATCH | `/users/profile/privacy` | Implemented | Toggles `isPrivateAccount` for the authenticated user. |
| GET | `/users/:username/followers` | Implemented | Public endpoint; returns populated follower summaries. |
| GET | `/users/:username/following` | Implemented | Public endpoint; returns populated following summaries. |

The `User` model includes profile text, avatar metadata, privacy state, follower/following arrays, verification/reset/session fields, and timestamps. The `Post` model already supports an author, carousel media metadata, caption, location, tagged users, likes, comments counter, archive/comment settings, virtual counts, and useful indexes.

### Frontend state

| Area | Current behavior | Data status |
| --- | --- | --- |
| Home feed | Stories, post cards, local like/save/comment interactions, suggestions | Mock data only. |
| Explore | Search-styled UI and masonry grid | Mock data; search has no filtering or API call. |
| Messages | Conversation list, thread, composer | Mock conversations/messages; no send, calls, or realtime connection. |
| Profile | Header, tabs, grid, and loading/error UI | Hooks are empty and `profile.api.js` only contains an incomplete avatar request. No live profile data is wired. |
| Navigation | Sidebar and mobile navigation | Notifications and create targets are displayed but not routed. Profile route is `/home/profile` only. |
| Theme | Light/dark preference | Implemented with provider and Redux; reset to light on logout. |

## Work currently in progress

- `backend/src/modules/post/` is an untracked work-in-progress directory. `post.route.js` contains only an empty `GET /` handler; `post.controller.js` and `post.service.js` are empty.
- The post router is not registered in `src/routes/index.route.js`, so no post API is currently exposed.
- A Word temporary lock file, `docs/~$rldLoop_SRS_v1_1.docx`, is untracked. It appears to be generated by Microsoft Word and should not be committed.

## Remaining work

### Highest priority: complete the post/feed vertical slice

1. Define safe response DTOs for public users and post cards, including viewer-specific flags where needed.
2. Implement and mount the post module: validation, controller, service, repository, and routes for post creation, feed retrieval, detail, and owner update/delete.
3. Add validated post-media upload/storage (Cloudinary can be reused; do not accept arbitrary remote URLs in production).
4. Use cursor pagination for feed, Explore, and profile posts.
5. Fix `GET /users/:username/posts` to query the route username and return an empty success response when appropriate.
6. Create frontend post API adapters and React Query hooks; replace feed/profile mocks with live API data.
7. Add `/home/profile/:username` and navigate the current user to their username-based profile.

### Next social features

- Follow/unfollow mutations and suggestion logic. Existing follower/following retrieval does not change relationships.
- Likes, saved posts, comments, archive controls, tagged posts, and their authorization rules.
- API-backed Explore and search.
- Notifications, then conversations/messages and Socket.IO realtime behavior.
- Stories, calls, richer video/media handling.

### Integration, security, and quality gaps

1. Replace raw user-document responses with a public projection/DTO. Current profile responses may expose sensitive session or verification/reset fields.
2. Define privacy behavior: the flag can be toggled but is not enforced in profile, follower, following, or post access.
3. Add rate limits, request-size limits, and tests for upload failures/Cloudinary errors. Avatar upload MIME/size validation is present; broader hardening is not.
4. Add backend test tooling. `backend` has only a placeholder `npm test` script.
5. Add a frontend test script and test loading, empty, success, error, and authorization states.
6. Add `.env.example` files and replace the placeholder root `README.md` with setup, environment, Docker, seed, and test instructions.
7. Wire the frontend Google sign-in action and make generated Google usernames collision-safe.

## Verified quality status (15 August 2026)

| Check | Result |
| --- | --- |
| `frontend: npm run build` | Passes. Vite reports one minified JavaScript chunk of 539 kB, above its 500 kB advisory threshold. |
| `frontend: npm run lint` | Fails: one `react-refresh/only-export-components` error in `src/components/ui/button.tsx`; two `react-hooks/exhaustive-deps` warnings in `src/app/theme-provider.tsx`. |
| `frontend: npm test` | Not available; no `test` script is defined. |
| `backend: npm test` | Not a test suite; the defined placeholder script exits with an error. |

## Definition of done for the next milestone

A verified user can create a validated media post, see it after refresh in a cursor-paginated feed, and view it on the correct username-based profile grid. The API returns safe, consistent DTOs for loading, empty, validation, and authorization cases; the feed and profile-post path uses no mock data; and automated checks cover the main backend and frontend states.
