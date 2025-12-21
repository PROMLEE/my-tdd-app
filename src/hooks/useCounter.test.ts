import { renderHook, act } from '@testing-library/react';
import useCounter from './useCounter';
import { describe, test, expect } from 'vitest';

describe('useCounter Hook 동작 테스트', () => {

    test('초기값은 0이며, increment 함수를 호출하면 값이 1 증가한다', () => {
        // 1. Hook 렌더링 (가상 환경)
        const { result } = renderHook(() => useCounter());

        console.log(`[Step 1] 초기값 확인: ${result.current.count}`);

        // 초기값 검증
        expect(result.current.count).toBe(0);

        // 2. 상태 변경 (act 사용 필수!)
        console.log('[Step 2] increment 함수 실행');
        act(() => {
            result.current.increment();
        });

        console.log(`[Step 3] 변경된 값 확인: ${result.current.count}`);

        // 3. 결과 검증
        expect(result.current.count).toBe(1);
    });
});