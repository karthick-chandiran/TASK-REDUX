import Alert from "@material-ui/lab/Alert";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../redux/actionCreators";

export default function AlertBox() {
  const dispatch = useDispatch();
  const { show, message } = useSelector(({ error }) => {
    return error;
  });
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [show, dispatch]);
  if (!show) {
    return null;
  }
  return (
    <Alert variant="filled" severity="error">
      {message}
    </Alert>
  );
}
