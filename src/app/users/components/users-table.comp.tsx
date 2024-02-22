import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridRowId,
} from "@mui/x-data-grid";
import { EditInputCell } from "./edit-input-cell.comp";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import { usersSelector } from "../store/users.selector";
import { getAllUsers, updateUser } from "../store/users.actions";
import CenteredLoader from "aviatickets-submodule/libs/components/centered-loader.comp";
import Message from "aviatickets-submodule/libs/components/message.comp";
import { ApiError } from "aviatickets-submodule/libs/types/api.error";
import { useSnackbar } from "notistack";

export const UsersTable = () => {
  const dispatch = useAppDispatch();
  const { users, isPending, errors, count } = useAppSelector(usersSelector);
  const { enqueueSnackbar } = useSnackbar();
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 25,
    page: 0,
  });

  useEffect(() => {
    const query = {
      pageNumber: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    };
    dispatch(getAllUsers({ query }));
  }, [dispatch, paginationModel]);

  const handleRowUpdate = async (updatedRow: any, originalRow: any) => {
    const params = { id: originalRow.id };
    const body = {
      firstName: updatedRow.firstName,
      lastName: updatedRow.lastName,
    };

    const response = await dispatch(updateUser({ params, body }));
    if (response.meta.requestStatus == "rejected") {
      const payload = response.payload as ApiError;
      enqueueSnackbar(payload.message, { variant: "error" });
    }
    if (response.meta.requestStatus == "fulfilled") {
      enqueueSnackbar("Succesfully changed user", { variant: "success" });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Id",
      type: "string",
      editable: false,
      align: "left",
      headerAlign: "left",
      width: 200,
    },
    {
      field: "firstName",
      headerName: "First Name",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 200,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length > 50;
        return { ...params.props, error: hasError };
      },
      renderEditCell: (params: GridRenderEditCellParams) => (
        <EditInputCell {...params} />
      ),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      type: "string",
      editable: true,
      align: "left",
      headerAlign: "left",
      width: 200,
      preProcessEditCellProps: (params) => {
        const hasError = params.props.value.length > 50;
        return { ...params.props, error: hasError };
      },
      renderEditCell: (params: GridRenderEditCellParams) => (
        <EditInputCell {...params} />
      ),
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      editable: false,
      align: "left",
      headerAlign: "left",
      width: 200,
    },
  ];

  if (isPending.users) {
    return <CenteredLoader />;
  }

  if (errors.users) {
    return <Message title="Erorr ocurred" text={errors.bookings!} />;
  }

  if (count === 0) {
    return <Message title="No users found" text="" />;
  }

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={users}
        columns={columns}
        editMode="row"
        processRowUpdate={handleRowUpdate}
        onProcessRowUpdateError={(error) => console.log("Error", error)}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
      />
    </Box>
  );
};
