import {StandardTextFieldProps} from "@mui/material/TextField/TextField";
import {TextField} from "@mui/material";

interface FilteredTextFieldProps extends StandardTextFieldProps {
    filterRegex: RegExp
}

export default function FilteredTextField(props: FilteredTextFieldProps) {
    const {filterRegex, ...otherProps} = props;
    const mutatedProps = {
        ...otherProps,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!props.onChange || !e.target.value.match(filterRegex)) {
                return
            }
            props.onChange(e);
        },
    }
    return <TextField {...mutatedProps}/>;
}