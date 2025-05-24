import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/home';
import { EditorPage } from './pages/editor';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@heroui/react";
import { Icon } from '@iconify/react';
import { CardManagerProvider } from './context/card-manager-context'; // Fixed import path from './pages/editor/card-manager-context'
import { UndoRedoProvider } from './pages/editor/undo-redo-context'; // Updated import path

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#0d0d21]">
        <Navbar maxWidth="xl" className="bg-[#1e1e2e]/80 backdrop-blur-md border-b border-white/10">
          <NavbarBrand>
            <Icon icon="lucide:layers" className="text-white text-2xl mr-2" />
            <p className="font-bold text-white">Extension Cards</p>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link href="/" color="foreground" className="text-white/80 hover:text-white">
                Home
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href="/editor" color="foreground" className="text-white/80 hover:text-white">
                Card Editor
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        
        <CardManagerProvider>
          <UndoRedoProvider>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/editor" component={EditorPage} />
            </Switch>
          </UndoRedoProvider>
        </CardManagerProvider>
      </div>
    </Router>
  );
}

export default App;