import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = () =>
  combineReducers({
    gg: reducers,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer());

const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(thunk)));
const persistor = persistStore(store);
export default { store, persistor };
