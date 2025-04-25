import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

// Create the store with initial reducers
export const store = configureStore({
  reducer: {
    // Initial empty reducer - will be populated during migration
    app: (state = {}) => state,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Enable listener behavior for RTK-Query
setupListeners(store.dispatch)

// Export types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch