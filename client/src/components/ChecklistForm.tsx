import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../app/hooks";

function ChecklistForm() {
  const auth = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [task, setTask] = useState<string>("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTask = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/checklist/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ task }),
      }
    );
    return res.json();
  };

  const taskMutate = useMutation({
    mutationFn: addTask,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        setTask("");
      }
    },
  });
  return (
    <div className="checklist-form">
      <form
        action="/"
        onSubmit={(e) => {
          e.preventDefault();
          taskMutate.mutate();
        }}
      >
        <div className="form-element">
          <label htmlFor="task">Task</label>
          <input
            type="text"
            name="task"
            placeholder="Check mails"
            id="task"
            className="task"
            value={task}
            required
            onChange={onChangeHandler}
          />
        </div>
        <button formAction="submit" className="submit-btn">
          Add to the list
        </button>
      </form>
    </div>
  );
}

export default ChecklistForm;
