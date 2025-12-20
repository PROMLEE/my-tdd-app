import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// Counter 컴포넌트는 아직 없지만 import 합니다 (에러 발생 예정)
import Counter from './Counter';

describe('Counter 컴포넌트 동작 테스트', () => {

    test('초기값은 0이며, + 버튼을 누르면 숫자가 1 증가한다', async () => {
        // 1. User Event 설정 (사용자의 동작을 시뮬레이션하는 객체)
        const user = userEvent.setup();

        // 2. 렌더링 (아직 컴포넌트가 없어서 여기서 빨간 줄이 뜹니다)
        render(<Counter />);

        // 3. 요소 찾기 (쿼리)
        // "현재 숫자: 0"이라는 텍스트가 있는지 확인
        const initialText = screen.getByText('현재 숫자: 0');
        // "+" 라는 이름을 가진 버튼(role=button) 찾기
        const incrementBtn = screen.getByRole('button', { name: '+' });

        // 4. 초기 상태 검증
        expect(initialText).toBeInTheDocument();
        expect(incrementBtn).toBeInTheDocument();

        // 5. 사용자 행동 (클릭)
        await user.click(incrementBtn);

        // 6. 결과 검증
        // 클릭 후에는 "현재 숫자: 1"이 화면에 보여야 함
        expect(screen.getByText('현재 숫자: 1')).toBeInTheDocument();
        screen.debug()
    });
});