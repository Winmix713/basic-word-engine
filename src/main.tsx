
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './providers/theme-provider'
import { Toaster } from './components/ui/toaster'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="slide-editor-theme">
    <App />
    <Toaster />
  </ThemeProvider>
);
