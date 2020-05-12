import React, { useState, useLayoutEffect } from "react";
import "../Styles/warning.less";

function Warning() {
  let warningDiv;
  const [warning, setWarning] = useState(false);

  useLayoutEffect(() => {
    warningDiv = document.getElementsByClassName("warning__div")[0];
  });

  function warningUp() {
    warningDiv.style.top = "-200px";
    setWarning(true);
    setTimeout(() => {
      warningDown();
    }, 2000);
  }

  function warningDown() {
    warningDiv.style.top = "100px";
    setWarning(false);
  }

  function warningAnimation() {
    console.log(warning);
    warning ? warningDown() : warningUp();
  }

  return (
    <div className="warning__div">
      <h5> This is a warning sign. </h5>{" "}
      <button onClick={warningAnimation}> X </button>{" "}
    </div>
  );
}
export default Warning;
