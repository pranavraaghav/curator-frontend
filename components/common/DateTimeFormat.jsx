import React from "react"
import Moment from "react-moment"

function DateTimeFormat({ dateParam }) {
  if (dateParam == null) {
    return "NaN"
  }

  const dateNowNum = Date.now()
  const dateNum = Date.parse(dateParam)
  const difference = dateNowNum - dateNum

  if (difference < 86400000) {
    //Younger than a day
    return <Moment date={dateParam} fromNow />
  }

  if (difference < 604800000) {
    //Younger than a week
    return <Moment date={dateParam} format="Do MMM YYYY" />
  }

  // else default
  return <Moment date={dateParam} format={"Do MMM YYYY"} />
}

export default DateTimeFormat
