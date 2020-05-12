import React, { useState, useLayoutEffect, useRef } from "react";
import "../Styles/dropdown.less";

function Dropdown({ title, selected, items }) {
  let styleDinamicDiv;
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState(selected);
  const dropdownRef = useRef(null);

  useLayoutEffect(() => {
    styleDinamicDiv = document.getElementsByClassName("style--dinamicDiv")[0];
  });

  function closeDropDown() {
    if(styleDinamicDiv) styleDinamicDiv.style.height = "0px";
    setOpen(false);
  }

  function openDropDown() {
    styleDinamicDiv.style.height = items.length * 32 + "px";
    setOpen(true);
  }

  function DropDownMenu() {
    open ? closeDropDown() : openDropDown();
  }

  function optionSelected(element) {
    setChosen(element);
    closeDropDown();
  }

  function checkClickOutside(event) {
    if(!dropdownRef.current.contains(event.target)){
      closeDropDown();
    }
  }

  document.addEventListener("mousedown", checkClickOutside);

  return (
    <div className={`dropdown ${open ? "up" : null}`}>
      <h1>{title}</h1>
      <div ref={dropdownRef} className="container">
        <button className="button" onClick={DropDownMenu}>
          <div>{chosen}</div>
          <div className="chevron"> </div>
        </button>
        <ul className="style--dinamicDiv">
          {items.map(element => (
            <li
              onClick={() => {
                optionSelected(element);
              }}
              className="p--item"
            >
              {element}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
