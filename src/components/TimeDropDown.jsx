import { Form } from "react-bootstrap";

export default function TimeDropDown(props) {
  const { value, onValueChange, timeDropDownValues } = props;
  return (
    <>
      <label htmlFor="time">Time</label>
      <Form.Control
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
    </>
  );
}
