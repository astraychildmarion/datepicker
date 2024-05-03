import { useState } from 'react';
import './App.css';

const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth() + 1;
const DAYS = ['Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat', 'Sun'];
const WEEK_DAY = 7;

function App() {
	const [selectedMonth, setSelectedMonth] = useState(thisMonth);
	const [selectedYear, setSelectedYear] = useState(thisYear);
	const [selectedDate, setSelectedDate] = useState('');

	const handleChangeMonth = (num) => {
		setSelectedMonth((prev) => {
			let newMonth = prev + num;
			let newYear = selectedYear;

			if (newMonth > 12) {
				newYear += 1;
				newMonth = 1;
			} else if (newMonth < 1) {
				newYear -= 1;
				newMonth = 12;
			}

			setSelectedYear(newYear);
			return newMonth;
		});
	};
	const setMondayFirst = (day) => {
		if (day === 0) day = 7;
		return day - 1;
	};
	const handleDay = (date) => {
		console.log('click date', date);
	};

	function getMonthInfo(year, month) {
		const nextMonthFirstDay = new Date(year, month + 1, 1);
		const lastDayOfMonth = new Date(nextMonthFirstDay - 1);
		const dayOfWeek = lastDayOfMonth.getDay();

		const firstDateOfMonth = nextMonthFirstDay.getDate();
		const firstDayOfWeek = nextMonthFirstDay.getDay();

		const lastDayOfPreviousMonth = new Date(year, month, 0);
		const daysInLastMonth = lastDayOfPreviousMonth.getDate();
		const dateLastMonth = lastDayOfPreviousMonth.getDay();

		return {
			lastDayOfMonth: lastDayOfMonth.getDate(),
			dayOfWeek: dayOfWeek,
			firstDateOfMonth: firstDateOfMonth,
			firstDayOfWeek: firstDayOfWeek,
			daysInLastMonth: daysInLastMonth,
			dateLastMonth: dateLastMonth,
		};
	}

	const createDays = (year, month) => {
		const day = new Date(year, month - 1);
		let dayCells = [];
		const weekRow = [];
		const { lastDayOfMonth, dayOfWeek, daysInLastMonth } = getMonthInfo(
			year,
			month - 1
		);
		const adjustedDay = setMondayFirst(day.getDay());
		for (let n = 0; n < adjustedDay; n++) {
			dayCells.push(
				<td className="day non-current">
					{daysInLastMonth - adjustedDay + n + 1}
				</td>
			);
		}

		while (day.getMonth() === month - 1) {
			const date = day.getDate();

			dayCells.push(
				<td className="day" onClick={() => handleDay(date)}>
					{date}
				</td>
			);
			if (date === lastDayOfMonth && dayOfWeek !== 0) {
				const emptyCells = WEEK_DAY - dayOfWeek;
				for (let n = 1; n <= emptyCells; n++) {
					dayCells.push(<td className="day non-current">{n}</td>);
				}
			}

			if (
				setMondayFirst(day.getDay()) % 7 === 6 ||
				date === new Date(year, month, 0).getDate()
			) {
				weekRow.push(<tr>{dayCells}</tr>);
				dayCells = [];
			}
			day.setDate(date + 1);
		}

		return (
			<table>
				<thead>
					<tr>
						{DAYS.map((day) => (
							<th key={day}>{day}</th>
						))}
					</tr>
				</thead>
				<tbody>{weekRow}</tbody>
			</table>
		);
	};

	return (
		<div className="App">
			<div className="calender_wrapper">
				<div className="month_wrapper">
					<div
						className="month_previous"
						onClick={() => handleChangeMonth(-1)}
					>
						&lt;
					</div>
					<div className="month_current">
						{selectedYear} 年 {selectedMonth} 月
					</div>
					<div
						className="month_next"
						onClick={() => handleChangeMonth(1)}
					>
						&gt;
					</div>
				</div>
				<div className="day_wrapper">
					{createDays(selectedYear, selectedMonth)}
				</div>
			</div>
		</div>
	);
}

export default App;
