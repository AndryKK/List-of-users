import classNames from "classnames";
import { useState } from "react";
import "../EditingUser/EditingUser.scss"
import { normalizatingDate } from "../functions/functions";



const EditingUser = ({onEdit, user, editing}) => {
  const [nameInput, SetNameInput] = useState(
    `${user.name.first}` 
    + ` ` 
    + `${user.name.last}`
  )
  const [emailInput, SetEmailInput] = useState(`${user.email}`)
  const [phoneInput, SetPhoneInput] = useState(`${user.cell}`)
  const [cityInput, SetCityInput] = useState(`${user.location.city}`)
  const [adressInput, SetAdressInput] = useState(`${user.location.street.name} ${user.location.street.number}`)
  const [dateInput, SetDateInput] = useState(user.dob.date.slice(0,10))

  const [nameInputBool, SetNameBoolInput] = useState(false)
  const [emailInputBool, SetEmailBoolInput] = useState(false)
  const [phoneInputBool, SetPhoneIBoolnput] = useState(false)
  const [cityInputBool, SetCityBoolInput] = useState(false)
  const [adressInputBool, SetAdressBoolInput] = useState(false)
  const [dateInputBool, SetDateBoolInput] = useState(false)


  const normalizator = (input, part) => {
    const inputSplited = input.split(' ')
    if (part === "first") {
      return inputSplited[0]
    }
    if (part === "last") {
      return inputSplited[1]
    }
  }

  const normalizator2 = (input, part) => {
    const inputSplited = input.split(' ')
    const words = inputSplited.length;

    if (part === "first" && words === 2) {
      return inputSplited[0]
    }

    if (part === "first" && words > 2) {
      return inputSplited[0] + ' ' + inputSplited[1]
    }

    if (part === "last" && words === 3) {
      return inputSplited[2]
    }

    if (part === "last" && words === 2) {
      return inputSplited[1]
    } else {
      return ""
    }
  }

  const changeUser = () => {
    return {...user, 
      email: emailInput, 
      cell: phoneInput,
      location: { ...user.location, 
        city: cityInput, 
        street: {
          name: normalizator2(adressInput, "first"), 
          number: normalizator2(adressInput, "last") 
        }
      },
      dob: {...user.dob, date: dateInput + user.dob.date.slice(10, -1)},
      name: {...user.name, first: normalizator(nameInput, "first"), last: (normalizator(nameInput, "last") || "") }
    }
  }

  return (
    <div className="Edit">
      <div className="Edit__leftCard">

         <button className="Edit__leftCard__back" onClick={()=>editing(changeUser(), "update")}>{"< Back"}</button>
         <img 
           src={`${user.picture.large}`}
           alt="UserPhoto"
           className="Edit__leftCard__userPhoto"
          />
          <h1 className="Edit__leftCard__userName">
          {`${user.name.title}` 
          + ` ` 
          +`${user.name.first}` 
          + ` ` 
          + `${user.name.last}`}
          </h1>
          <span className="Edit__leftCard__birthday">{normalizatingDate(user.dob.date)}</span>
          <button 
            className="Edit__leftCard__delete"
            onClick={() => editing(user, "dell")}
          >
            Delete
          </button>
      </div>



      <div className="Edit__rightCard rightCard">

        <div className="rightCard__input">
          <input
            disabled={!nameInputBool}
            type="text"
            className={classNames(
              "rightCard__input__input rightCard__input__input", 
              {"rightCard__input__input rightCard__input__input--unactive": !nameInputBool}
            )}
            value={nameInput}
            onChange={(event) => SetNameInput(event.target.value)}
          />
          <button 
            type="button"
            onClick={() => {SetNameBoolInput(!nameInputBool)}}
            className="rightCard__input__button" 
          >
            {nameInputBool ? "Update" : "Edit"}
          </button>
        </div>

        <div className="rightCard__input">
          <input
            disabled={!emailInputBool}
            type="email"
            className={classNames(
              "rightCard__input__input rightCard__input__input", 
              {"rightCard__input__input rightCard__input__input--unactive": !emailInputBool}
            )}
            value={emailInput}
            onChange={(event) => SetEmailInput(event.target.value)}
          />
          <button 
            type="button" 
            className="rightCard__input__button"
            onClick={(event)=> {event.preventDefault(); SetEmailBoolInput(!emailInputBool)}}
          >
            {emailInputBool ? "Update" : "Edit"}
          </button>
        </div>

        <div className="rightCard__input">
          <input
            disabled={!phoneInputBool}
            type="text"
            className={classNames(
              "rightCard__input__input rightCard__input__input", 
              {"rightCard__input__input rightCard__input__input--unactive": !phoneInputBool}
            )}
            value={phoneInput}
            onChange={(event) => SetPhoneInput(event.target.value)}
          />
          <button 
            type="button"
            className="rightCard__input__button"
            onClick={()=> SetPhoneIBoolnput(!phoneInputBool)}
          >
            {phoneInputBool ? "Update" : "Edit"}
          </button>
        </div>

        <div className="rightCard__input">
          <input
            disabled={!cityInputBool}
            type="text"
            className={classNames(
              "rightCard__input__input rightCard__input__input", 
              {"rightCard__input__input rightCard__input__input--unactive": !cityInputBool}
            )}
            value={cityInput}
            onChange={(event) => SetCityInput(event.target.value)}
          />
          <button
            type="button"
            className="rightCard__input__button"
            onClick={()=> SetCityBoolInput(!cityInputBool)}
          >
            {cityInputBool ? "Update" : "Edit"}
          </button>
        </div>

        <div className="rightCard__input">
          <input
            disabled={!adressInputBool}
            type="text"
            className={classNames(
              "rightCard__input__input rightCard__input__input", 
              {"rightCard__input__input rightCard__input__input--unactive": !adressInputBool}
            )}
            value={adressInput}
            onChange={(event) => SetAdressInput(event.target.value)}
          />
          <button
            type="button"
            className="rightCard__input__button"
            onClick={()=> SetAdressBoolInput(!adressInputBool)}
          >
            {adressInputBool ? "Update" : "Edit"}
          </button>
        </div>

        <div className="rightCard__input">
          <input
            disabled={!dateInputBool}
            type="date"
            className={classNames(
              "rightCard__input__input rightCard__input__input", 
              {"rightCard__input__input rightCard__input__input--unactive": !dateInputBool}
            )}
            value={dateInput}
            onChange={(event) => SetDateInput(event.target.value)}
          />
          <button 
            type="button"
            className="rightCard__input__button"
            onClick={() => SetDateBoolInput(!dateInputBool)}
          >
            {dateInputBool ? "Update" : "Edit"}
          </button>
        </div>

      </div>
    </div>
  )
}

export default EditingUser;