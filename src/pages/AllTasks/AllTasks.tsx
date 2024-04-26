// AllTasks.tsx
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { Task } from "../../store/tasksSlice";
import { openModal } from "../../store/openModal/openModalSlice";
import BaseButton from "../../components/BaseButton/BaseButton";
import TaskCard from "../../components/TaskCard/TaskCard";
import "./AllTasks.scss";
import Modal from "../../components/Modal/Modal";

const AllTasks: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  // console.log('tasks', tasks);


  return (
    <div className="allTasks">
      {isOpen && <Modal />}
      <h1 className="allTasks-header">All Tasks</h1>
      <ul>
        {tasks?.length ? (
          tasks.map((task: Task) => (
            <li key={task.id}>
              <TaskCard
                title={task.title}
                description={task.description}
                dateTime={task.date}
                taskId={task.id}
              />
            </li>
          ))
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
