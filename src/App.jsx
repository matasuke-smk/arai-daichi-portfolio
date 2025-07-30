import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import Home from './pages/Home'

function App() {
  return (
    <HelmetProvider>
      <Layout>
        <Home />
      </Layout>
    </HelmetProvider>
  )
}

export default App