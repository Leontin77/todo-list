import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import DeletedCard from "../../components/DeletedCard/DeletedCard";
import { Task } from "../../store/tasks/tasksSlice";
import "./DeletedTasks.scss";

const DeletedTasks: React.FC = () => {
  const deletedTasks = useSelector(
    (state: RootState) => state.tasks.deletedTasks
  );

  const memoizedDeletedTasks = useMemo(() => {
    return deletedTasks.map((task: Task) => (
      <li key={task.id}>
        <DeletedCard
          title={task.title}
          description={task.description}
          dateTime={task.date}
          taskId={task.id}
        />
      </li>
    ));
  }, [deletedTasks]);

  const noTasksMessage = useMemo(() => {
    return <div className="allTasks-noTasks">You have no tasks yet</div>;
  }, []);

  return (
    <div className="allTasks">
      <h1 className="allTasks-header">Deleted Tasks</h1>
      <ul>
        {deletedTasks.length ? (
          memoizedDeletedTasks
        ) : (
          noTasksMessage
        )}
      </ul>
    </div>
  );
};

export default DeletedTasks;
