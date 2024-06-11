"use client";
import { Person } from "../../../../models";
import { addFavorite } from "../../../..//redux/states";
import { AppStore } from "../../../..//redux/store";
import { Checkbox } from "@mui/material";
import { GridColDef, GridRenderCellParams, DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person)
      ? filterPerson(person)
      : [...selectedPeople, person];
    dispach(addFavorite(filteredPeople));
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
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
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
