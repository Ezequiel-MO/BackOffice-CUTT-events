export const optionsInitialState = {
  hotel: [],
  lunch: [],
  dinner: [],
  "morning-event": [],
  "afternoon-event": [],
};

const eventOptionsReducer = (state = optionsInitialState, action) => {
  switch (action.type) {
    case "select-option":
    case "remove-value":
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case "clear":
      return {
        ...optionsInitialState,
      };
    default:
      return state;
  }
};

export default eventOptionsReducer;
