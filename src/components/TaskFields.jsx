import styled from "styled-components";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTaskData,
  openTaskDrawerAction,
  removeTask,
  updateTaskData
} from "../redux/actionCreators";
import DeleteIcon from "../icons/DeleteIcon";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import InputIcon from "../icons/InputIcon";
import {
  getFormattedDate,
  getTaskTimeInSeconds,
  getTimeZoneOffsetInSeconds,
  secondsToTime,
  getTimeDropdownValues
} from "../util";
import TimeDropDown from "./TimeDropDown";

const useStyles = makeStyles({
  saveButton: {
    backgroundColor: "rgb(71, 187, 127)",
    color: "white",
    borderRadius: "3px"
  },
  cancelButton: {
    background: "none",
    marginLeft: "auto"
  }
});

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
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function TaskFields(props) {
  const [formData, updateFormData] = useState(props.defaultFormData);

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
  const closeDrawer = () => {
    dispatch(openTaskDrawerAction(false));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const formattedDate = getFormattedDate(formData.taskDate);
    // const taskTime = getTaskTimeInSeconds(formData.taskTime);
    const taskTime = parseInt(formData.taskTime);
    const timeZone = getTimeZoneOffsetInSeconds();

    const payload = {
      assigned_user: formData.assignedUser,
      task_date: formattedDate,
      task_time: taskTime,
      is_completed: 0,
      time_zone: timeZone,
      task_msg: formData.description
    };
    if (props.editMode) {
      dispatch(updateTaskData(payload, formData.taskId));
    } else {
      dispatch(addNewTaskData(payload));
    }
    closeDrawer();
  };
  const onDeleteClick = () => {
    dispatch(removeTask(formData.taskId));
    closeDrawer();
  };

  return (
    <FieldsContaienr>
      <form onSubmit={onSubmit} autoComplete="off">
        <InputField>
          <label htmlFor="desc">Task Description</label>
          <InputGroup size="sm" className="mb-3">
            <FormControl
              id="desc"
              type="text"
              name="description"
              value={formData.description}
              onChange={onValueChange}
            />
            <InputGroup.Append>
              <InputGroup.Text>
                <InputIcon />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        </InputField>
        <VerticalContainer>
          <InputField>
            <label htmlFor="date">Date</label>
            <InputGroup size="sm" className="mb-3">
              <FormControl
                id="date"
                type="date"
                value={formData.taskDate}
                name="taskDate"
                onChange={onValueChange}
              />
            </InputGroup>
          </InputField>
          <InputField>
            <TimeDropDown
              value={formData.taskTime}
              onValueChange={onValueChange}
              timeDropDownValues={props.timeDropDownValues}
            />
          </InputField>
        </VerticalContainer>
        <InputField>
          <label htmlFor="user">Assign User</label>
          <Form.Control
            id="user"
            name="assignedUser"
            value={formData.assignedUser}
            onChange={onValueChange}
            as="select"
            custom
            size="sm"
          >
            {props.users.map((user) => (
              <option key={user.id} value={user.user_id}>
                {user.name}
              </option>
            ))}
          </Form.Control>
        </InputField>
        <ButtonsContainer>
          {props.editMode && <DeleteIcon onClick={onDeleteClick} />}
          <Button className={classes.cancelButton} onClick={closeDrawer}>
            Cancel
          </Button>
          <Button
            disabled={!isFormValid}
            type="submit"
            variant="contained"
            className={classes.saveButton}
          >
            Save
          </Button>
        </ButtonsContainer>
      </form>
    </FieldsContaienr>
  );
}

export default function TaskFieldsContainer(props) {
  const { fetchStatus, data } = props;
  const { editData } = useSelector((state) => {
    return state;
  });
  let defaultFormData = {};
  let editMode = false;

  if (fetchStatus === "not_started" || fetchStatus === "inprogress") {
    return <div>Data Loading...</div>;
  } else if (fetchStatus === "error") {
    return <div>Problem in loading data .Please try again later...</div>;
  } else if (data.length === []) {
    return <div>No users to assign the task ... </div>;
  }
  if (Object.keys(editData).length > 0) {
    defaultFormData = {
      assignedUser: editData.assigned_user,
      description: editData.task_msg,
      taskDate: editData.task_date,
      taskTime: editData.task_time,
      taskId: editData.id
    };
    editMode = true;
  } else {
    defaultFormData = {
      assignedUser: props.data[0].user_id,
      description: "",
      taskDate: "",
      taskTime: ""
    };
  }
  const timeDropDownValues = getTimeDropdownValues();
  return (
    <TaskFields
      {...props}
      timeDropDownValues={timeDropDownValues}
      editMode={editMode}
      users={data}
      defaultFormData={defaultFormData}
    />
  );
}
