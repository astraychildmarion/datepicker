export const getMonthInfo = (year, month) => {
	const firstDayInMonth = new Date(year, month);
	const lastDayOfLastMonth = new Date(firstDayInMonth - 1);
	const lastDayOfMonth = new Date(year, month + 1, 0);

	return {
		firstDayInMonth: firstDayInMonth,
		lastDayOfLastMonth: lastDayOfLastMonth,
		lastDayOfWeekLastMonth: lastDayOfLastMonth.getDay(),
		lastDayOfMonth: lastDayOfMonth,
	};
};

export const getNextOrPrevMonth = (year, month, increment) => {
	const newMonth = month + increment;
	const newYear = newMonth < 0 ? year - 1 : newMonth >= 12 ? year + 1 : year;
	const adjustedMonth = (newMonth + 12) % 12;
	console.log(adjustedMonth, newYear);
	return [adjustedMonth, newYear];
};
