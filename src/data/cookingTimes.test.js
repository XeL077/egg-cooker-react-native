/**
 * Тесты для единственной точки расчёта времени варки: getCookingTime(doneness, size).
 * Размер и тип варки передаются в эту функцию — она единственный источник правды для таймера.
 */
import { describe, it, expect } from 'vitest';
import {
  getCookingTime,
  COOKING_TIMES,
  DEFAULT_COOKING_TIMES,
} from './cookingTimes.js';

describe('getCookingTime(doneness, size)', () => {
  describe('по умолчанию (размер не выбран)', () => {
    it('всмятку (soft) → 4 мин (240 сек)', () => {
      expect(getCookingTime('soft', null)).toBe(240);
      expect(getCookingTime('soft')).toBe(240);
    });

    it('в мешочек (medium) → 6 мин (360 сек)', () => {
      expect(getCookingTime('medium', null)).toBe(360);
      expect(getCookingTime('medium')).toBe(360);
    });

    it('вкрутую (hard) → 9 мин (540 сек)', () => {
      expect(getCookingTime('hard', null)).toBe(540);
      expect(getCookingTime('hard')).toBe(540);
    });
  });

  describe('с размером C0 (очень крупные)', () => {
    it('soft → 4.5 мин (270 сек)', () => {
      expect(getCookingTime('soft', 'C0')).toBe(270);
    });
    it('medium → 6.5 мин (390 сек)', () => {
      expect(getCookingTime('medium', 'C0')).toBe(390);
    });
    it('hard → 10 мин (600 сек)', () => {
      expect(getCookingTime('hard', 'C0')).toBe(600);
    });
  });

  describe('с размером C1 (крупные)', () => {
    it('soft → 4 мин (240 сек)', () => {
      expect(getCookingTime('soft', 'C1')).toBe(240);
    });
    it('medium → 6 мин (360 сек)', () => {
      expect(getCookingTime('medium', 'C1')).toBe(360);
    });
    it('hard → 9 мин (540 сек)', () => {
      expect(getCookingTime('hard', 'C1')).toBe(540);
    });
  });

  describe('с размером C2 (средние)', () => {
    it('soft → 3.5 мин (210 сек)', () => {
      expect(getCookingTime('soft', 'C2')).toBe(210);
    });
    it('medium → 5.5 мин (330 сек)', () => {
      expect(getCookingTime('medium', 'C2')).toBe(330);
    });
    it('hard → 8 мин (480 сек)', () => {
      expect(getCookingTime('hard', 'C2')).toBe(480);
    });
  });

  it('вкрутую всегда больше всмятку при любом размере', () => {
    const sizes = [null, 'C0', 'C1', 'C2'];
    for (const size of sizes) {
      const soft = getCookingTime('soft', size);
      const hard = getCookingTime('hard', size);
      expect(hard).toBeGreaterThan(soft);
    }
  });

  it('medium всегда между soft и hard при любом размере', () => {
    const sizes = [null, 'C0', 'C1', 'C2'];
    for (const size of sizes) {
      const soft = getCookingTime('soft', size);
      const medium = getCookingTime('medium', size);
      const hard = getCookingTime('hard', size);
      expect(medium).toBeGreaterThan(soft);
      expect(hard).toBeGreaterThan(medium);
    }
  });

  it('неизвестный размер даёт время по умолчанию для типа варки', () => {
    expect(getCookingTime('soft', 'C5')).toBe(DEFAULT_COOKING_TIMES.soft);
    expect(getCookingTime('hard', 'XX')).toBe(DEFAULT_COOKING_TIMES.hard);
  });

  it('неизвестный тип варки → fallback 360 сек', () => {
    expect(getCookingTime('unknown', null)).toBe(360);
  });
});

describe('COOKING_TIMES / DEFAULT_COOKING_TIMES соответствуют getCookingTime', () => {
  it('DEFAULT_COOKING_TIMES совпадает с getCookingTime(doneness, null)', () => {
    expect(getCookingTime('soft', null)).toBe(DEFAULT_COOKING_TIMES.soft);
    expect(getCookingTime('medium', null)).toBe(DEFAULT_COOKING_TIMES.medium);
    expect(getCookingTime('hard', null)).toBe(DEFAULT_COOKING_TIMES.hard);
  });

  it('COOKING_TIMES совпадает с getCookingTime(doneness, size)', () => {
    for (const doneness of ['soft', 'medium', 'hard']) {
      for (const size of ['C0', 'C1', 'C2']) {
        expect(getCookingTime(doneness, size)).toBe(COOKING_TIMES[doneness][size]);
      }
    }
  });
});
