"use client";
import Favorite from '@mui/icons-material/Favorite';
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { CustomDialog } from "../CustomDialog";
import { FavoriteTable } from "./components/FavoriteTable";
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
import { AppStore } from '@/redux/store';
import { useSelector } from 'react-redux';

export type NavbarProps = {
  // types...
};

const Navbar: React.FC<NavbarProps> = () =>{

  const stateFavorites = useSelector((store: AppStore) => store.people);

  const handleClick = () =>{
    dialogOpenSubject$.setSubject = true;
  }


  return(
    <>
      <CustomDialog>
        <FavoriteTable/>
      </CustomDialog>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Test
          </Typography>
          <IconButton onClick={handleClick} color="error" aria-label="favorites" component="label">
            <Favorite/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </>
  )
}
  
  
  

export default Navbar;
