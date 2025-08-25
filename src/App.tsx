import { Provider } from 'react-redux'
import { store } from './store'
import './styles/main.scss'
import Navbar from './components/Layout/Navbar'
import Main from './components/Layout/Main'
import AppRoutes from './routes/AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { BreadcrumbProvider } from './context/BreadcrumbContext'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <BreadcrumbProvider>
          <div className="app">
            <Navbar />
            <Main>
              <AppRoutes />
            </Main>
          </div>
        </BreadcrumbProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
