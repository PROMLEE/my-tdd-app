import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import UserList from './UserList';
// import {http, HttpResponse} from "msw";
// import {server} from "../mocks/server.ts";

describe('UserList 컴포넌트 (MSW 적용)', () => {
    // beforeEach, afterEach에서 global.fetch를 건드리는 코드가 모두 사라졌습니다!
    // setupTests.ts에서 설정한 MSW가 알아서 동작하기 때문입니다.

    test('데이터를 불러오는 동안 로딩 문구가 뜨고, 이후 데이터가 표시된다', async () => {

        // // 이 테스트 동안만 500 에러를 주도록 서버 설정을 변경합니다.
        // server.use(
        //     http.get('https://jsonplaceholder.typicode.com/users', () => {
        //         return new HttpResponse(null, { status: 500 });
        //     })
        // );

        render(<UserList />);

        console.log('[Step 1] 렌더링 직후 확인');
        // 로딩 상태 확인
        expect(screen.getByText('불러오는 중...')).toBeInTheDocument();

        console.log('[Step 2] MSW 응답 대기');

        // 데이터가 올 때까지 기다림 (MSW가 handlers.ts에 적힌 데이터를 줍니다)
        // "Leanne Graham (MSW)"는 우리가 핸들러에 적은 가짜 데이터입니다.
        const userItem = await screen.findByText('Leanne Graham (MSW)');

        console.log('[Step 3] 데이터 수신 완료');
        screen.debug();

        expect(userItem).toBeInTheDocument();
    });
});