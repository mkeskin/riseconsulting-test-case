import engine from 'store/src/store-engine'
import localStorage from 'store/storages/localStorage'

const storages = [localStorage]
const plugins = []

const store = engine.createStore(storages, plugins)
export default store
