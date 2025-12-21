import CountButton from './CountButton';
import useCounter from '../hooks/useCounter'; // Hook import

export default function Counter() {
    // [수정] 직접 useState를 쓰지 않고 Hook을 사용합니다.
    const { count, increment } = useCounter();

    return (
        <div>
            <p>현재 숫자: {count}</p>
            {/* 함수 이름이 handleClick에서 increment로 바뀌었음에 주의하세요 */}
            <CountButton label="+" onClick={increment} />

            {count >= 3 && (
                <p style={{ color: 'red' }}>
                    숫자가 너무 커요!
                </p>
            )}
        </div>
    );
}