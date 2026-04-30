import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApiProvider } from './context/ApiContext';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';

export default function App() {
  return (
    <ApiProvider>
      <Router>
        {/* Two-column full-height layout */}
        <div className="flex h-screen bg-white overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<ChatWindow />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApiProvider>
  );
}
