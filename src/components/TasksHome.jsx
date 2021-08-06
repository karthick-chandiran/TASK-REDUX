import styled from "styled-components";
import TaskFields from "./TaskFields";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasksAction, fetchUsersAction } from "../redux/actionCreators";
import Tasks from "./Tasks";
import AlertBox from "./AlertBox";

const AddButton = styled.div`
  margin-left: auto;
  border-left: 1px solid var(--border-color);
  font-size: 20px;
  font-weight: 500;
  padding: 5px 10px;
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
  margin: auto 0px auto 5px;
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
  const [openTask, updateOpenTask] = useState(false);
  const dispatch = useDispatch();

  const onAddClick = () => {
    updateOpenTask(!openTask);
  };
  const closeOpenTask = () => {
    updateOpenTask(false);
  };
  useEffect(() => {
    dispatch(fetchUsersAction());
    dispatch(fetchAllTasksAction());
  }, [dispatch]);
  const { fetchStatus, data } = useSelector((state) => {
    return state.users;
  });
  return (
    <TaskHomeContainer>
      <AlertBox />
      <Header>
        <Title>
          TASKS <Count> {"0"} </Count>
        </Title>
        <AddButton onClick={onAddClick}> {openTask ? "x" : "+"} </AddButton>
      </Header>
      {openTask && (
        <TaskFields
          fetchStatus={fetchStatus}
          data={data}
          onCancelClick={closeOpenTask}
        />
      )}
      {!openTask && <Tasks />}
    </TaskHomeContainer>
  );
}
