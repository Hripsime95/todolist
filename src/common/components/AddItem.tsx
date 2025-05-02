import { CirclePlus } from "lucide-react";
import { useState, ChangeEvent } from "react";
import { Button } from "./Button";

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
      <div onClick={() => setInputState(!isInputActive)}>
        <CirclePlus size={20} color="#e14747" />
        <span>{title}</span>
      </div>

      {isInputActive && (
        <form>
          <input
            onChange={inputChangeHandler}
            type="text"
            value={inputValue}
            autoFocus
          />
          <Button name="Cancel" clickHandler={() => cencleHandler()} />
          <Button
            name="Save"
            type="submit"
            clickHandler={() => submitHandler()}
            isDisabled={!inputValue.length}
          />
        </form>
      )}
    </>
  );
};
