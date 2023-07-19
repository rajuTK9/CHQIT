import { useEffect, useState } from "react";
import { Checklist } from "../types";
import Task from "./Task";
import useFetchData from "../hooks/useFetchData";

function ChecklistContainer() {
  const [checklist, setChecklist] = useState<Checklist[]>([]);

  const { data, status } = useFetchData("/api/checklist/get", "tasks");

  useEffect(() => {
    if (status === "success") {
      setChecklist(data.data);
    }
  }, [status, data]);

  return (
    <div className="list-container">
      {data?.success && checklist?.length > 0 ? (
        checklist?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            task={task.task}
            isDone={task.isDone}
          />
        ))
      ) : data?.success && checklist?.length === 0 ? (
        <p>You have no tasks in your list :|</p>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default ChecklistContainer;
