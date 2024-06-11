"use client";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../../..//redux/states";
import { AppStore } from "../../../..//redux/store";
import { Person } from "../../../../models";

export type FavoriteTableProps = {
  // types...
};

const FavoriteTable: React.FC<FavoriteTableProps> = ({}) => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  const dispach = useDispatch();

  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const findPerson = (person: Person) => {
    return !!selectedPeople.find((p) => p.id === person.id);
  };

  const filterPerson = (person: Person) => {
    return selectedPeople.filter((p) => p.id !== person.id);
  };

  const handleClick = (person: Person) => {
    const filteredPeople = filterPerson(person);
    dispach(removeFavorite(person)); // Aquí estamos pasando la persona correcta
    setSelectedPeople(filteredPeople);
  };
  

  const columns: GridColDef[] = [
    {
      field: "actions",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <IconButton onClick={()=>handleClick(params.row)} color="error" aria-label="favorites" component="label">
            <Delete/>
          </IconButton>
          }
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "levelOfHappiness",
      headerName: "Level of Hapinness",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    }
  ];
  return (
    <DataGrid
      sx={{ mt: 8 }}
      disableColumnSelector
      disableRowSelectionOnClick
      autoHeight
      rows={stateFavorites}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      getRowId={(row: any) => row.id}
    />
  );
};

export default FavoriteTable;
