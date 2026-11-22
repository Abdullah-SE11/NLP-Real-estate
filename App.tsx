import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Listings from '@/pages/Listings';
import PropertyDetails from '@/pages/PropertyDetails';
import Contact from '@/pages/Contact';
import { Toaster } from '@/components/ui/sonner';

const Home = lazy(() => import('@/pages/Home'));
const Agents = lazy(() => import('@/pages/Agents'));
const PropertyTools = lazy(() => import('@/pages/PropertyTools'));
const SavedListings = lazy(() => import('@/pages/SavedListings'));
const AddProperty = lazy(() => import('@/pages/AddProperty'));

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-background transition-colors duration-300">
          <Navbar />
          <main>
            <Suspense fallback={<p role="status" className="mx-auto max-w-7xl px-4 py-8">Loading page…</p>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings" element={<Listings key="buy" />} />
                <Route path="/rent" element={<Listings key="rent" purpose="rent" />} />
                <Route path="/projects" element={<Listings key="projects" purpose="projects" />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/tools" element={<PropertyTools />} />
                <Route path="/saved" element={<SavedListings />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/property/:id" element={<PropertyDetails />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
