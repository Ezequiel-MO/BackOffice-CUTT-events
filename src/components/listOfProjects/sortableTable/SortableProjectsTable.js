import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import {
  getDate,
  setSortOrder,
} from "../../../helper/HelperFunctions/HelperFunctions";
import useGetProjects from "../../../hooks/useGetProjects";
import styles from "../listOfProjectsStyles.module.css";

const SortableProjectsTable = ({ project: searchWord }) => {
  const { projects } = useGetProjects();
  const [sortedProjects, setSortedProjects] = useState([]);
  useEffect(() => {
    setSortedProjects(projects);
  }, [projects]);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th align='left'>Code</th>
          <th align='left'>User</th>
          <th align='left'>Client</th>
          <th align='left' className={styles.table__date}>
            Date{" "}
            <span>
              <Icon icon='akar-icons:chevron-down' />
            </span>
            <div>
              <p>ORDER</p>
              <p
                onClick={() => setSortedProjects(setSortOrder(projects, "asc"))}
              >
                Ascending
              </p>
              <p
                onClick={() =>
                  setSortedProjects(setSortOrder(projects, "desc"))
                }
              >
                Descending
              </p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedProjects
          ?.filter((project) => {
            return (
              project.code.toLowerCase().includes(searchWord.toLowerCase()) ||
              project.accountManager
                .toLowerCase()
                .includes(searchWord.toLowerCase()) ||
              project.clientCo.toLowerCase().includes(searchWord.toLowerCase())
            );
          })
          .slice(0, 6)
          .map(({ code, accountManager, createdAt, clientCo, _id }) => (
            <tr key={_id}>
              <td>{code}</td>
              <td>{accountManager}</td>
              <td>{clientCo}</td>
              <td>{getDate(createdAt)}</td>
              <td>
                <Icon icon='akar-icons:circle-plus' />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SortableProjectsTable;
