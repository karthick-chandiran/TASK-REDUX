import { makeStyles } from "@material-ui/core";
import { Form } from "react-bootstrap";
import ClockIcon from "../icons/ClockIcon";
const useStyles = makeStyles({
  timeIcon: {
    position: "absolute",
    left: "10px",
    top: "50%",
    transform: "translateY(-52%)",
    zIndex: 1,
    paddingBottom: "2px"
  },
  timeInput: {
    paddingLeft: "30px"
  },
  timeWrapper: {
    position: "relative"
  }
});
export default function TimeDropDown(props) {
  const classes = useStyles();
  const { value, onValueChange, timeDropDownValues } = props;
  return (
    <>
      <label htmlFor="time">Time</label>
      <div className={classes.timeWrapper}>
        <ClockIcon className={classes.timeIcon} />
        <Form.Control
          className={classes.timeInput}
          id="time"
          name="taskTime"
          as="select"
          size="sm"
          value={value}
          onChange={onValueChange}
        >
          <option value="" hidden>
            Time
          </option>
          {timeDropDownValues.map((time) => (
            <option key={time.value} value={time.value}>
              {time.name}
            </option>
          ))}
        </Form.Control>
      </div>
    </>
  );
}
