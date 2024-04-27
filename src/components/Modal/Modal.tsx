import "./Modal.scss";
import { createPortal } from "react-dom";
import { memo, useState, useRef, useEffect, useMemo } from "react";
import BaseInput from "../BaseInput/BaseInput";
import { useDispatch } from "react-redux";
import BaseButton from "../BaseButton/BaseButton";
import { addTask } from "../../store/tasks/tasksSlice";
import { closeModal } from "../../store/openModal/openModalSlice";
import Notiflix from "notiflix";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal: React.FC = memo(() => {
  const modalRoot = useMemo(() => document.querySelector("#modal-root") as HTMLElement, []);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(target) &&
        target &&
        !target.classList.contains("flatpickr-day")
      ) {
        dispatch(closeModal());
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handleAddTask = () => {
    if (!title.trim()) {
      Notiflix.Notify.failure("Task name is required");
      return;
    }
    const data = {
      title,
      description,
      date,
      id: Math.random().toString(36).substr(2, 9),
      done: false,
    };
    dispatch(addTask(data));
    dispatch(closeModal());
    Notiflix.Notify.success("Task added successfully");
  };

  const modalContent = useMemo(() => (
    <div className="modal">
      <div className="modal-container" ref={modalContainerRef}>
        <IoCloseCircleOutline
          className="modal-close"
          onClick={() => dispatch(closeModal())}
        />
        <BaseInput
          type="text"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <BaseInput
          type="text"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <DateTimePicker onChange={(date) => setDate(date.toLocaleString("en-GB"))} />
        <BaseButton className="modal-button" title="Add Task" onClick={handleAddTask} />
      </div>
    </div>
  ), [dispatch, handleAddTask, title, description, setDate]);

  return createPortal(modalContent, modalRoot);
});

export default Modal;
