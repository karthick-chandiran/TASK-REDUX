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
  getTimeZoneOffsetInSeconds,
  getTimeDropdownValues
} from "../util";
import TimeDropDown from "./TimeDropDown";
import DateField from "./DateField";
import SaveButton from "./SaveButton";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  cancelButton: {
    background: "none",
    marginLeft: "auto"
  },
  dateField: {
    width: "50%",
    paddingRight: "10px"
  },
  timeField: {
    width: "50%",
    "& select": {
      appearance: "none"
    }
  },
  inputIcon: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-52%)",
    zIndex: 100
  },
  descField: {
    "& .form-control": {
      paddingRight: "30px"
    }
  },
  progressBar: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
    zIndex: 1000
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
  position: relative;
`;
const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function TaskFields(props) {
  const [formData, updateFormData] = useState(props.defaultFormData);
  const [disableSave, updateDisableSave] = useState(true);
  const [formSubmitInProgress, setInProgress] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const onValueChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    updateFormData(newFormData);
    updateDisableSave(!checkFormValid(newFormData));
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
    setInProgress(true);
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
    setInProgress(true);
  };
  const onDeleteClick = () => {
    dispatch(removeTask(formData.taskId));
    setInProgress(true);
  };

  return (
    <FieldsContaienr>
      {formSubmitInProgress && (
        <CircularProgress size={30} className={classes.progressBar} />
      )}
      <form onSubmit={onSubmit} autoComplete="off">
        <InputField>
          <label htmlFor="desc">Task Description</label>
          <InputGroup className={classes.descField + " mb-3"} size="sm">
            <FormControl
              id="desc"
              type="text"
              name="description"
              value={formData.description}
              onChange={onValueChange}
            />
            <InputIcon className={classes.inputIcon} />
          </InputGroup>
        </InputField>
        <VerticalContainer>
          <InputField className={classes.dateField}>
            <DateField
              value={formData.taskDate}
              onValueChange={onValueChange}
            />
          </InputField>
          <InputField className={classes.timeField}>
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
          <SaveButton disabled={disableSave} />
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
      taskDate: new Date(editData.task_date),
      taskTime: editData.task_time,
      taskId: editData.id
    };
    editMode = true;
  } else {
    defaultFormData = {
      assignedUser: props.data[0].user_id,
      description: "",
      taskDate: new Date(),
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
