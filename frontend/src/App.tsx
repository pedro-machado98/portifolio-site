
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-color)]">
      <Header />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      
      <footer className="py-8 text-center text-xs mono text-[var(--text-secondary)] border-t brutal-border">
        &copy; {new Date().getFullYear()} Pedro Machado. Built with React & AWS.
      </footer>
    </div>
  );
}

export default App;
