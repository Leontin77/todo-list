import "./DeletedCard.scss";
import { showDetails } from "../../helpers/showDetails";
import { useState } from "react";

type DeletedCardProps = {
  title?: string;
  description?: string;
  dateTime?: string;
  taskId?: any;
};

const DeletedCard: React.FC<DeletedCardProps> = ({
  title,
  description,
  dateTime,
  taskId,
}) => {
  const [openDetails, setOpenDetails] = useState(false);
  return (
    <section className="taskCard deleted" onClick={() => setOpenDetails(!openDetails)}>
      <div className="taskCard-container"></div>
      <div className="taskCard-container info">
        <h4 className="taskCard-title">{openDetails ? title : showDetails(title)}</h4>
        <div className="taskCard-description">{openDetails ? description : showDetails(description)}</div>
      </div>
      <div className="taskCard-container">
        <span>{dateTime?.toLocaleString()}</span>
      </div>
    </section>
  );
};

export default DeletedCard;
