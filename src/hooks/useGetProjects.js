import { useAxiosFetch } from "./useAxiosFetch";
import { useEffect, useState } from "react";
import { baseURL } from "../helper/axios";

const useGetProjects = () => {
  //set state for the projects retrieved from the database
  const [projects, setProjects] = useState([]);

  const {
    data: { projects: fetchedProjects },
    isLoading,
    fetchError,
  } = useAxiosFetch(`${baseURL}/projects`);

  //update the state with the projects
  useEffect(() => {
    setProjects(fetchedProjects);
  }, [fetchedProjects]);

  return { projects, isLoading, fetchError };
};

export default useGetProjects;
