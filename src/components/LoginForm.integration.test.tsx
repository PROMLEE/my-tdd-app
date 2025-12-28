import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect } from 'vitest';
import LoginForm from './LoginForm';

describe('로그인 폼 통합 테스트', () => {
    test('사용자가 이메일을 입력하고 로그인 버튼을 누르는 전체 흐름', async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        render(<LoginForm onSubmit={handleSubmit} />);

        // [통합] 여러 요소(Input, Button)가 상호작용합니다.
        const emailInput = screen.getByLabelText('이메일');
        const passwordInput = screen.getByLabelText('비밀번호');
        const submitBtn = screen.getByRole('button', { name: '로그인' });

        console.log('[Integration] 사용자 입력 시뮬레이션');
        await user.type(emailInput, 'user@test.com');
        await user.type(passwordInput, '1234');

        console.log('[Integration] 버튼 클릭');
        await user.click(submitBtn);

        // 검증 로직과 상태 관리가 잘 통합되어 작동했는지 확인
        expect(handleSubmit).toHaveBeenCalledWith({
            email: 'user@test.com',
            password: '1234'
        });
    });
});