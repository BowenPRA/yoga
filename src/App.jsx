import { Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav.jsx'
import Home from './pages/Home.jsx'
import Learn from './pages/Learn.jsx'
import Poses from './pages/Poses.jsx'
import Pose from './pages/Pose.jsx'
import Body from './pages/Body.jsx'
import Practice from './pages/Practice.jsx'
import Coach from './pages/Coach.jsx'
import Review from './pages/Review.jsx'
import Mine from './pages/Mine.jsx'

export default function App() {
  return (
    <div className="app-screen flex flex-col">
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="mx-auto w-full max-w-xl px-4 pt-4 pb-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/poses" element={<Poses />} />
            <Route path="/learn/poses/:id" element={<Pose />} />
            <Route path="/learn/body" element={<Body />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/coach" element={<Coach />} />
            <Route path="/review" element={<Review />} />
            <Route path="/mine" element={<Mine />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
