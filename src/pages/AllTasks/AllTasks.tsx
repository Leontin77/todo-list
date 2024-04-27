import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Task } from "../../store/tasks/tasksSlice";
import { openModal } from "../../store/openModal/openModalSlice";
import BaseButton from "../../components/BaseButton/BaseButton";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./AllTasks.scss";
import Modal from "../../components/Modal/Modal";

const AllTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const memoizedTasks = useMemo(() => {
    return tasks.map((task: Task) => (
      <li key={task.id}>
        <TaskCard
          title={task.title}
          description={task.description}
          dateTime={task.date}
          taskId={task.id}
        />
      </li>
    ));
  }, [tasks]);

  const memoizedModal = useMemo(() => {
    return isOpen ? <Modal /> : null;
  }, [isOpen]);

  return (
    <div className="allTasks">
      {memoizedModal}
      <h1 className="allTasks-header">All Tasks</h1>
      <ul>
        {tasks.length ? (
          memoizedTasks
        ) : (
          <div className="allTasks-noTasks">You have no tasks yet</div>
        )}
      </ul>
      <BaseButton
        title="Add new task"
        onClick={() => {
          dispatch(openModal());
        }}
      />
    </div>
  );
};

export default AllTasks;
