import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// 위에서 만든 핸들러들을 묶어서 가짜 서버를 생성합니다.
export const server = setupServer(...handlers);