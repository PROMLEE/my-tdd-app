// import { useState } from 'react';
//
// export default function ToggleButton() {
//     // 상태 이름을 'show'라고 지었습니다.
//     const [show, setShow] = useState(false);
//
//     const toggle = () => {
//         setShow((prev) => !prev);
//     };
//
//     return (
//         <div>
//             <button onClick={toggle}>토글</button>
//             {/* show 상태가 true일 때만 메시지 표시 */}
//             {show && <p>짜잔! 숨겨진 메시지입니다.</p>}
//         </div>
//     );
// }

import { useState } from 'react';

// [리팩토링] 로직을 커스텀 훅으로 분리하고 변수명을 바꿉니다.
function useToggle(initialValue = false) {
    // 변수명 변경: show -> isVisible
    const [isVisible, setIsVisible] = useState(initialValue);
    const toggle = () => setIsVisible(v => !v);
    return { isVisible, toggle };
}

export default function ToggleButton() {
    // 기존 useState 코드를 삭제하고 훅을 사용합니다.
    const { isVisible, toggle } = useToggle();

    return (
        <div>
            <button onClick={toggle}>토글</button>
            {/* 변수명이 바뀌었지만 화면에 그리는 결과물은 똑같습니다 */}
            {isVisible && <p>짜잔! 숨겨진 메시지입니다.</p>}
        </div>
    );
}