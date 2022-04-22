export const normalizatingDate =(date)=> {
  let temp = date.slice(0,10).split('-');
  let month = ''
    switch(temp[1]) {
      case '01':
        month = "January"
      break;
      case '02':
        month = "Febuary"
      break;
      case '03':
        month = "March"
      break;
      case '04':
        month = "April"
      break;
      case '05':
        month = "May"
      break;
      case '06':
        month = "June"
      break;
      case '07':
        month = "July"
      break;
      case '08':
        month = "August"
      break;
      case '09':
        month = "September"
      break;
      case '10':
        month = "October"
      break;
      case '11':
        month = "November"
      break;
      case '12':
        month = "December"
      break;
      default:
        month = `Unkown month ${temp[1]}`;
      break;
    }

  let normldate = temp[2] + ` ${month} ` + temp[0]
  return normldate
}
