import { useReducer } from 'react'

/**
 *
 * useReducerState is a custom hook that manages the state of an object using the useReducer hook.
 * @template T - The type of the state object.
 * @param {T} initialState - The initial state of the object.
 * @returns {[T, React.Dispatch<Object>]} - An array containing the current state and a dispatch function for updating the state.
 */
export const useReducerState = <T extends Object>(
  initialState: T
): [T, React.Dispatch<Object>] =>
  useReducer(
    (state: T, action: Object) => ({
      ...state,
      ...action,
    }),
    initialState
  )
