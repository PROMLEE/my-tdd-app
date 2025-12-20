import { useState } from 'react';
import CountButton from './CountButton';

export default function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(prev => prev + 1);
    };

    return (
        <div>
            <p>현재 숫자: {count}</p>
            <CountButton label="+" onClick={handleClick} />

            {/* [추가] 조건부 렌더링: count가 3보다 크거나 같으면 경고 메시지 표시 */}
            {count >= 3 && (
                <p style={{ color: 'red' }}>
                    숫자가 너무 커요!
                </p>
            )}
        </div>
    );
}