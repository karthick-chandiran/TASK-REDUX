import styled from "styled-components";
import TaskFields from "./TaskFields";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllTasksAction,
  fetchUsersAction,
  openTaskDrawerAction
} from "../redux/actionCreators";
import Tasks from "./Tasks";
import AlertBox from "./AlertBox";

const AddButton = styled.div`
  margin-left: auto;
  border-left: 1px solid var(--border-color);
  font-size: 20px;
  font-weight: 500;
  padding: 7px 13px;
  &:hover {
    cursor: pointer;
  }
`;
const Header = styled.header`
  display: flex;
  background-color: rgb(249, 249, 250);
  width: 100%;
  border-bottom: 1px solid var(--border-color);
`;
const Title = styled.div`
  margin: auto 0px auto 10px;
`;
const Count = styled.span`
  margin-left: 5px;
`;

const TaskHomeContainer = styled.main`
  width: 400px;
  border: 1px solid var(--border-color);
  border-radius: 3px;
`;

export default function TasksHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(fetchAllTasksAction());
  }, [dispatch]);
  const { users, openTaskDrawer, tasks } = useSelector((state) => {
    return state;
  });
  const onAddClick = () => {
    dispatch(openTaskDrawerAction(!openTaskDrawer));
  };
  const { fetchStatus, data } = users;
  const taskCount = tasks.data?.length || 0;

  return (
    <TaskHomeContainer>
      <AlertBox />
      <Header>
        <Title>
          TASKS <Count> {taskCount} </Count>
        </Title>
        <AddButton onClick={onAddClick}>
          {openTaskDrawer ? "x" : "+"}{" "}
        </AddButton>
      </Header>
      {openTaskDrawer && <TaskFields fetchStatus={fetchStatus} data={data} />}
      {!openTaskDrawer && <Tasks />}
    </TaskHomeContainer>
  );
}
