export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SECOND_SAGA = 'SECOND_SAGA';

// Actions
type UserAction =
  | ReturnType<typeof setJwtToken>
  | ReturnType<typeof setUserProfile>;

export const setJwtToken = (jwtToken: string) => ({
  type: SET_JWT_TOKEN,
  payload: jwtToken,
});

export const setUserProfile = (userProfile: { [x: string]: any }) => ({
  type: SET_USER_PROFILE,
  payload: userProfile,
});

// Reducer
export interface UserState {
  jwtToken: string | null;
  userProfile: null;
  message: string;
}

const initialState = {
  jwtToken: null,
  userProfile: null,
  message: '',
};

const user = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case SET_JWT_TOKEN: {
      return {
        ...state,
        jwtToken: action.payload,
      };
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }

    case SECOND_SAGA: {
      return {
        ...state,
        message: action.payload,
      };
    }
    default:
      return state;
  }
};

export default user;
