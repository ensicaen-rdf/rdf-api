# RDF API

## Getting startd

```
npm install
npm run start:dev
```

## Routes

- POST /auth (art)

- GET /me 
- POST /me/stats (number of steps)

- POST /camera/:idCamera/detect (person)
- POST /camera/:idCamera

- GET /report (ism)
- POST /report (person, reason) (ism)

- POST /person (name, infos, images)

## Sockets

- /me/stats (number of steps)

- /stats/:idPerson
- /stats