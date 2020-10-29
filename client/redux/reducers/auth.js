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
      let acc = state.user.accounts[1];
      acc.balance = action.payload;
      return {
        ...state,
        user: {
          ...state.user,
          accounts: [state.user.accounts[0], acc],
        },
      };
    case "UPDATE_BALANCES":
      let accUSD = state.user.accounts[0];
      let accARS = state.user.accounts[1];
      accUSD.balance = action.payload.usdBalance;
      accARS.balance = action.payload.arsBalance;
      return {
        ...state,
        user: {
          ...state.user,
          accounts: [accUSD, accARS]
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
