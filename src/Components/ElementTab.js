import React, { useRef, useState, useLayoutEffect } from "react";

export const ElementTab = props => {
  const { callback, items, selectedOption, forwardRef } = props;
  const [option, setOption] = useState(selectedOption);

  useLayoutEffect(() => {
    const selected = document.querySelector(".element.selected");
    const borderElement = document.querySelector(".tab-line");
    if (selected) {
      borderElement.style.left = `${selected.offsetLeft}px`;
      borderElement.style.width = `${selected.offsetWidth}px`;
    }
  });

  return (
    <>
      <div className="tab-container" ref={forwardRef}>
        <div className="navigation">
          {items.map((item, index) => (
            <span
              className={option === item ? "element selected" : "element"}
              key={index}
              onClick={() => {
                callback(index);
                setOption(item);
              }}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="tab-line" />
      </div>
    </>
  );
};
