import { parseISO } from 'date-fns';
import { describe, expect, test } from 'vitest';

import {
  calculateCurrentPeriodCycle,
  predictFertileWindowForCurrentCycle,
  predictNextPeriod,
} from '../period-utils';

describe('calculateCurrentPeriodCycle', () => {
  test('returns null for empty or invalid date', () => {
    expect(calculateCurrentPeriodCycle()).toBeNull();
    expect(calculateCurrentPeriodCycle(new Date('invalid date'))).toBeNull();
  });

  test('returns null for future date', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    expect(calculateCurrentPeriodCycle(futureDate)).toBeNull();
  });

  test('returns 1 for today as the start date', () => {
    const today = new Date();
    const utcIsoDate = today.toISOString();
    const parsedDate = parseISO(utcIsoDate);
    expect(calculateCurrentPeriodCycle(parsedDate)).toBe(1);
  });
});

describe('predictNextPeriod', () => {
  test('returns null for invalid lastPeriodStartDate', () => {
    expect(
      predictNextPeriod({ lastPeriodStartDate: new Date('invalid date') }),
    ).toBeNull();
  });

  test('returns startDate and endDate for valid lastPeriodStartDate', () => {
    expect(
      predictNextPeriod({
        lastPeriodStartDate: new Date('2025-08-01T14:00:00.000Z'),
      }),
    ).toStrictEqual({
      startDate: new Date('2025-08-29T14:00:00.000Z'),
      endDate: new Date('2025-09-02T14:00:00.000Z'),
    });
  });
});

describe('predictFertileWindowForCurrentCycle', () => {
  test('returns null for invalid nextPeriodStartDate', () => {
    expect(
      predictFertileWindowForCurrentCycle({
        nextPeriodStartDate: new Date('invalid date'),
      }),
    ).toBeNull();
  });

  test('returns startDate and endDate for valid nextPeriodStartDate', () => {
    expect(
      predictFertileWindowForCurrentCycle({
        nextPeriodStartDate: new Date('2025-08-29T14:00:00.000Z'),
      }),
    ).toStrictEqual({
      startDate: new Date('2025-08-10T14:00:00.000Z'),
      endDate: new Date('2025-08-15T14:00:00.000Z'),
    });
  });
});
