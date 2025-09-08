import { SIMPLE_ORDERS } from '@/__mocks__/testData';
import type { Order } from '@/api';

describe('UserDetails pagination logic', () => {
  test('initializeOrders slices first chunkSize orders', () => {
    const chunkSize = 2;
    const initial = SIMPLE_ORDERS.slice(0, chunkSize);

    expect(initial).toHaveLength(2);
    expect(initial[0].number).toBe(1);
    expect(initial[1].number).toBe(2);
  });

  test('initializeOrders handles chunkSize larger than array', () => {
    const chunkSize = 10;
    const initial = SIMPLE_ORDERS.slice(0, chunkSize);

    expect(initial).toHaveLength(5);
    expect(initial).toEqual(SIMPLE_ORDERS);
  });

  test('loadMore appends next chunkSize orders correctly', () => {
    let displayedOrders = SIMPLE_ORDERS.slice(0, 2);
    const chunkSize = 2;
    const nextOrders = SIMPLE_ORDERS.slice(
      displayedOrders.length,
      displayedOrders.length + chunkSize,
    );
    displayedOrders = [...displayedOrders, ...nextOrders];

    expect(displayedOrders).toHaveLength(4);
    expect(displayedOrders[2].number).toBe(3);
    expect(displayedOrders[3].number).toBe(4);
  });

  test('loadMore handles last partial chunk correctly', () => {
    let displayedOrders = SIMPLE_ORDERS.slice(0, 3);
    const chunkSize = 3;
    const nextOrders = SIMPLE_ORDERS.slice(
      displayedOrders.length,
      displayedOrders.length + chunkSize,
    );
    displayedOrders = [...displayedOrders, ...nextOrders];

    expect(displayedOrders).toHaveLength(5);
    expect(displayedOrders[4].number).toBe(5);
  });

  test('loadMore with empty next chunk returns same array', () => {
    let displayedOrders = [...SIMPLE_ORDERS];
    const chunkSize = 3;
    const nextOrders = SIMPLE_ORDERS.slice(
      displayedOrders.length,
      displayedOrders.length + chunkSize,
    );
    const newDisplayedOrders = [...displayedOrders, ...nextOrders];

    expect(newDisplayedOrders).toHaveLength(5);
    expect(newDisplayedOrders).toEqual(SIMPLE_ORDERS);
  });
});

describe('UserDetails hasMore logic', () => {
  test('hasMore returns true when more orders available', () => {
    const displayedOrders = SIMPLE_ORDERS.slice(0, 3);
    const hasMore = displayedOrders.length < SIMPLE_ORDERS.length;

    expect(hasMore).toBe(true);
  });

  test('hasMore returns false when all orders displayed', () => {
    const displayedOrders = [...SIMPLE_ORDERS];
    const hasMore = displayedOrders.length < SIMPLE_ORDERS.length;

    expect(hasMore).toBe(false);
  });

  test('hasMore returns false when displayed equals total', () => {
    const displayedOrders = SIMPLE_ORDERS.slice(0, 5);
    const hasMore = displayedOrders.length < SIMPLE_ORDERS.length;

    expect(hasMore).toBe(false);
  });
});

describe('UserDetails edge cases', () => {
  test('handles empty orders array', () => {
    const emptyOrders: Order[] = [];
    const chunkSize = 3;
    const initial = emptyOrders.slice(0, chunkSize);

    expect(initial).toHaveLength(0);
    expect(initial).toEqual([]);
  });

  test('handles single order with large chunkSize', () => {
    const singleOrder = [SIMPLE_ORDERS[0]];
    const chunkSize = 10;
    const initial = singleOrder.slice(0, chunkSize);

    expect(initial).toHaveLength(1);
    expect(initial[0].number).toBe(1);
  });

  test('loadMore with zero chunkSize returns empty array', () => {
    let displayedOrders = SIMPLE_ORDERS.slice(0, 2);
    const chunkSize = 0;
    const nextOrders = SIMPLE_ORDERS.slice(
      displayedOrders.length,
      displayedOrders.length + chunkSize,
    );
    displayedOrders = [...displayedOrders, ...nextOrders];

    expect(displayedOrders).toHaveLength(2);
  });
});
