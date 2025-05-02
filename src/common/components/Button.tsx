type TButton = {
  name: string;
  type?: "submit" | "reset" | "button";
  clickHandler: () => void;
  isDisabled?: boolean;
};

export const Button = (props: TButton) => {
  const { name, type = "button", isDisabled = false, clickHandler } = props;
  return (
    <button disabled={isDisabled} type={type} onClick={() => clickHandler()}>
      {name}
    </button>
  );
};
