import "../User/User.scss"
import { normalizatingDate } from "../functions/functions";


const User = ({ onEdit, user, editing, userTemp, setUserTemp, drag }) => {

  function dragStartHandler(e, user) {
    e.target.style.backgroundColor = "#ecd3fa"
  }

  function dragEndHandler(e, user1) {
    editing(user1, "sort", userTemp);
    e.target.style.backgroundColor = "transparent"
  }

  function dragOverHandler(e, user) {
    setUserTemp(user)
    e.preventDefault();
  }

  function dragHandler(e, user) {
    e.preventDefault();
  }



  return(
    <div
      onDragStart={(e) => dragStartHandler(e, user)}
      onDragEnd={(e) => dragEndHandler(e, user)}
      onDragOver={(e) => dragOverHandler(e, user)}
      onDrag={(e) => dragHandler(e, user)}
      draggable={drag}
      className="User">
      <img 
        src={`${user.picture.large}`}
        alt={`${user.name.first} avatar`} 
        className="User__photo"
      />
      <div className="User__text">
        <h4 className="User__text__title">
          {`${user.name.title}` 
          + ` ` 
          +`${user.name.first}` 
          + ` ` 
          + `${user.name.last}`}
        </h4>
        <span className="User__text__birthday">{normalizatingDate(user.dob.date)}</span>
        <div className="User__text__adress__wrap">
          <span className="User__text__adress">{user.location.city}, {user.location.street.name} {user.location.street.number}</span>
        </div>
        <span className="User__text__mail">{user.email}</span>
      </div>
      <button 
        className="User__button"
        onClick={()=>{onEdit(user)}}
      >
        Edit
      </button>
    </div>
  )
}

export default User;