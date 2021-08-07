import { companyID, accessToken } from "./constants";
const headers = {
  Authorization: "Bearer " + accessToken,
  Accept: "application/json",
  "Content-Type": "application/json"
};
export const createTask = async (payload) => {
  const response = await fetch(
    `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=${companyID}`,
    {
      method: "POST",
      // mode: "cors",
      headers,
      body: JSON.stringify(payload)
    }
  ).then((res) => res.json());
  if (response.status === "success") {
    return { status: "success", data: response.results };
  } else {
    return { status: "error" };
  }
};

export const updateTask = async (payload, taskId) => {
  const response = await fetch(
    `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${taskId}?company_id=${companyID}`,
    {
      method: "PUT",
      // mode: "cors",
      headers,
      body: JSON.stringify(payload)
    }
  ).then((res) => res.json());
  if (response.status === "success") {
    return { status: "success", data: response.results };
  } else {
    return { status: "error" };
  }
};

export const deleteTask = async (taskId) => {
  const response = await fetch(
    `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b/${taskId}?company_id=${companyID}`,
    {
      headers,
      method: "DELETE"
    }
  ).then((res) => res.json());
  if (response.status === "success") {
    return { status: "success" };
  } else {
    return { status: "error" };
  }
};
export const getAllTasks = async () => {
  const response = await fetch(
    `https://stage.api.sloovi.com/task/lead_c1de2c7b9ab94cb9abad131b7294cd8b?company_id=${companyID}`,
    {
      headers
    }
  ).then((res) => res.json());
  if (response.status === "success") {
    return { status: "success", data: response.results };
  } else {
    return { status: "error" };
  }
};

export const getAllUsers = async () => {
  const response = await fetch(
    `https://stage.api.sloovi.com/team?company_id=${companyID}&product=outreach`,
    {
      headers
    }
  ).then((res) => res.json());
  if (response.status === "success") {
    return { status: "success", data: response.results.data };
  } else {
    return { status: "error" };
  }
};
