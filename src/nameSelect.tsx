import { Autocomplete, TextField, useMediaQuery } from "@mui/material";

type NameSelectProps = {
  opList: string[];
  guessed: string[];
  onChange: (name: string) => void;
  onReturn: (name: string) => void;
  reset: boolean;
};

const NameSelect = (props: NameSelectProps) => {
  const mobile = useMediaQuery('(max-width:600px)');
  const onReturn = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      props.onReturn((e.target as HTMLTextAreaElement).value);
    }
  };
  return (
    <Autocomplete
      key={props.reset ? "reset" : "not reset"}
      disableClearable
      options={props.opList.filter(
        (element) => !props.guessed.includes(element)
      )}
      onChange={(_, v) => props.onChange(v)}
      onKeyDown={(e) => onReturn(e)}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ width: (mobile)?"100%":"20%" }}
          label="Choose an operator"
          InputProps={{
            ...params.InputProps,
            type: "search",
            style: { textAlign: "center" },
          }}
        />
      )}
    />
  );
};

export default NameSelect;
