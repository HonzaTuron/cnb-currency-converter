# CNB Currency converter

This project takes exchange rates from Czech National Bank and provides a simple currency converter UI.

## Stack

Project uses Vite, React, TypeScript, ReactQuery and StyledComponents.

- `npm run dev` to start development server.
- `npm run build` to create production build.
- `npm run preview` to preview production build.

## Production URL

Project production URL is hosted on Railway: https://cnb-currency-converter-production.up.railway.app/

## Issues during development

- As API URL is behind cors proxy, file is downloaded and parsed at the start instead.
