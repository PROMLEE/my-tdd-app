import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter 컴포넌트 동작 테스트', () => {

    // [기존 테스트]
    test('초기값은 0이며, + 버튼을 누르면 숫자가 1 증가한다', async () => {
        const user = userEvent.setup();
        render(<Counter />);

        const initialText = screen.getByText('현재 숫자: 0');
        const incrementBtn = screen.getByRole('button', { name: '+' });

        expect(initialText).toBeInTheDocument();
        expect(incrementBtn).toBeInTheDocument();

        await user.click(incrementBtn);

        expect(screen.getByText('현재 숫자: 1')).toBeInTheDocument();
    });

    // [신규 테스트] 조건부 렌더링 검증
    test('숫자가 3 이상이 되면 경고 문구가 나타난다', async () => {
        const user = userEvent.setup();
        render(<Counter />);

        const incrementBtn = screen.getByRole('button', { name: '+' });

        console.log('[Step 1] 초기 상태 확인');
        // 아직은 경고 문구가 없어야 합니다.
        // getByText는 찾는 요소가 없으면 에러를 내므로, 없을 때를 확인할 때는 queryByText를 씁니다.
        const warningMsg = screen.queryByText('숫자가 너무 커요!');
        expect(warningMsg).not.toBeInTheDocument();

        console.log('[Step 2] 버튼 3번 클릭 시작');

        // 버튼을 3번 클릭합니다.
        for (let i = 1; i <= 3; i++) {
            await user.click(incrementBtn);
            console.log(`  -> 클릭 ${i}회 완료`);
        }

        console.log('[Step 3] 클릭 후 화면 상태 디버깅');
        // 이 시점의 HTML 구조를 터미널에 출력합니다. 경고 문구가 있는지 눈으로 확인해보세요.
        screen.debug();

        // 이제 경고 문구가 보여야 합니다.
        expect(screen.getByText('숫자가 너무 커요!')).toBeInTheDocument();
    });
});