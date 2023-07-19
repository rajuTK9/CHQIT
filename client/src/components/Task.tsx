import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Checklist } from "../types";
import { useAppSelector } from "../app/hooks";
import { useState } from "react";

function Task({ id, task, isDone }: Checklist) {
  const auth = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [edittedTask, setEdittedTask] = useState<string>(task);

  const markAsDone = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/checklist/markDone/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ isDone: !isDone }),
      }
    );
    return res.json();
  };

  const editTask = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/checklist/update/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ task: edittedTask }),
      }
    );
    return res.json();
  };

  const deleteTask = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/checklist/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
      }
    );
    return res.json();
  };

  const markDoneMutate = useMutation({
    mutationFn: markAsDone,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });

  const editMutate = useMutation({
    mutationFn: editTask,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });

  const deleteTaskMutate = useMutation({
    mutationFn: deleteTask,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      }
    },
  });

  return (
    <div className="task-box">
      {isEdit ? (
        <input
          type="text"
          name="editted-task"
          id="editted-task"
          className="editted-task"
          value={edittedTask}
          required
          onChange={(e) => setEdittedTask(e.target.value)}
        />
      ) : (
        <div className="task">{isDone ? <s>{task}</s> : task}</div>
      )}
      {/* <div className="is-done">{isDone?.toString()}</div> */}
      <button
        className="mark-done-task"
        onClick={() => markDoneMutate.mutate()}
      >
        {isDone ? "Mark as un-done" : "Mark as done"}
      </button>
      <button
        className="edit-task"
        onClick={() => {
          setIsEdit(!isEdit);
          isEdit && editMutate.mutate();
        }}
      >
        {isEdit ? "Update the edit" : "Edit"}
      </button>
      <button className="delete-task" onClick={() => deleteTaskMutate.mutate()}>
        Delete
      </button>
    </div>
  );
}

export default Task;
