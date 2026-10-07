import { Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Poses from './pages/Poses.jsx'
import Pose from './pages/Pose.jsx'
import Anatomy from './pages/Anatomy.jsx'
import Speech from './pages/Speech.jsx'
import Phrases from './pages/Phrases.jsx'
import Lesson from './pages/Lesson.jsx'

export default function App() {
  return (
    <div className="app-screen flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="mx-auto w-full max-w-xl px-4 pt-4 pb-28">
          <Routes>
            <Route path="/" element={<Navigate to="/anatomy" replace />} />
            <Route path="/poses" element={<Poses />} />
            <Route path="/poses/:id" element={<Pose />} />
            <Route path="/anatomy" element={<Anatomy />} />
            <Route path="/anatomy/:tab" element={<Anatomy />} />
            <Route path="/anatomy/:tab/:id" element={<Anatomy />} />
            <Route path="/learn/:id" element={<Lesson />} />
            <Route path="/speech" element={<Speech />} />
            <Route path="/phrases" element={<Phrases />} />
            <Route path="*" element={<Navigate to="/anatomy" replace />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
