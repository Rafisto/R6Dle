import { Autocomplete, TextField } from "@mui/material";

type NameSelectProps = {
  opList: string[];
  guessed: string[];
  onChange: (name: string) => void;
  onReturn: (name: string) => void;
  reset: boolean;
};

const NameSelect = (props: NameSelectProps) => {
  const onReturn = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      props.onReturn((e.target as HTMLTextAreaElement).value);
    }
  };
  return (
    <Autocomplete
      key={props.reset ? "reset" : "not reset"}
      freeSolo
      disableClearable
      options={props.opList.filter(
        (element) => !props.guessed.includes(element)
      )}
      onChange={(_, v) => props.onChange(v)}
      onKeyDown={(e) => onReturn(e)}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{ width: "20%" }}
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
