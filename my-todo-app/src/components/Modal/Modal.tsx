import "./Modal.scss";
import { createPortal } from "react-dom";
import { memo, useState, useRef, useEffect } from "react";
import BaseInput from "../BaseInput/BaseInput";
import { useDispatch } from "react-redux";
import BaseButton from "../BaseButton/BaseButton";
import { addTask } from "../../store/tasksSlice";
import { closeModal } from "../../store/openModal/openModalSlice";
import Notiflix from "notiflix";
import DateTimePicker from "../DateTimePicker/DateTimePicker";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = memo(() => {
  const modalRoot = document.querySelector("#modal-root") as HTMLElement;
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const modalContainerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const data = {
    title,
    description,
    date,
    id: Math.random().toString(36).substr(2, 9),
    done: false,
  };

  return createPortal(
    <div className="modal">
      <div className="modal-container" ref={modalContainerRef}>
        <IoCloseCircleOutline
          className="modal-close"
          onClick={() => dispatch(closeModal())}
        />
        <BaseInput
          type="text"
          label="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <BaseInput
          type="text"
          label="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <DateTimePicker onChange={(date) => setDate(date.toLocaleString("en-GB"))} />
        <BaseButton className="modal-button" title="Add Task" onClick={handleAddTask} />
      </div>
    </div>,
    modalRoot
  );
});

export default Modal;
