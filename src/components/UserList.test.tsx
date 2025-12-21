import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { http, HttpResponse } from 'msw'; // MSW 모듈 import
import { server } from '../mocks/server'; // 가짜 서버 import
import UserList from './UserList';

describe('UserList 컴포넌트 (MSW 적용)', () => {

    test('데이터를 불러오는 동안 로딩 문구가 뜨고, 이후 데이터가 표시된다', async () => {
        render(<UserList />);

        console.log('[Test 1] 로딩 상태 확인');
        expect(screen.getByText('불러오는 중...')).toBeInTheDocument();

        console.log('[Test 1] MSW 정상 응답 대기');
        // handlers.ts에 정의한 "Leanne Graham (MSW)" 데이터가 오길 기다립니다.
        const userItem = await screen.findByText('Leanne Graham (MSW)');

        console.log('[Test 1] 데이터 수신 완료');
        screen.debug();

        expect(userItem).toBeInTheDocument();
    });

    // [추가] 에러 상황 테스트
    test('서버 에러 발생 시 에러 문구가 표시된다', async () => {
        // 1. 이 테스트 동안만 서버가 500 에러를 뱉도록 설정을 덮어씁니다(Override).
        server.use(
            http.get('https://jsonplaceholder.typicode.com/users', () => {
                return new HttpResponse(null, { status: 500 });
            })
        );

        render(<UserList />);

        console.log('[Test 2] 로딩 상태 확인');
        expect(screen.getByText('불러오는 중...')).toBeInTheDocument();

        console.log('[Test 2] 에러 발생 대기');

        // 2. 컴포넌트가 에러를 감지하고 "에러가 발생했습니다."를 띄울 때까지 기다립니다.
        const errorMsg = await screen.findByText('에러가 발생했습니다.');

        console.log('[Test 2] 에러 UI 렌더링 확인');
        screen.debug();

        expect(errorMsg).toBeInTheDocument();
    });
});