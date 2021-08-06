import { useSelector } from "react-redux";
import styled from "styled-components";
import EditIcon from "../icons/EditIcon";
import UserIcon from "../icons/UserIcon";
const IconContainer = styled.div`
  width: 40px;
  height: 40px;
`;
const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
`;
const Actions = styled.div`
  margin-left: auto;
`;
const TaskContainer = styled.div`
  display: flex;
`;
//DD-MM-YYYY
const formatDate = (date) => {
  const newDate = new Date(date);
  return `${newDate.getDate()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
};
const Task = ({ data }) => {
  return (
    <TaskContainer>
      <IconContainer>
        <UserIcon />
      </IconContainer>
      <TaskDetails>
        <div>{data.task_msg}</div>
        <div>{formatDate(data.task_date)}</div>
      </TaskDetails>
      <Actions>
        <EditIcon />
      </Actions>
    </TaskContainer>
  );
};
export default function Tasks() {
  const { fetchStatus, data = [] } = useSelector((state) => {
    console.log(state.tasks);
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
