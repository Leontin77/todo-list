import { useState } from "react";
import "./DefaulrPage.scss";
// import AllTasks from "../../components/AllTasks/AllTasks";
// import DeletedTasks from "../../components/DeletedTasks/DeletedTasks";

const DefaultPage = () => {
  const [tab, setTab] = useState(1);

  return (
    <>
      {/* <AllTasks />
      <DeletedTasks /> */}
    </>
  );
};

export default DefaultPage;
