export function initialState(initialValue = 1) {
  return { counter: initialValue };
}

export function increment(state) {
  return { counter: state.counter + 1};
}

export function decrement(state) {
  return { counter: state.counter - 1};
}

export function reset(initialValue = 1) {
  return { counter: initialValue };
}
