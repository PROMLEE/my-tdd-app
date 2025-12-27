import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect } from 'vitest';
// 아직 컴포넌트가 없으므로 import 에러가 날 수 있습니다.
import LoginForm from './LoginForm';

describe('LoginForm 컴포넌트 동작 테스트', () => {

    test('이메일과 비밀번호를 입력하고 제출하면 onSubmit이 호출된다', async () => {
        const user = userEvent.setup();
        // 폼 제출 성공 여부를 확인하기 위한 가짜 함수(Mock Function)
        const handleSubmit = vi.fn();

        render(<LoginForm onSubmit={handleSubmit} />);

        const emailInput = screen.getByLabelText('이메일');
        const passwordInput = screen.getByLabelText('비밀번호');
        const submitBtn = screen.getByRole('button', { name: '로그인' });

        console.log('[Step 1] 입력 전 상태 확인');
        screen.debug(emailInput); // 입력창 상태만 따로 출력해 봅니다.

        console.log('[Step 2] 텍스트 입력 시뮬레이션');
        // 사용자가 타자를 치는 동작 (비동기)
        await user.type(emailInput, 'test@example.com');
        await user.type(passwordInput, 'password123');

        // 입력값이 제대로 들어갔는지 검증 (value 속성 확인)
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password123');

        console.log('[Step 3] 로그인 버튼 클릭');
        await user.click(submitBtn);

        // handleSubmit 함수가 정확한 인자(입력한 값)와 함께 1번 호출되었는지 검증
        expect(handleSubmit).toHaveBeenCalledTimes(1);
        expect(handleSubmit).toHaveBeenCalledWith({
            email: 'test@example.com',
            password: 'password123',
        });
    });

    test('빈 값으로 제출하면 에러 메시지가 표시되고 onSubmit은 호출되지 않는다', async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<LoginForm onSubmit={handleSubmit} />);
        const submitBtn = screen.getByRole('button', { name: '로그인' });

        console.log('[Step 4] 빈 값으로 제출 시도');
        await user.click(submitBtn);

        console.log('[Step 5] 에러 메시지 렌더링 확인');
        screen.debug();

        // 에러 메시지가 화면에 나타났는지 확인
        expect(screen.getByText('이메일을 입력하세요')).toBeInTheDocument();
        expect(screen.getByText('비밀번호를 입력하세요')).toBeInTheDocument();

        // 에러가 났으므로 제출 함수는 호출되지 않아야 함
        expect(handleSubmit).not.toHaveBeenCalled();
    });
});