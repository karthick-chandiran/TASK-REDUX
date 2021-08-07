import { InputGroup } from "react-bootstrap";
import React, { useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core";
import styled from "styled-components";
import CalendarIcon from "../icons/CalendarIcon";

const useStyles = makeStyles({
  calendarIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-52%)",
    zIndex: 1
  }
});
const DatePickerWrapper = styled.div`
  & .MuiInputAdornment-root.MuiInputAdornment-positionEnd {
    display: none;
  }
  & #datePicker {
    border: 1px solid #ced4da;
    height: 22px;
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
    background: white;
    padding-left: 30px;
  }
  & .MuiInput-underline:after,
  .MuiInput-underline:before {
    display: none;
  }
  position: relative;
`;
export default function DateField(props) {
  const { value, onValueChange } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState(value || null);
  const classes = useStyles();
  const onDateChange = (value) => {
    handleDateChange(value);
    onValueChange({ target: { name: "taskDate", value } });
    setIsOpen(false);
  };
  return (
    <>
      <label htmlFor="date">Date</label>
      <InputGroup size="sm" className="mb-3">
        <DatePickerWrapper>
          <CalendarIcon className={classes.calendarIcon} />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="none"
            id="datePicker"
            value={selectedDate}
            open={isOpen}
            onChange={onDateChange}
            KeyboardButtonProps={{
              onFocus: (e) => {
                setIsOpen(true);
              }
            }}
            PopoverProps={{
              disableRestoreFocus: true,
              onClose: () => {
                setIsOpen(false);
              }
            }}
            InputProps={{
              onFocus: () => {
                setIsOpen(true);
              }
            }}
          />
        </DatePickerWrapper>
      </InputGroup>
    </>
  );
}
