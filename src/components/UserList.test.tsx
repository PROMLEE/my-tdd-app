import { render, screen } from '@testing-library/react';
import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
// 아직 UserList 컴포넌트가 없으므로 import 에러가 날 수 있습니다.
import UserList from './UserList';

describe('UserList 컴포넌트 비동기 테스트', () => {

    // [설정] 테스트 전에 가짜 fetch 함수를 만듭니다.
    beforeEach(() => {
        // global.fetch를 스파이(Spy)로 심어서 가로챕니다.
        // 실제 서버 대신 우리가 정의한 가짜 데이터(JSON)를 반환하도록 합니다.
        global.fetch = vi.fn().mockResolvedValue({
            json: async () => [
                { id: 1, name: 'Leanne Graham' },
                { id: 2, name: 'Ervin Howell' },
            ],
        });
    });

    // [정리] 테스트가 끝나면 가짜 함수를 초기화합니다.
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test('데이터를 불러오는 동안 로딩 문구가 뜨고, 이후 데이터가 표시된다', async () => {
        render(<UserList />);

        console.log('[Step 1] 렌더링 직후 확인');
        screen.debug();

        // 1. 로딩 상태 확인 (동기)
        // 렌더링 되자마자 바로 보여야 하므로 getBy를 씁니다.
        expect(screen.getByText('불러오는 중...')).toBeInTheDocument();

        console.log('[Step 2] 데이터 수신 대기');

        // 2. 데이터 표시 확인 (비동기)
        // 데이터는 나중에 뜨므로 getBy를 쓰면 에러가 납니다.
        // findBy는 요소가 나타날 때까지(기본 1초) 기다려줍니다.
        const userItem = await screen.findByText('Leanne Graham');

        console.log('[Step 3] 데이터 수신 완료 후 디버깅');
        screen.debug();

        expect(userItem).toBeInTheDocument();
    });
});