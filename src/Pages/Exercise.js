import React from "react";
import Dropdown from '../Components/Dropdown';

const items = ["Bruno", "Pedro", "Flávio", "Joana", "Maria", "Diogo", "Tomás", "Araújo", "Edgar"];

const selected = "Choose...";

const Exercise = () => {
  
  return <div>
          <Dropdown title="OLA" selected={selected} items={items}/>
        </div>;
};

export default Exercise;