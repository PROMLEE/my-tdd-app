import { useState } from 'react';
import CountButton from './CountButton'; // [추가]

export default function Counter() {
    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(prev => prev + 1);
    };

    return (
        <div>
            <p>현재 숫자: {count}</p>

            {/* [변경] 기존 button 태그 대신 컴포넌트 사용 */}
            <CountButton label="+" onClick={handleClick} />
        </div>
    );
}