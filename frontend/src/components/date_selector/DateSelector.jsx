import { useState, useEffect } from "react";
import { Select, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDate() {
  let month;
  let day;
  let year;

  let date = new Date();

  year = date.getFullYear();
  month = months[date.getMonth()];
  day = date.getDate();

  return [month, day, year];
}

function isLeapYear(year) {
  let isLeap = false;

  if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    isLeap = true;
  }

  return isLeap;
}

function getNumOfDays(month, year) {
  let days = 0;

  const monthDays = {
    January: 31,
    February: 28,
    FebruaryLeap: 29,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31,
  };

  if (month === "February" && isLeapYear(year)) {
    days = monthDays["FebruaryLeap"];
  }
  else {
    days = monthDays[month];
  }
  
  return Array.from({ length: days }, (_, i) => i + 1);
}

export default function DateSelector() {
  const [currMonth, currDay, currYear] = getDate();

  const [month, setMonth] = useState(currMonth);
  const [day, setDay] = useState(currDay);
  const [year, setYear] = useState(currYear);

  //TODO: Fix Feb
  const[numOfDays, setNumOfDays] = useState([]);

  useEffect(() => {
    setNumOfDays(getNumOfDays(month, year));
  }, [month]);

  return (
    <div className="flex">
      <div className="w-1/4 pt-2 mr-2 min-w-32 relative">
        <Listbox value={month} onChange={setMonth}>
            <ListboxButton className="w-full flex p-1 px-2 border justify-between text-gray-400 bg-[#171717] border-gray-400 rounded">
              {month}
              <ChevronDown/>
            </ListboxButton>
            <ListboxOptions className="absolute w-full border p-2 bg-[#171717] border-gray-400 rounded">
              {months.map((month, index) => (
                <ListboxOption key={index} value={month}>
                  {month}
                </ListboxOption>
              ))}
            </ListboxOptions>
        </Listbox>
      </div>
      <div className="w-1/8 min-w-15 pt-2 relative">
        <Listbox value={day} onChange={setDay}>
            <ListboxButton className="w-full flex p-1 px-2 border justify-between text-gray-400 bg-[#171717] border-gray-400 rounded">
              {day}
              <ChevronDown/>
            </ListboxButton>
            <ListboxOptions className="absolute w-full max-h-33 border p-2 bg-[#171717] border-gray-400 rounded overflow-y-auto">
              {numOfDays.map((day, index) => (
                <ListboxOption key={index} value={day}>
                  {day}
                </ListboxOption>
              ))}
            </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}