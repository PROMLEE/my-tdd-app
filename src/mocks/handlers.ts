import { http, HttpResponse } from 'msw';

// 가짜 API 주소를 정의합니다.
// 실제 UserList 컴포넌트가 호출하는 URL과 똑같아야 합니다.
export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', () => {
        // 이 URL로 GET 요청이 오면, 아래 JSON 데이터를 돌려줍니다.
        return HttpResponse.json([
            { id: 1, name: 'Leanne Graham (MSW)' },
            { id: 2, name: 'Ervin Howell (MSW)' },
        ]);
    }),
];