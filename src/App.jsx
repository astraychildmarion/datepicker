import { useEffect, useState } from 'react';
import './App.css';
import { getMonthInfo, getNextOrPrevMonth } from './utils';

const thisYear = new Date().getFullYear();
const thisMonth = new Date().getMonth();
const DAYS = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat'];
const DAYS_IN_WEEK = 7;
const SATURDAY = 6;

function App() {
	const [selectedMonth, setSelectedMonth] = useState(thisMonth);
	const [displayMonth, setDisplayMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState(thisYear);
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');

	useEffect(() => {
		let nextMonth = selectedMonth + 1;
		setDisplayMonth(nextMonth);
	}, [selectedMonth]);

	useEffect(() => {
		console.log('start', start, 'end', end);
	}, [start, end]);

	const handleChangeMonth = (change) => {
		setSelectedMonth((prev) => {
			const [newMonth, newYear] = getNextOrPrevMonth(
				selectedYear,
				prev,
				change
			);
			setSelectedYear(newYear);
			return newMonth;
		});
	};
	const handleClickDay = (event, date) => {
		event.preventDefault();
		if (start === '') {
			setStart(date);
			event.target.classList.add('active');
		} else {
			if (date > start) {
				setEnd(date);
				event.target.classList.add('active');
				const days = document.querySelectorAll('.day');
				days.forEach((day) => {
					const dayDate = parseInt(day.dataset.date);
					if (dayDate >= start && dayDate <= date) {
						day.classList.add('active');
					} else {
						day.classList.remove('active');
					}
				});
			} else {
				setStart(date);
				event.target.classList.add('active');
				const days = document.querySelectorAll('.day');
				days.forEach((day) => {
					const dayDate = parseInt(day.dataset.date);
					if (dayDate >= date && dayDate <= end) {
						day.classList.add('active');
					} else {
						day.classList.remove('active');
					}
				});
			}
		}
	};

	const renderCalendarDays = (year, month) => {
		const day = new Date(year, month);
		const today = new Date();
		let cells = [];
		const weekRow = [];

		const { lastDayOfLastMonth, lastDayOfMonth } = getMonthInfo(
			year,
			month
		);

		const startEmptyDays = day.getDay();
		for (let n = 0; n < startEmptyDays; n++) {
			cells.push(
				<td className="day non-current">
					{lastDayOfLastMonth.getDate() - startEmptyDays + n + 1}
				</td>
			);
		}

		while (day.getMonth() === month) {
			const date = day.getDate();
			const isToday = day.toDateString() === today.toDateString();

			cells.push(
				<td
					className={`day ${isToday ? 'today' : 'hahah'}`}
					data-date={date}
					onClick={(event) => handleClickDay(event, date)}
				>
					{date}
				</td>
			);

			if (date === lastDayOfMonth.getDate()) {
				const emptyCells = DAYS_IN_WEEK - lastDayOfMonth.getDay();
				for (let n = 1; n < emptyCells; n++) {
					cells.push(<td className="day non-current">{n}</td>);
				}
			}
			if (
				day.getDay() % DAYS_IN_WEEK === SATURDAY ||
				date === lastDayOfMonth.getDate()
			) {
				weekRow.push(<tr>{cells}</tr>);
				cells = [];
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
			<div className="calender-wrapper">
				<div className="month-controls">
					<div
						className="month-control"
						onClick={() => handleChangeMonth(-1)}
					>
						&lt;
					</div>
					<div className="month-title">
						{selectedYear} 年 {displayMonth} 月
					</div>
					<div
						className="month-control"
						onClick={() => handleChangeMonth(1)}
					>
						&gt;
					</div>
				</div>
				<div className="day-wrapper">
					{renderCalendarDays(selectedYear, selectedMonth)}
				</div>
			</div>
		</div>
	);
}

export default App;
