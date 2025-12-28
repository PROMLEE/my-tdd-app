import { describe, it, expect } from 'vitest';
import { add, formatPrice } from './calculator';

describe('계산기 유틸리티 단위 테스트', () => {
    it('두 숫자를 더한다', () => {
        const result = add(1, 2);
        console.log(`[Unit] add(1, 2) 결과: ${result}`);
        expect(result).toBe(3);
    });

    it('숫자를 금액 포맷으로 변환한다', () => {
        const result = formatPrice(10000);
        console.log(`[Unit] formatPrice(10000) 결과: ${result}`);
        expect(result).toBe('10,000원');
    });
});