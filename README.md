# RDF API

## Getting startd

```
npm install
npm run start:dev
```

## Routes

- POST /auth

- GET /me
- POST /me/stats (number of steps)

- POST /camera/:idCamera/detect (person)
- POST /camera/:idCamera

- GET /report
- POST /report (person, reason)

- GET /stats
- GET /stats/:idPerson

- POST /person (name, infos, images)
