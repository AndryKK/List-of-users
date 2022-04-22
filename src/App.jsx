/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-loop-func */
import { useEffect, useState } from 'react';
import './App.scss';
import User from './User/User';
import EditingUser from './EditingUser/EditingUser';
import { usersfromServer } from './api/api';
import classNames from 'classnames';
import Slider from './Slider/Slider';

function App() {
  const [edit, setedit] = useState(false);
  const [minAge, setMinAge] = useState(0)
  const [maxAge, setMaxAge] = useState(100)
  const [users, setUsers] = useState([])
  const [usersCopy, setUsersCopy] = useState([])
  const [maxUsers, setMaxUser] = useState(50)
  const [wordFilter, setWordFilter] = useState('')
  const [sex, setSex] = useState('')
  const [sort, setSort] = useState('')
  const [tempUser, setTempUser] = useState({})
  const [original, setOriginal] = useState([])
  const [pages, setPages] = useState([1])
  const [actualPage, setActualPage] = useState(1)
  const [userTemp, setUserTemp] = useState(null)
  const [drag, setDrag] = useState(false)
  const [firstLoad, setFirstLoad] = useState(false)


  const editing = (user, action, user2) => {
    if (action === "dell") {
      setOriginal(original.filter(u => (u.login.uuid !== user.login.uuid)));
      setUsers(users.filter(u => (u.cell !== user.cell)))
      setUsersCopy(usersCopy.filter(u => (u.login.uuid !== user.login.uuid)))
      onEdit()
    }

    if (action === "update") {
      setOriginal(original.map(u => (u.login.uuid !== user.login.uuid) ? u : user));
      setUsers(users.map(u => (u.login.uuid !== user.login.uuid) ? u : user))
      setUsersCopy(usersCopy.map(u => (u.login.uuid !== user.login.uuid) ? u : user))
      onEdit()
    }

    if (action === "sort") {
      const indexToIn = users.findIndex(u => (u.login.uuid === user2.login.uuid));

      let part1 = users.slice(0, indexToIn);
      let part2 = users.slice(indexToIn, users.length);

      part1 = part1.filter(u => (u.login.uuid !== user.login.uuid))
      part2 = part2.filter(u => (u.login.uuid !== user.login.uuid))

      setUsers([...part1, user, ...part2]);
      setUsersCopy([...part1, user, ...part2]);

      const indexToIn2 = original.findIndex(u => (u.login.uuid === user2.login.uuid));

      let part1a = original.slice(0, indexToIn2);
      let part2a = original.slice(indexToIn2, original.length);

      part1a = part1a.filter(u => (u.login.uuid !== user.login.uuid))
      part2a = part2a.filter(u => (u.login.uuid !== user.login.uuid))

      setOriginal([...part1a, user, ...part2a]);
    }
  }


  const pagination =(currentPage, maxUsersIn)=> {

    const page = [...original.slice((maxUsersIn * currentPage) - maxUsersIn, maxUsersIn * currentPage)]

    setActualPage(currentPage);
    setUsersCopy(page);
    setUsers(page);
    setPages(Array.from(Array(Math.ceil(original.length / maxUsersIn)).keys()).map(x => x + 1));
  }

  const getUsers = async (count)=> {
    for (let i = 0; i < (count - original.length); i++) {
    const user = await usersfromServer()
    
    let usersLength = 0;

      setUsers((users) => {
        usersLength = users.length;
        return [...users, user.results[0]]}
      )

      setUsersCopy((usersCopy) => {
        usersLength = usersCopy.length;
        return [...usersCopy, user.results[0]]}
      )

      setOriginal((original) => {
        usersLength = original.length;
        return [...original, user.results[0]]}
      )
    }
  }


 useEffect(() => {
   if (original.length < maxUsers) {
    getUsers(maxUsers)
   }
 }, [maxUsers]
 )

 const onEdit = (user) => {
    setTempUser(user)
    setedit(!edit)
  }

  const filterByWord = (event) => {
    setWordFilter(event.target.value);
    setUsersCopy([...users])
  }

  const sortUseres =(sortIn)=> {
    setDrag(false);
    const temp = [...users];

    switch (sortIn) {
      case "Name":
        setUsers(temp.sort((a, b) => ((a.name.last < b.name.last) ? -1 : 1)));
        break;
      case "NameR":
        setUsers(temp.sort((a, b) => ((b.name.last < a.name.last) ? -1 : 1)));
        break;
      case "Date":
        setUsers(temp.sort((a, b) => (b.dob.date.slice(0, 4) - a.dob.date.slice(0, 4))));
        break;
      case "DateR":
        setUsers(temp.sort((a, b) => (a.dob.date.slice(0, 4) - b.dob.date.slice(0, 4))));
        break;
      case "City":
        setUsers(temp.sort((a, b) => ((a.location.city < b.location.city) ? -1 : 1)));
        break;
      case "CityR":
        setUsers(temp.sort((a, b) => ((b.location.city < a.location.city) ? -1 : 1)));
        break;
      case "Custom":
        setDrag(true);
        break;
      default: 
        setUsers(original);
        break;
    }

  }


  useEffect(()=> {
    setUsersCopy(users.filter(user => 
      (user.name.first.toLocaleLowerCase().includes(wordFilter) 
      || user.name.last.toLocaleLowerCase().includes(wordFilter))
      && ((user.dob.age > minAge) && (user.dob.age < maxAge))
      && (user.gender !== sex)
    ))
  }, [usersCopy])

  return (
    <div className="App">
      {edit
        ? (
            <EditingUser onEdit={onEdit} user={tempUser} editing={editing} />
          )
        : (
          <>
            <div className="App__filter filter">
              <h2 className="filter__title">Filter</h2>
              <div className="filter__block">
                <h3 className="filter__lable">Name</h3>
                <input
                  type="text"
                  placeholder="Search by name"
                  className="filter__input"
                  value={wordFilter}
                  onChange={(event) => filterByWord(event)} />
                <h3 className="filter__lable">Age</h3>
                <Slider 
                  data={{
                    min: 0,
                    max: 100,
                    step: 1,
                    value: { min: minAge, max: maxAge }
                  }}

                  onChange={(data)=> {
                    if (data.value.min >= 0) {
                      setMinAge(data.value.min)
                    }

                    if (data.value.max <= 100) {
                      setMaxAge(data.value.max)
                    }
                  }}
                />
               
                <span className="filter__inputRange__status">{minAge} - {maxAge}</span>
                <h3 className="filter__lable">Gender</h3>
                <div className="filter__genderButtons">
                  <button
                    className={classNames(
                      "filter__genderButtons__button",
                      { "filter__genderButtons__button--selected": (sex === "female") }
                    )}
                    onClick={() =>{sex !== "female" ? setSex("female") : setSex("")}}
                  >
                    Male
                  </button>
                  <button
                    className={classNames(
                      "filter__genderButtons__button button__left",
                      { "filter__genderButtons__button--selected": (sex === "male") }
                    )}
                    onClick={() =>{sex !== "male" ? setSex("male") : setSex("")}}
                  >
                    Female
                  </button>
                </div>
                <h3 className="filter__lable">Sort By</h3>
                <select
                  defaultValue={"0"}
                  className="filter__select"
                  name="Name"
                  id="0"
                  onChange={(event) => { setSort(event.target.value); sortUseres(event.target.value)} }
                >
                  <option value="0" disabled>Please select</option>
                  <option value="Name">Name A - Z</option>
                  <option value="NameR">Name Z - A</option>
                  <option value="Date">Date of birth 0 - 99</option>
                  <option value="DateR">Date of birth 99 - 00</option>
                  <option value="City">City A - Z</option>
                  <option value="CityR">City Z - A</option>
                  <option value="Custom">Custom sort</option>
                </select>
              </div>
            </div>
            <div className="App__list list">
              <h2 className="list__title">List of users</h2>
              <div className="list__users users">
                {users.length 
                  ? (usersCopy.map(user => 
                    { 
                      return (
                      <User
                        drag={drag}
                        key={user.login.uuid}
                        onEdit={onEdit}
                        user={user}
                        editing={editing}
                        userTemp={userTemp}
                        setUserTemp={setUserTemp}
                      />)
                    }
                  ))
                  : (<h2>Loaarding...</h2>)
                }
              </div>
              <div className="bottomOptions">
                <div className="bottomOptions__wrap">
                  {pages.map(number => 
                    <button
                      key={number}
                      className={classNames(
                        {"bottomOptions__round": true},
                        {"bottomOptions__round--selected": ((actualPage === number) && (pages.length > 1))}
                      )}
                      onClick={() => pagination(number, maxUsers)}
                    >
                      {number}
                    </button>)}
                  <button 
                    className="bottomOptions__next"
                    onClick={() => 
                      ((!(Math.ceil(original.length / maxUsers) < actualPage + 1))) 
                      ? pagination(actualPage + 1, maxUsers) 
                      : null
                    }
                  >
                    {'Next page >'}
                  </button>
                </div>
                <select
                defaultValue={"50"}
                  className="bottomOptions__select"
                  onChange={(event) => {
                    setMaxUser(+event.target.value); 
                    pagination(1, +event.target.value)
                  }}
                >
                  <option value="10">10</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="500">All</option>
                </select>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default App;
