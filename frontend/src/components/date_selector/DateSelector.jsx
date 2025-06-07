import { useState, useEffect } from "react";
import {
  Select,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
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

  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
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
  } else {
    days = monthDays[month];
  }

  return Array.from({ length: days }, (_, i) => i + 1);
}

function getYearOption(currYear) {
  let yearOptions = [];

  for (let i = 0; i < 5; i++) {
    yearOptions.push(currYear + i);
  }

  return yearOptions;
}

// Main Component
export default function DateSelector(prop) {
  const [currMonth, currDay, currYear] = getDate();

  const [month, setMonth] = useState(currMonth);
  const [day, setDay] = useState(currDay);
  const [year, setYear] = useState(currYear);

  const [numOfDays, setNumOfDays] = useState([]);
  const yearOptions = getYearOption(currYear);

  useEffect(() => {
    const currNumOfDays = getNumOfDays(month, year);

    if (day > currNumOfDays.length) {
      setDay(currNumOfDays.length);
    }
    setNumOfDays(currNumOfDays);
  }, [month]);

  // Passes date input to parent
  useEffect(() => {
    const monthIndex = months.indexOf(month);
    const selectedDate = new Date(year, monthIndex, day);

    const formatted = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    prop.setDate(formatted);
  }, [year, month, day]);

  const selectorStyle="flex w-full justify-between rounded border border-blue-500 bg-[#171717] p-1 px-2 text-gray-400 select-none hover:cursor-pointer hover:border-white";

  return (
    <div className="flex flex-wrap">
      <div className="relative mr-2 w-1/4 min-w-32">
        <Listbox value={month} onChange={setMonth}>
          <ListboxButton className={selectorStyle}>
            {month}
            <ChevronDown />
          </ListboxButton>
          <ListboxOptions className="absolute z-1 max-h-[30vh] w-full overflow-y-auto rounded border border-blue-500 bg-[#171717]">
            {months.map((month, index) => (
              <ListboxOption
                key={index}
                value={month}
                className="p-1 select-none hover:cursor-pointer hover:bg-blue-500"
              >
                {month}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <div className="relative mr-2 w-1/8 min-w-16">
        <Listbox value={day} onChange={setDay}>
          <ListboxButton className={selectorStyle}>
            {day}
            <ChevronDown />
          </ListboxButton>
          <ListboxOptions className="absolute z-1 max-h-[30vh] w-full overflow-y-auto rounded border border-blue-500 bg-[#171717]">
            {numOfDays.map((day, index) => (
              <ListboxOption
                key={index}
                value={day}
                className="p-1 select-none hover:cursor-pointer hover:bg-blue-500"
              >
                {day}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
      <div className="relative mr-2 w-1/5 min-w-20">
        <Listbox value={year} onChange={setYear}>
          <ListboxButton className={selectorStyle}>
            {year}
            <ChevronDown />
          </ListboxButton>
          <ListboxOptions className="absolute z-1 w-full rounded border border-blue-500 bg-[#171717]">
            {yearOptions.map((year, index) => (
              <ListboxOption
                key={index}
                value={year}
                className="p-1 select-none hover:cursor-pointer hover:bg-blue-500"
              >
                {year}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}
