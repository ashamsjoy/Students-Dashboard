# Copilot Instructions for Student Dashboard Project

## Project Overview
- **Backend:** Django + Django REST Framework (DRF)
- **Frontend:** React (Create React App, Bootstrap)
- **API:** Exposed at `/api/students/` (CRUD, search, filter)

## Key Architectural Patterns
- **DRF ModelViewSet** (`students/views.py`): Handles all CRUD for `Student` model.
- **Filtering/Search:** Enabled via `django-filter` and DRF's `SearchFilter` (search by `name`, `course`, `email`; filter by `course`, `year_level`).
- **React Components:**
  - `StudentForm.js`: Add/edit student, uses `api.js` for HTTP.
  - `StudentList.js`: List/search/delete students, uses debounced search (`useDebounce.js`).
- **API Integration:** All HTTP via `axios` (`api.js`), base URL `http://localhost:8000/api/`.

## Developer Workflows
- **Backend:**
  - Run server: `python manage.py runserver`
  - Migrate: `python manage.py makemigrations && python manage.py migrate`
- **Frontend:**
  - Start dev server: `npm start`
  - Run tests: `npm test`
  - Build: `npm run build`

## Project-Specific Conventions
- **Search/Filter:** Use query params (`?search=`, `?course=`) for filtering students.
- **Debounce:** All search input is debounced (see `useDebounce.js`).
- **Component Communication:** `App.js` manages edit state and triggers list refresh via a `refreshKey` prop.
- **API Calls:** Prefer using `api.js` for HTTP requests. `studentService.js` is currently unused.

## Notable Files
- Backend: `students/models.py`, `students/serializers.py`, `students/views.py`, `students/urls.py`, `student_dashboard/urls.py`
- Frontend: `src/components/StudentForm.js`, `StudentList.js`, `useDebounce.js`, `api.js`

## Integration Points
- React frontend <-> Django backend via REST API (`/api/students/`)
- Search/filter handled by backend, triggered by frontend debounced input

## Examples
- **Search students:** `GET /api/students/?search=John`
- **Filter by course:** `GET /api/students/?course=Science`

---

For new features, follow the patterns in the files above. For API changes, update both backend (DRF) and frontend (React) as needed.
