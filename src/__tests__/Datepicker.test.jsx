import { getNextOrPrevMonth, getMonthInfo } from '../utils';

describe('getNextOrPrevMonth', () => {
	test('reduce month', () => {
		const [newMonth, newYear] = getNextOrPrevMonth(2023, 0, -1);
		expect(newMonth).toBe(11);
		expect(newYear).toBe(2022);
	});

	test('add a month', () => {
		const [newMonth, newYear] = getNextOrPrevMonth(2023, 11, 1);
		expect(newMonth).toBe(0);
		expect(newYear).toBe(2024);
	});
});

test('getMonthInfo', () => {
	const {
		firstDayInMonth,
		lastDayOfLastMonth,
		lastDayOfWeekLastMonth,
		lastDayOfMonth,
	} = getMonthInfo(2024, 1);

	expect(firstDayInMonth.getFullYear()).toBe(2024);
	expect(firstDayInMonth.getMonth()).toBe(1);
	expect(firstDayInMonth.getDate()).toBe(1);

	expect(lastDayOfLastMonth.getFullYear()).toBe(2024);
	expect(lastDayOfLastMonth.getMonth()).toBe(0);
	expect(lastDayOfLastMonth.getDate()).toBe(31);

	expect(lastDayOfWeekLastMonth).toBe(3);

	expect(lastDayOfMonth.getFullYear()).toBe(2024);
	expect(lastDayOfMonth.getMonth()).toBe(1);
	expect(lastDayOfMonth.getDate()).toBe(29);
});
