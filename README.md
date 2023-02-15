DEMO: https://lawyers-management-system.vercel.app/

## Development

To get a local copy of the code, clone it using git:

```
git clone https://github.com/zehan12/lawyers-management-system.git
cd lawyers-management-system
```

Install dependencies:

```
yarn
```

Now, you can start a local web server by running:

```
yarn dev
```

And then open http://localhost:3000 to view it in the browser.

## Folder Structure

```
├── ReadMe.md
├── index.html
├── jsconfig.json
├── package.json
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── legistify_logo.png
│   ├── component
│   │   ├── Firms
│   │   │   ├── FirmCreate
│   │   │   │   ├── FirmCreate.css
│   │   │   │   └── index.jsx
│   │   │   ├── FirmList
│   │   │   │   ├── FirmCard.jsx
│   │   │   │   ├── FirmsList.css
│   │   │   │   └── index.jsx
│   │   │   └── index.jsx
│   │   ├── Lawyers
│   │   │   ├── LawyerDetails
│   │   │   │   ├── SlotsBooking
│   │   │   │   │   ├── index.jsx
│   │   │   │   │   └── slotBooking.css
│   │   │   │   └── index.jsx
│   │   │   ├── LawyersList
│   │   │   │   ├── LawyerCreate
│   │   │   │   │   └── index.jsx
│   │   │   │   ├── LawyersTable
│   │   │   │   │   ├── LawyersTable.css
│   │   │   │   │   └── index.jsx
│   │   │   │   └── index.jsx
│   │   │   └── index.jsx
│   │   ├── MainLayout.css
│   │   ├── MainLayout.jsx
│   │   └── utils.js
│   ├── favicon.svg
│   ├── index.css
│   ├── index.jsx
│   ├── logo.svg
│   └── redux
│       ├── actions
│       │   └── index.js
│       ├── constants.js
│       ├── reducers
│       │   ├── helpers.js
│       │   └── index.js
│       └── store.js
├── vite.config.js
└── yarn.lock
```

