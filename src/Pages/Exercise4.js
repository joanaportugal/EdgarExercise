import React, { useRef, useReducer, useEffect } from "react";
import { ElementTab } from "../Components/ElementTab.js";
import "../Styles/tabs.less";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1, option: action.value };
    case "delete":
      return { count: 0 };
  }
}

const Exercise4 = props => {
  const [state, dispatch] = useReducer(reducer, { count: 0, option: 0 });
  const tabRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", event => {
      tabRef.current.contains(event.target)
        ? null
        : dispatch({ type: "delete" });
    });
  });

  const itemList = ["First Element","Second Element","Third Element","Fourth Element"];

  const TabText = () => {
    switch (state.option) {
      case 0:
        return "Tab 1 text";
      case 1:
        return "Tab 2 text";
      case 2:
        return "Tab 3 text";
      case 3:
        return "Tab 4 text";
      default:
        return "No tab selected. Maybe you should select one of above";
    }
  };

  return (
    <div id="container">
      <h1>Exercise 4</h1>
      <ElementTab
        callback={key => dispatch({ type: "increment", value: key })}
        items={itemList}
        selectedOption={state.option}
        forwardRef={tabRef}
      />
      <span id="counter">Clicked {state.count} times.</span>

      <span id="text">
        <TabText />
      </span>
    </div>
  );
};

export default Exercise4;