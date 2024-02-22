import { Box, Tooltip } from "@mui/material";
import { GridEditInputCell, GridRenderEditCellParams } from "@mui/x-data-grid"

export const EditInputCell = (props: GridRenderEditCellParams) => {
    const { error } = props;

    return (
        <Tooltip open={!!error} title={<div>Must be less than 50 characters</div>}>
            <Box>
                <GridEditInputCell {...props} />
            </Box>
        </Tooltip>
    )
}