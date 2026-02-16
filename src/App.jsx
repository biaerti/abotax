import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import Layout from './Layout'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Pages
import Home from './pages/Home'
import About from './pages/About'
import FAQ from './pages/FAQ'
import ProjektUstawy from './pages/ProjektUstawy'
import Impact from './pages/Impact'
import WplywNaRozwoj from './pages/WplywNaRozwoj'
import PodpiszPetycje from './pages/PodpiszPetycje'
import GeneratorIG from './pages/GeneratorIG'
import Regulamin from './pages/Regulamin'
import PolitykaPrywatnosci from './pages/PolitykaPrywatnosci'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
})

// Wrapper component to pass currentPageName to Layout
function PageWrapper({ children, pageName }) {
  return (
    <Layout currentPageName={pageName}>
      {children}
    </Layout>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<PageWrapper pageName="Home"><Home /></PageWrapper>} />
          <Route path="/Home" element={<PageWrapper pageName="Home"><Home /></PageWrapper>} />
          <Route path="/About" element={<PageWrapper pageName="About"><About /></PageWrapper>} />
          <Route path="/FAQ" element={<PageWrapper pageName="FAQ"><FAQ /></PageWrapper>} />
          <Route path="/ProjektUstawy" element={<PageWrapper pageName="ProjektUstawy"><ProjektUstawy /></PageWrapper>} />
          <Route path="/Impact" element={<PageWrapper pageName="Impact"><Impact /></PageWrapper>} />
          <Route path="/WplywNaRozwoj" element={<PageWrapper pageName="WplywNaRozwoj"><WplywNaRozwoj /></PageWrapper>} />
          <Route path="/PodpiszPetycje" element={<PageWrapper pageName="PodpiszPetycje"><PodpiszPetycje /></PageWrapper>} />
          <Route path="/GeneratorIG" element={<PageWrapper pageName="GeneratorIG"><GeneratorIG /></PageWrapper>} />
          <Route path="/Regulamin" element={<PageWrapper pageName="Regulamin"><Regulamin /></PageWrapper>} />
          <Route path="/PolitykaPrywatnosci" element={<PageWrapper pageName="PolitykaPrywatnosci"><PolitykaPrywatnosci /></PageWrapper>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
