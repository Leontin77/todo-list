import "./TaskCard.scss";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { Checkbox } from "@mui/material";
import Notiflix from "notiflix";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../../store/tasksSlice";
import { showDetails } from "../../helpers/showDetails";
import { RootState } from "../../store/store";

type TaskCardProps = {
  title?: string;
  description?: string;
  dateTime?: string;
  taskId?: any;
  done?: boolean;
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  dateTime,
  taskId,
}) => {
  const taskDone = useSelector(
    (state: RootState) =>
      state.tasks.tasks.find((task) => task.id === taskId)?.done
  );

  const [openDetails, setOpenDetails] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id: any) => {
    dispatch(deleteTask(id));
    Notiflix.Notify.success("Task deleted successfully");
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedDone = e.target.checked;
    dispatch(updateTask({ id: taskId, done: updatedDone }));
    Notiflix.Notify.success(
      `Task marked as ${updatedDone ? "done" : "undone"}`
    );
  };

  return (
    <section
      className={`taskCard ${taskDone ? "done" : ""}`}
      onClick={() => setOpenDetails(!openDetails)}
    >
      <div className="taskCard-container">
        <Checkbox
          checked={taskDone}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="taskCard-container info">
        <h4 className="taskCard-title">
          {openDetails ? title : showDetails(title)}
        </h4>
        <div className="taskCard-description">
          {openDetails ? description : showDetails(description)}
        </div>
      </div>
      <div className="taskCard-container">
        <span>{dateTime?.toLocaleString()}</span>
        <MdDelete
          className="taskCard-delete"
          onClick={() => handleDelete(taskId)}
        />
      </div>
    </section>
  );
};

export default TaskCard;
