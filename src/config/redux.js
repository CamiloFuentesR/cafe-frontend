import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/auth.reducer";
import { uiReducer } from "../reducers/ui.reducer";
import { menuReducer } from "../reducers/menu.reducer";


const composeEnhancers = (process.env.NODE_ENV === 'development' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    root: authReducer,
    ui: uiReducer,
    menu: menuReducer,
});

const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

export default store;
