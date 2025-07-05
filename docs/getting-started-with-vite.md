# Getting Started with Vite

This document provides step-by-step instructions for setting up and running a project using [Vite](https://vitejs.dev/).

## Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (included with Node.js)

## 1. Install Vite
Run the following command in your terminal:

```
npm install vite --save-dev
```

## 2. Project Structure
A typical Vite project contains the following structure:

```
project-root/
├─ src/
│  └─ main.ts
├─ index.html
├─ package.json
├─ vite.config.ts
```

## 3. Add Scripts
Add the following scripts to the `package.json` file:

```
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview"
}
```

## 4. Start the Development Server
Run the following command:

```
npm run dev
```

Open a browser and navigate to the address shown in the terminal (typically http://localhost:5173).

## 5. Build and Preview
To create a production build:

```
npm run build
```

To preview the production build locally:

```
npm run preview
```

For additional information, refer to the [Vite documentation](https://vitejs.dev/guide/).
