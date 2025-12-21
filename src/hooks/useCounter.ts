import { useState } from 'react';

// [로직] 숫자를 관리하고 증가시키는 기능만 담당합니다.
export default function useCounter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prev) => prev + 1);
    };

    // 컴포넌트에서 필요한 값과 함수를 반환합니다.
    return {
        count,
        increment,
    };
}