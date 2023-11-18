import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { itemsApi } from './features/productsApi.ts'
import cartReducer, { getTotals } from './features/cartSlice.ts'
import productsReducer, { productsFetch } from './features/productsSlice.js'
import authReducer, { loadUser } from './features/authSlice.ts'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(itemsApi.middleware),
    devTools: false
})

store.dispatch(productsFetch())
store.dispatch(getTotals())
store.dispatch(loadUser(null))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
