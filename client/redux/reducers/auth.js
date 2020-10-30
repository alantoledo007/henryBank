const initialState = {
  token: null,
  user: {
    id: null,
    email: null,
    name: null,
    surname: null,
    avatar: null,
    emailVerifiedAt: null,
    dataCompletedAt: null,
    recharge_code: null,
    balance: null,
    accounts: null,
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "UPDATE_BALANCE":
      let acc = state.user.accounts.find(acc => acc.currency === 'ars');
      acc.balance = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          accounts: [state.user.accounts.find(acc => acc.currency === 'usd'), acc],
        },
      };
    case "UPDATE_BALANCES":
      let accUSD = Object.assign({}, state.user.accounts.find(acc => acc.currency === 'usd'));
      let accARS = Object.assign({}, state.user.accounts.find(acc => acc.currency === 'ars'));
      accUSD.balance = action.payload.usdBalance;
      accARS.balance = action.payload.arsBalance;
      return {
        ...state,
        user: {
          ...state.user,
          accounts: [accARS, accUSD]
        }
      }
    case "LOGIN":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "EMAIL_VERIFIED":
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
      };
    case "REGISTER_CONFIRMATION":
      // console.log(action.payload);
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return initialState;
    case "UPDATE_USER_INFO":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}
