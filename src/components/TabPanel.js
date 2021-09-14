import {Box} from "@material-ui/core";

export function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box component='div' p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}
