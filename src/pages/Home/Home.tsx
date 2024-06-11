"use client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { People } from "../../data/people";
import { addPeople } from "../../redux/states";
import { PeopleTable } from "./components/PeopleTable";

export type HomeProps = {
  // types...
};

const Home: React.FC<HomeProps> = ({}) => {

	const dispach = useDispatch();

  useEffect(() => {
    dispach(addPeople(People));
  }, []);

  return (
    <div>
      <PeopleTable></PeopleTable>
    </div>
  );
};

export default Home;
