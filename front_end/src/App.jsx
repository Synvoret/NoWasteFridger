import './assets/css/style.css'
import { Header } from './components/Header'
import { Recipe } from './components/Recipe'
import { Footer } from './components/Footer'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './AuthProvider'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
            <Routes>
              <Route path="/" element={<Recipe />} />
            </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
