import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider} from 'react-redux'
import persistor, {store} from './store.ts'
import {PersistGate} from 'redux-persist/integration/react'
import {Toaster} from 'react-hot-toast'




const root: HTMLElement = document.getElementById("root")!; // ! is a non-null assertion operator which tells typescript to shut up from shouting out that root can also be null
const reactRoot = ReactDOM.createRoot(root)

reactRoot.render(
    <PersistGate persistor={persistor} loading={null}>
        <Provider store={store}>

            <React.StrictMode>
                <Toaster position="top-right" />
                <App />
            </React.StrictMode>

        </Provider>
    </PersistGate>
)

