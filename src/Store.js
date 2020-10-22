import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import RootReducer from './reducers/RootReducer'

const persistConfig = {
  key: 'root',
  blacklist: ['Pokemon', 'PokemonList'],
  storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)
export const persistedStore = persistStore(Store)
