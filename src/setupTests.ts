import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { beforeAll, afterEach, afterAll } from 'vitest';

// [설정] 모든 테스트가 시작되기 전에 가짜 서버를 켭니다.
beforeAll(() => server.listen());

// [정리] 각 테스트가 끝날 때마다 핸들러를 초기화합니다.
// (테스트 중간에 핸들러를 바꿨을 경우를 대비함)
afterEach(() => server.resetHandlers());

// [종료] 모든 테스트가 끝나면 서버를 끕니다.
afterAll(() => server.close());