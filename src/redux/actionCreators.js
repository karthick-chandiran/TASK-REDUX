import { createTask, getAllTasks, getAllUsers } from "../api/api";
import {
  ADD_NEW_TASK,
  FETCH_ALLTASK_ERROR,
  FETCH_ALLTASK_INPROGRESS,
  FETCH_ALLTASK_SUCCESS,
  FETCH_USER_ERROR,
  FETCH_USER_INPROGRESS,
  FETCH_USER_SUCCESS,
  ERROR
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
      } else {
        dispatch({
          type: ERROR,
          payload: { status: true, message: "Error on adding task" }
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
