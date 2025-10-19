# Attendance page: richer child details + Parent filter

This update adds more child details on the Anganwadi Worker Attendance page payload and ensures the Parent Dashboard shows only children linked to the logged‑in parent.

## What changed

- Backend `/api/attendance/today/:anganwadiCenter` now includes:
  - parentEmail, relationToChild, address, bloodGroup, currentWeight, currentHeight
  - lastVaccination (last entry from vaccinations), nutritionStatus
  - existing attendance fields (status, timeIn, nutritionReceived, healthCheckDone, notes)
- Backend `/api/registration/my-children` is a strict filter:
  - Returns only children where parentPhone = logged‑in user's phone OR parentEmail = logged‑in user's email.
  - If both are missing on the account, a 400 is returned with a helpful message.
- Added test UI `test-worker-attendance-extended.html` to preview richer details and mark attendance quickly.

## API sample (worker attendance today)

```json
{
  "success": true,
  "data": {
    "date": "2025-10-19",
    "anganwadiCenter": "Akkarakunnu Anganwadi",
    "statistics": {"total": 2, "present": 0, "absent": 2, "late": 0, "attendanceRate": "0%"},
    "children": [
      {
        "childId": "...",
        "name": "Akhil",
        "age": "5 years",
        "gender": "male",
        "parentName": "Lekha Arun",
        "parentPhone": "9xxxxxxxxx",
        "parentEmail": "parent@example.com",
        "relationToChild": "mother",
        "address": {"village":"…","block":"…"},
        "bloodGroup": "O+",
        "currentWeight": 17,
        "currentHeight": 108,
        "lastVaccination": {"vaccineName":"…","dateGiven":"…"},
        "nutritionStatus": "normal",
        "status": "absent",
        "timeIn": null,
        "nutritionReceived": false,
        "healthCheckDone": false,
        "notes": ""
      }
    ]
  }
}
```

## Try it

1) Start backend (Windows PowerShell):

```powershell
$env:NODE_ENV="development"; node "backend/server.js"
```

2) Open the extended worker test page and choose a worker:
- `test-worker-attendance-extended.html`

3) Parent Dashboard fetch (already wired):
- Endpoint: `GET /api/registration/my-children` (JWT required)
- Only children linked via phone/email of the logged‑in parent will be returned.

## Files touched

- `backend/routes/attendance.js` – enriched child details in today payload
- `backend/routes/attendance-test.js` – test route returns richer child info
- `backend/routes/registration.js` – strict parent children filter
- `backend/models/Child.js` – added index on `parentEmail`
- `test-worker-attendance-extended.html` – new demo UI for worker attendance

## Notes

- No front‑end framework code was modified; the test HTML page demonstrates the new data for quick validation.
- If your parent accounts lack email/phone, update them or relax the filter as needed.