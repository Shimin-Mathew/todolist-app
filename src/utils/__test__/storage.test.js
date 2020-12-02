import * as storage from '../storage';
import { sampleTodos, sampleVisitFrequency, visitFQWithFirstIncrd } from 'utils/__mocks__/dummyData';

jest.unmock('utils/storage');

let expectedForEmpty = {};
Object.keys(sampleVisitFrequency).forEach(key => expectedForEmpty[key] = 1);

Object.defineProperty(window, 'localStorage', {
	value: {
		getItem: jest.fn(),
		setItem: jest.fn()
	}
});

const visits = 'visits';
const visitFqStr = JSON.stringify(sampleVisitFrequency);

describe('utils/storage', () => {
	test('loadTodos', () => {
		const sample = [12, 13, 45];
		window.localStorage.getItem.mockImplementationOnce(() => JSON.stringify(sample));

		expect(storage.loadTodos()).toStrictEqual(sample);
	});

	test.each([
		[visitFqStr, visitFqStr],
		[null, JSON.stringify(expectedForEmpty)]
	])('initVisitCounters', (dummyFqCount, dummyFinal) => {
		window.localStorage.getItem.mockImplementation((key) => (
			key === visits? dummyFqCount: 
				key === 'todos'? JSON.stringify(sampleTodos): '')
		);
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.initVisitCounters();

		expect(window.localStorage.setItem).toBeCalledWith(visits, dummyFinal);
	});

	test('increaseCount', () => {
		const firstDummyTodo = sampleTodos[0].id;
		window.localStorage.getItem.mockReturnValue(visitFqStr);
		window.localStorage.setItem.mockImplementation((_key, _data) => undefined);
		storage.increaseCount(firstDummyTodo);

		expect(window.localStorage.setItem).toBeCalledWith(visits, JSON.stringify(visitFQWithFirstIncrd));
	});

	test.skip('getMostVisited', () => {});
});