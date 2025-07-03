import { useState, ChangeEvent } from "react";
import Button from '@mui/material/Button';
import { AddCircleOutlineOutlined } from "@mui/icons-material";
import { TextField } from "@mui/material";

export const AddItem = (props: {
  title: string;
  addItemHandler: (name: string) => void;
}) => {
  const { title, addItemHandler } = props;

  const [isInputActive, setInputState] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function inputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  function cencleHandler() {
    setInputState(false);
    setInputValue("");
  }

  function submitHandler() {
    addItemHandler(inputValue);
    cencleHandler();
  }

  return (
    <>
      <Button variant="text" startIcon={<AddCircleOutlineOutlined/>} onClick={() => setInputState(!isInputActive)}>
        {title}
      </Button>

      {isInputActive && (
        <form>
          <TextField autoFocus
            onChange={inputChangeHandler}
            variant="standard"
            value={inputValue}
            onKeyDown={(e) => e.key === 'Enter' && submitHandler()}
          />
          <Button variant="outlined" size="small" onClick={() => cencleHandler()}>Cancel</Button>
          <Button
            variant="outlined"
            size="small"
            type="submit"
            onClick={() => submitHandler()}
            disabled={!inputValue.length}
          >Save</Button>
        </form>
      )}
    </>
  );
};
