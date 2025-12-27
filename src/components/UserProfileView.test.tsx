import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import UserProfileView from './UserProfileView';

describe('UserProfileView UI 테스트', () => {
    test('props로 받은 이름과 이메일을 정확히 표시한다', () => {
        // 1. 가짜 데이터(Mock Data) 준비
        // API 호출 없이 우리가 원하는 데이터를 직접 주입합니다.
        const mockUser = {
            firstName: 'KIM',
            lastName: 'CHULSU',
            email: 'test@example.com'
        };

        render(<UserProfileView {...mockUser} />);

        // 2. 로그 확인
        console.log('[UI Test] 순수 컴포넌트 렌더링 확인');
        screen.debug();

        // 3. 검증
        // h1 태그 안에 이름이 들어있는지 확인
        expect(screen.getByRole('heading')).toHaveTextContent('KIM CHULSU');
        // 이메일이 문서에 존재하는지 확인
        expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
});