const initState = {
  toggle: false,
  change: false,
  sort: {
    console: { toggle: false, val: [] }
  },
  cart: [],
  added: []
};

const rootReducer = (state = initState, action) => {
  if (action.type === "CHANGE_SORT") {
    let orgArray = state.sort[action.prop].val;
    if (orgArray.includes(action.val)) {
      let ind = orgArray.indexOf(action.val);
      orgArray.splice(ind, 1);
    } else {
      orgArray.push(action.val);
    }
    let togg = orgArray.length > 0;

    return {
      ...state,
      sort: {
        ...state.sort,
        [action.prop]: {
          toggle: togg,
          val: orgArray
        }
      }
    };
  }

  if (action.type === "INIT_CART") {
    return {
      ...state,
      cart: action.value
    };
  }

  if (action.type === "MY_CART") {
    return {
      ...state,
      userCart: action.value
    };
  }

  if (action.type === "CHECK_CHANGE") {
    return { ...state, change: !state.change };
  }
  return state;
};

export default rootReducer;
