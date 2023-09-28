
## Installation

To install required node modules:
```bash
cd nursing-web-app
npm install concurrently

cd server
npm install axios cors express mysql2

cd client
npm install react react-bootstrap@next bootstrap@5.1.0 react-router-dom axios formik yup reactstrap
```

## Running

To run in developer mode:
```bash
cd nursing-web-app/server
node server.js
```

## Updating Frontend

After making any updates to the frontend react code contained in nursing-web-app/client, you can update the static version served by the backend by:
```bash
cd nursing-web-app/client
npm run build
cd ../..
cp -r nursing-web-app/client/build/* nursing-web-app/server/public
```
