import React from "react";

function Staff({ firstName, lastName, avatar, job, id }) {
  return (
    <div className="card">
      <img className="workerImg " alt="" src={`${avatar}?id=${id}`} />
      <div className="workerName  ">
        {firstName} {lastName}
      </div>
      <div className="workerTitle  ">{job}</div>
    </div>
  );
}

export default Staff;
