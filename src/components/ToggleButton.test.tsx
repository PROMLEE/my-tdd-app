import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
// 컴포넌트는 잠시 후에 만듭니다.
import ToggleButton from "./ToggleButton";

describe('ToggleButton 리팩토링 내성 테스트', () => {

    test('버튼을 클릭하면 숨겨진 메시지가 나타나고, 다시 클릭하면 사라진다', async () => {
        const user = userEvent.setup();
        render(<ToggleButton />);

        const toggleBtn = screen.getByRole('button', { name: '토글' });

        console.log('[Step 1] 초기 상태 확인');
        // 처음에는 메시지가 없어야 합니다. (queryBy 사용)
        const hiddenMessage = screen.queryByText('짜잔! 숨겨진 메시지입니다.');
        expect(hiddenMessage).not.toBeInTheDocument();

        console.log('[Step 2] 버튼 클릭 (열기)');
        await user.click(toggleBtn);
        screen.debug(); // 화면 출력

        // 클릭 후에는 메시지가 보여야 합니다.
        expect(screen.getByText('짜잔! 숨겨진 메시지입니다.')).toBeInTheDocument();

        console.log('[Step 3] 버튼 클릭 (닫기)');
        await user.click(toggleBtn);
        screen.debug(); // 화면 출력

        // 다시 클릭하면 메시지가 사라져야 합니다.
        expect(screen.queryByText('짜잔! 숨겨진 메시지입니다.')).not.toBeInTheDocument();
    });
});