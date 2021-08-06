import styled from "styled-components";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { addNewTaskData } from "../redux/actionCreators";

const useStyles = makeStyles({
  saveButton: {
    backgroundColor: "rgb(71, 187, 127)",
    color: "white",
    borderRadius: "3px"
  },
  cancelButton: {
    background: "none"
  },
  buttonsContainer: {
    direction: "rtl"
  }
});

const Label = styled.label`
  display: block;
`;
const VerticalContainer = styled.div`
  display: flex;
`;
const InputField = styled.div`
  margin-bottom: 10px;
`;
const FieldsContaienr = styled.div`
  background-color: rgb(237, 247, 252);
  padding: 10px 10px 15px;
`;
const getTimeZoneOffsetInSeconds = () => {
  return new Date().getTimezoneOffset() * 60;
};
const getTaskTimeInSeconds = (time) => {
  const [hour, min] = time.split(":");
  return (parseInt(hour) * 60 + min) * 60;
};

const getFormattedDate = (date) => {
  const taskDate = new Date(date);
  let month = taskDate.getMonth();
  month = month < 10 ? "0" + month : month;
  let day = taskDate.getDate();
  day = day < 10 ? "0" + day : day;
  return `${taskDate.getFullYear()}-${month}-${day}`;
};

function TaskFields(props) {
  const [formData, updateFormData] = useState({
    assignedUser: props.users[0].user_id
  });
  const [isFormValid, updateIsFormValid] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onValueChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    updateFormData(newFormData);
    updateIsFormValid(checkFormValid(newFormData));
  };
  const checkFormValid = (newFormData) => {
    return (
      newFormData.description &&
      newFormData.taskDate &&
      newFormData.taskTime &&
      newFormData.assignedUser
    );
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = getFormattedDate(formData.taskDate);
    const taskTime = getTaskTimeInSeconds(formData.taskTime);
    const timeZone = getTimeZoneOffsetInSeconds();

    const payload = {
      assigned_user: formData.assignedUser,
      task_date: formattedDate,
      task_time: taskTime,
      is_completed: 0,
      time_zone: timeZone,
      task_msg: formData.description
    };
    dispatch(addNewTaskData(payload));
    props.onCancelClick();
  };

  return (
    <FieldsContaienr>
      <form onSubmit={onSubmit}>
        <InputField>
          <Label> Task Description </Label>
          <input type="text" name="description" onChange={onValueChange} />
        </InputField>
        <VerticalContainer>
          <InputField>
            <Label> Date </Label>
            <input type="date" name="taskDate" onChange={onValueChange} />
          </InputField>
          <InputField>
            <Label> Time </Label>
            <input type="time" name="taskTime" onChange={onValueChange} />
          </InputField>
        </VerticalContainer>
        <InputField>
          <Label> Assign User </Label>
          <select name="assignedUser" onChange={onValueChange}>
            {props.users.map((user) => (
              <option key={user.id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </select>
        </InputField>
        <div className={classes.buttonsContainer}>
          <Button
            disabled={!isFormValid}
            type="submit"
            variant="contained"
            className={classes.saveButton}
          >
            Save
          </Button>
          <Button
            className={classes.cancelButton}
            onClick={props.onCancelClick}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FieldsContaienr>
  );
}

export default function TaskFieldsContainer(props) {
  const { fetchStatus, data } = props;
  if (fetchStatus === "not_started" || fetchStatus === "inprogress") {
    return <div>Data Loading...</div>;
  } else if (fetchStatus === "error") {
    return <div>Problem in loading data .Please try again later...</div>;
  } else if (data.length === []) {
    return <div>No users to assign the task ... </div>;
  }
  return <TaskFields {...props} users={data} />;
}
