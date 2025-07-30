import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
  // GitHub Pagesの場合はベースパスを設定、ローカル開発では '/'
  const basename = import.meta.env.DEV ? '/' : '/arai-daichi-portfolio'
  
  return (
    <HelmetProvider>
      <Router basename={basename}>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  )
}

export default App