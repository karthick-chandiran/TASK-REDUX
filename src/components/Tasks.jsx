import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import EditIcon from "../icons/EditIcon";
import UserIcon from "../icons/UserIcon";
import { editTaskAction } from "../redux/actionCreators";
const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;
const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  line-height: 19px;
`;
const Actions = styled.div`
  margin-left: auto;
  align-self: center;
`;
const TaskContainer = styled.div`
  display: flex;
  padding: 10px;
`;
const ActionWrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const TaskDate = styled.div`
  color: #db000e;
`;
const TaskTitle = styled.div`
  font-weight: 600;
`;
//DD-MM-YYYY
const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${
    newDate.getMonth() + 1
  }/${newDate.getFullYear()}`;
};
const Task = ({ data }) => {
  const dispatch = useDispatch();
  const onEditClick = () => {
    dispatch(editTaskAction(data));
  };
  return (
    <TaskContainer>
      <IconContainer>
        <UserIcon />
      </IconContainer>
      <TaskDetails>
        <TaskTitle>{data.task_msg}</TaskTitle>
        <TaskDate>{formatDate(data.task_date)}</TaskDate>
      </TaskDetails>
      <Actions>
        <ActionWrapper>
          <EditIcon onClick={onEditClick} />
        </ActionWrapper>
      </Actions>
    </TaskContainer>
  );
};
export default function Tasks() {
  const { fetchStatus, data = [] } = useSelector((state) => {
    return state.tasks;
  });
  if (fetchStatus === "not_started" || fetchStatus === "inprogress") {
    return <div>Data Loading...</div>;
  } else if (fetchStatus === "error") {
    return <div>Problem in loading data .Please try again later...</div>;
  } else if (data.length === []) {
    return <div>No Tasks </div>;
  }
  return (
    <div>
      {data.map((task) => (
        <Task key={task.id} data={task} />
      ))}
    </div>
  );
}
