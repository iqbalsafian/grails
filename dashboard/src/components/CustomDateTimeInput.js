import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function CustomDateTimeInput() {
  let [theDate, setTheDate] = useState('');
  return (
    <DatePicker
      selected={theDate}
      onChange={date=>setTheDate(date)}
      showTimeSelect
      dateFormat="MMMM d, yyyy HH:mm"
    />
  )
}