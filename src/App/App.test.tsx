import { createMockCustomer, createMockOrders } from '@/__mocks__/testData';
import { getUserOrders } from '@/utils/orderUtils';

describe('getUserOrders', () => {
  const mockOrders = createMockOrders(50);

  test('returns last 30 orders for female users', () => {
    const femaleUser = createMockCustomer('Female');

    const result = getUserOrders(femaleUser, mockOrders);

    expect(result).toHaveLength(30);
    expect(result[0].number).toBe(21);
    expect(result[29].number).toBe(50);
  });

  test('returns first 30 orders for male users', () => {
    const maleUser = createMockCustomer('Male');

    const result = getUserOrders(maleUser, mockOrders);

    expect(result).toHaveLength(30);
    expect(result[0].number).toBe(1);
    expect(result[29].number).toBe(30);
  });

  test('returns all orders when total orders less than limit', () => {
    const shortOrdersList = createMockOrders(10);
    const femaleUser = createMockCustomer('Female');

    const result = getUserOrders(femaleUser, shortOrdersList);

    expect(result).toHaveLength(10);
    expect(result[0].number).toBe(1);
  });

  test('handles empty orders array', () => {
    const user = createMockCustomer('Male');
    const result = getUserOrders(user, []);

    expect(result).toEqual([]);
  });

  test('handles non-standard gender values', () => {
    const user = createMockCustomer('Other');
    const result = getUserOrders(user, mockOrders);

    expect(result[0].number).toBe(1);
    expect(result[29].number).toBe(30);
  });
});
