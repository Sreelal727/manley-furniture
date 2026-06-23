# Manley Furniture ERP (UI only)

A UI-only ERP front end for Manley Furniture, built with **React + Vite +
TypeScript + Tailwind CSS**. There is no backend — all data shown will be
mocked in the front end.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/      Shared UI: Layout, Sidebar, Header, PageContainer
  pages/           One component per ERP module/tab
  navigation.ts    Single source of truth for sidebar items + routes
  App.tsx          Route definitions
  main.tsx         App entry point
```

## Adding a module / tab

1. Create a page component in `src/pages/` (use `PageContainer` for the header).
2. Add an entry to `navItems` in `src/navigation.ts`.
3. Register the route in `src/App.tsx`.

## Status

Skeleton is in place (app shell + Dashboard placeholder). The individual
module tabs will be built to match the reference screenshots once provided.
