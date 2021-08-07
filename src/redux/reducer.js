import {
  ADD_NEW_TASK,
  EDIT_TASK,
  ERROR,
  FETCH_ALLTASK_ERROR,
  FETCH_ALLTASK_INPROGRESS,
  FETCH_ALLTASK_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_INPROGRESS,
  FETCH_USER_SUCCESS,
  OPEN_TASK_DRAWER,
  REMOVE_TASK,
  UPDATE_EDITED_TASK
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
  },
  openTaskDrawer: false,
  editData: {}
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
      return {
        ...state,
        tasks: { ...state.tasks, data: [action.payload, ...state.tasks.data] }
      };
    case UPDATE_EDITED_TASK:
      const nonEditedTask = state.tasks.data.filter(
        (task) => task.id !== action.payload.id
      );
      return {
        ...state,
        tasks: { ...state.tasks, data: [action.payload, ...nonEditedTask] }
      };
    case EDIT_TASK:
      return {
        ...state,
        editData: action.payload,
        openTaskDrawer: true
      };
    case REMOVE_TASK:
      const nonRemovedTasks = state.tasks.data.filter(
        (task) => task.id !== action.payload.id
      );
      return {
        ...state,
        tasks: { ...state.tasks, data: [...nonRemovedTasks] }
      };
    case ERROR:
      return {
        ...state,
        error: {
          show: action.payload.status,
          message: action.payload.message
        }
      };
    case OPEN_TASK_DRAWER:
      return {
        ...state,
        openTaskDrawer: action.payload,
        editData: {}
      };

    default:
      return state;
  }
};
