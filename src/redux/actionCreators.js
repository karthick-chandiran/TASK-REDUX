import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllUsers,
  updateTask
} from "../api/api";
import {
  ADD_NEW_TASK,
  FETCH_ALLTASK_ERROR,
  FETCH_ALLTASK_INPROGRESS,
  FETCH_ALLTASK_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_INPROGRESS,
  FETCH_USER_SUCCESS,
  ERROR,
  EDIT_TASK,
  OPEN_TASK_DRAWER,
  UPDATE_EDITED_TASK,
  REMOVE_TASK
} from "./action";

export const fetchUsersAction = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_USER_INPROGRESS });
    getAllUsers().then((response) => {
      if (response.status === "success") {
        dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: FETCH_USER_ERROR, payload: response.data });
      }
    });
  };
};

export const fetchAllTasksAction = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_ALLTASK_INPROGRESS });
    getAllTasks().then((response) => {
      if (response.status === "success") {
        dispatch({ type: FETCH_ALLTASK_SUCCESS, payload: response.data });
      } else {
        dispatch({ type: FETCH_ALLTASK_ERROR, payload: response.data });
      }
    });
  };
};

export const addNewTaskData = (payload) => {
  return (dispatch) => {
    return createTask(payload).then((response) => {
      if (response.status === "success") {
        dispatch({
          type: ADD_NEW_TASK,
          payload: response.data
        });
        dispatch(openTaskDrawerAction(false));
      } else {
        dispatch({
          type: ERROR,
          payload: { status: true, message: "Error on adding task" }
        });
      }
    });
  };
};
export const updateTaskData = (payload, taskId) => {
  return (dispatch) => {
    return updateTask(payload, taskId).then((response) => {
      if (response.status === "success") {
        dispatch({
          type: UPDATE_EDITED_TASK,
          payload: response.data
        });
        dispatch(openTaskDrawerAction(false));
      } else {
        dispatch({
          type: ERROR,
          payload: { status: true, message: "Error on updating task data" }
        });
      }
    });
  };
};

export const removeTask = (taskId) => {
  return (dispatch) => {
    return deleteTask(taskId).then((response) => {
      if (response.status === "success") {
        dispatch({
          type: REMOVE_TASK,
          payload: {
            id: taskId
          }
        });
        dispatch(openTaskDrawerAction(false));
      } else {
        dispatch({
          type: ERROR,
          payload: { status: true, message: "Error on removing task" }
        });
      }
    });
  };
};

export const clearError = () => {
  return {
    type: ERROR,
    payload: { status: false, message: "" }
  };
};

export const openTaskDrawerAction = (payload) => {
  return {
    type: OPEN_TASK_DRAWER,
    payload
  };
};

export const editTaskAction = (payload) => {
  return {
    type: EDIT_TASK,
    payload
  };
};
