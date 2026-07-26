# HackVerse System Architecture & Flow Documentation

## 1. Architectural Overview (MVC & Service Pattern)

HackVerse follows a strict 3-tier **Model-View-Controller-Service (MVC-S)** architecture designed for enterprise scalability, testability, and clean separation of concerns:

```
[ Client / Web Browser / Mobile App ]
                │  HTTP / REST API / Websockets
                ▼
      [ Express Router & Middleware ]
     (Helmet, CORS, RateLimit, Auth, Validators)
                │
                ▼
         [ Controller Layer ]
    (Thin handlers: req parsing & res formatting)
                │
                ▼
          [ Service Layer ]
  (Business logic, domain rules, transactions)
                │
                ▼
        [ Data Access Layer ]
     (Mongoose Schema Models & MongoDB)
```

### Layer Responsibilities
- **Routes Layer (`/routes`)**: Defines endpoint paths, HTTP verbs, security middleware chains (`authenticate`, `authorize`), and `express-validator` schema validations.
- **Controller Layer (`/controllers`)**: Decouples Express HTTP objects (`req`, `res`, `next`) from business logic. Passes parameters to services and formats responses using standardized `successResponse`.
- **Service Layer (`/services`)**: Encapsulates all domain-driven business logic, calculation engines, database queries, external integrations (Nodemailer, PDFKit), and custom `ApiError` exceptions.
- **Model Layer (`/models`)**: Declares Mongoose schemas, field validations, enum constraints, compound indexes, and virtual getters.

---

## 2. Authentication & Authorization Flow

```
User Login ──► JWT Access Token (1d) + Refresh Token (7d)
                   │
                   ▼
Client sends: Header 'Authorization: Bearer <accessToken>' OR Cookie
                   │
                   ▼
         [ authenticate Middleware ]
  1. Decodes JWT token using JWT_ACCESS_SECRET
  2. Loads active User record from MongoDB
  3. Rejects if user is blocked or deleted
  4. Attaches req.user
                   │
                   ▼
          [ authorize Middleware ]
  Verifies req.user.role in allowed roles list (ADMIN, ORGANIZER, JUDGE, PARTICIPANT)
```

---

## 3. Hackathon Lifecycle Workflow

```
[ DRAFT ] ──► Organizer configures title, dates, rules, prizes, judges
    │
    ▼
[ PUBLISHED ] ──► Publicly visible, registration opens
    │
    ▼
[ REGISTRATION OPEN ] ──► Participants register, form teams using teamCode/inviteCode
    │
    ▼
[ REGISTRATION CLOSED ] ──► Registration deadline passes
    │
    ▼
[ SUBMISSION PHASE ] ──► Team leaders submit GitHub repo, live demo, PDF deck
    │
    ▼
[ UNDER REVIEW ] ──► Assigned judges evaluate submissions on 7 criteria (0-10)
    │
    ▼
[ COMPLETED ] ──► Leaderboard generated & published, PDF certificates issued
```

---

## 4. Submission Workflow

1. **Eligibility Check**: Verifies hackathon is `PUBLISHED`, user is registered, and `now <= registrationDeadline/endDate`.
2. **Leader Restriction**: Ensures `req.user` is the designated `leader` of an active team.
3. **Uniqueness**: Enforces single submission per team per hackathon via Mongo compound unique index `{ team: 1, hackathon: 1 }`.
4. **File Handling**: Uploads screenshots (up to 5 images, 5MB max) and presentation slide deck (PDF, 20MB max) to `uploads/submissions/`.
5. **Editing Lock**: Prohibits edits once status advances to `UNDER_REVIEW`, `APPROVED`, or `REJECTED`.

---

## 5. Judging & Leaderboard Workflow

```
         Assigned Judges
               │
               ▼
[ 7 Criteria Evaluation (0 - 10) ]
(Innovation, Tech Complexity, UI/UX, Functionality, Scalability, Docs, Presentation)
               │
               ▼
[ Pre-save Hook: Auto-calculate overallScore (Average) ]
               │
               ▼
[ Organizer Triggers: POST /api/v1/leaderboard/generate/:hackathonId ]
               │
               ▼
   [ Ranking Algorithm ]
   1. Primary: averageScore DESC (highest score first)
   2. Tie-Breaker: submittedAt ASC (earliest submission timestamp wins!)
               │
               ▼
[ Organizer Triggers: PATCH /api/v1/leaderboard/publish/:hackathonId ]
   1. Locks all judge evaluations against editing
   2. Unlocks public/participant view of leaderboard & reviews
   3. Auto-triggers PDFKit certificate generation queue
```
