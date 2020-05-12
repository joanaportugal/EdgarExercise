import React, {useLayoutEffect} from "react";
import { Link } from "react-router-dom";

const Navigation = ({selected}) => {
   useLayoutEffect(() => {
    const a = document.querySelector(".selected");
    const b = document.querySelector(".partialline");
    b.style.left = `${a.offsetLeft}px`;
    b.style.width = `${a.offsetWidth}px`;
  });

  return (
    <div>
      <div className="topline"> </div>
 
      <div className="partialline"> </div>

      <div className="menu">
        <ul>
          <li className="home">
            <Link
              className={selected === "home" ? "selected" : null}
              to="/"
            >
              Home
            </Link>
          </li>

          <li className="exercise">
            <Link
              className={selected === "exercise" ? "selected" : null}
              to="/exercise"
            >
              Exercise
            </Link>
          </li>

          <li className="exercise2">
            <Link
              className={selected === "exercise2" ? "selected" : null}
              to="/exercise2"
            >
              Exercise 2
            </Link>
          </li>

          <li className="exercise4">
            <Link
              className={selected === "exercise4" ? "selected" : null}
              to="/exercise4"
            >
              Exercise 4
            </Link>
          </li>
          <li className="fetchexercise">
            <Link
              className={selected === "fetchexercise" ? "selected" : null}
              to="/fetchexercise"
            >
              Fetch Exercise
            </Link>
          </li>
          <li className="reduxexercise">
            <Link
              className={selected === "reduxexercise" ? "selected" : null}
              to="/reduxexercise/1"
            >
              Redux Exercise
            </Link>
          </li>

          <li className="pokemonfilter">
            <Link
              className={selected === "pokemonfilter" ? "selected" : null}
              to="/pokemonfilter"
            >
              Pokemon Filter
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );

  
};

export default Navigation;


