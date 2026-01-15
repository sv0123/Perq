import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import GlobalRedeemButton from './components/layout/GlobalRedeemButton';
import Dashboard from './pages/Dashboard';
import Cards from './pages/Cards';
import Marketplace from './pages/Marketplace';
import Crypto from './pages/Crypto';
import Analytics from './pages/Analytics';
import Features from './pages/Features';

/**
 * Main App component with routing and layout
 */
function App() {
    return (
        <Router>
            <div className="flex min-h-screen bg-ios-gray-50">
                {/* Sidebar Navigation */}
                <Sidebar />

                {/* Main Content Area with Footer */}
                <div className="flex-1 ml-64 min-h-screen flex flex-col">
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/cards" element={<Cards />} />
                            <Route path="/marketplace" element={<Marketplace />} />
                            <Route path="/crypto" element={<Crypto />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/plus" element={<Features />} />
                        </Routes>
                    </main>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>

            {/* Global Redeem Button - Available on all pages */}
            <GlobalRedeemButton />
        </Router>
    );
}

export default App;
