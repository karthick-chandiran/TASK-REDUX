import {
  ADD_NEW_TASK,
  ERROR,
  FETCH_ALLTASK_ERROR,
  FETCH_ALLTASK_INPROGRESS,
  FETCH_ALLTASK_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_INPROGRESS,
  FETCH_USER_SUCCESS
} from "./action";

const initialData = {
  users: {
    data: [],
    fetchStatus: "not_started"
  },
  tasks: {
    data: [],
    fetchStatus: "not_started"
  },
  error: {
    show: false,
    message: ""
  }
};
export const rootReducer = (state = initialData, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: { data: action.payload, fetchStatus: "success" }
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        users: { fetchStatus: "error" }
      };
    case FETCH_USER_INPROGRESS:
      return {
        ...state,
        users: { fetchStatus: "inprogress" }
      };
    case FETCH_ALLTASK_SUCCESS:
      return {
        ...state,
        tasks: { data: action.payload, fetchStatus: "success" }
      };
    case FETCH_ALLTASK_ERROR:
      return {
        ...state,
        tasks: { fetchStatus: "error" }
      };
    case FETCH_ALLTASK_INPROGRESS:
      return {
        ...state,
        users: { fetchStatus: "inprogress" }
      };
    case ADD_NEW_TASK:
      console.log("payload", action.payload);
      return {
        ...state,
        tasks: { ...state.tasks, data: [action.payload, ...state.tasks.data] }
      };
    case ERROR:
      return {
        ...state,
        error: {
          show: action.payload.status,
          message: action.payload.message
        }
      };
    default:
      return state;
  }
};
