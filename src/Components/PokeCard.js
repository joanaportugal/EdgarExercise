import React, { useState, useEffect } from "react";

const PokeCard = ({ index, pokemonInfo, imageSrc, name }) => {
  const {
    hp,
    attack,
    defense,
    specialDefense,
    specialAttack,
    speed,
    height,
    weight,
    type,
    ability,
    hiddenAbility
  } = pokemonInfo;

  const [abilityText, setAbilityText] = useState("");
  const [hiddenAbilityText, setHiddenAbilityText] = useState("");

  const [isAbilityTextShown, setIsAbilityTextShown] = useState(false);
  const [isHiddenAbTextShown, setIsHiddenAbTextShown] = useState(false);

  useEffect(() => {
    const abilityURL = ability.url;
    const hiddenAbilityURL =
      typeof hiddenAbility === "object" ? hiddenAbility.url : null;

    if (hiddenAbilityURL !== null) {
      const urlArr = [abilityURL, hiddenAbilityURL];
      let count = 0;
      Promise.all(
        urlArr.map(async url => {
          await fetch(url)
            .then(res => res.json())
            .then(ability => {
              if (count === 0) {
                setAbilityText(
                  ability.effect_entries[ability.effect_entries.length - 1]
                    .effect
                );
              } else {
                setHiddenAbilityText(
                  ability.effect_entries[ability.effect_entries.length - 1]
                    .effect
                );
              }
              count++;
            });
        })
      );
    } else {
      fetch(abilityURL)
        .then(res => res.json())
        .then(ability => {
          setAbilityText(
            ability.effect_entries[ability.effect_entries.length - 1].effect
          );
        });
    }
  }, []);

  function checkClickOutside(event) {
    setIsAbilityTextShown(false);
    setIsHiddenAbTextShown(false);
  }

  document.addEventListener("mousedown", checkClickOutside);

  if (abilityText !== "") {
    return (
      <section>
        <div key={index} className={`card ${type}`}>
          <img src={imageSrc} alt={name} />
          <article>
            <h2 className="pokemon-name">{name}</h2>
            <h3>{type}</h3>
            <div className="pokemon-info">
              <div className="main-info">
                <div className="category">
                  <p>HP:</p>
                  <p>Attack:</p>
                  <p>Defense:</p>
                  <p>Special Attack:</p>
                  <p>Special Defense:</p>
                  <p>Speed:</p>
                  <p>Height:</p>
                  <p>Weight:</p>
                </div>
                <div className="info">
                  <p>{hp}</p>
                  <p>{attack}</p>
                  <p>{defense}</p>
                  <p>{specialAttack}</p>
                  <p>{specialDefense}</p>
                  <p>{speed} m/s</p>
                  <p>{height} feets</p>
                  <p>{weight} pounds</p>
                </div>
              </div>
            </div>
            <div className="ability-info">
              <button
                onClick={() => {
                  if (isHiddenAbTextShown) {
                    setIsHiddenAbTextShown(false);
                  }
                  setIsAbilityTextShown(true);
                }}
              >
                <p className="ability-type">Ability</p>
                <p className="ability-name">{ability.name}</p>
              </button>

              {typeof hiddenAbility === "object" ? (
                <>
                  <button
                    onClick={() => {
                      if (isAbilityTextShown) {
                        setIsAbilityTextShown(false);
                      }
                      setIsHiddenAbTextShown(true);
                    }}
                  >
                    <p className="ability-type">Hidden Ability</p>
                    <p className="ability-name">{hiddenAbility.name}</p>
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <p className="ability-type">Hidden Ability</p>
                    <p className="ability-name">{hiddenAbility}</p>
                  </div>
                </>
              )}
            </div>
          </article>
        </div>
        <div className="ability-description">
          <article className={isAbilityTextShown ? "visible" : "invisible"}>
            <p className="ability-name">{ability.name}</p>
            <p className="ability-text">{abilityText}</p>
          </article>
          {typeof hiddenAbility === "object" ? (
            <article className={isHiddenAbTextShown ? "visible" : "invisible"}>
              <p className="ability-name">{hiddenAbility.name}</p>
              <p className="ability-text">{hiddenAbilityText}</p>
            </article>
          ) : null}
        </div>
      </section>
    );
  } else return null;
};

export default PokeCard;
