import { useState } from 'react';

interface LoginFormProps {
    onSubmit: (data: { email: string; password: string }) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // 에러 상태 관리 (초기값은 빈 객체)
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 폼의 기본 동작(새로고침) 방지

        // 유효성 검사 로직
        const newErrors: { email?: string; password?: string } = {};
        if (!email) newErrors.email = '이메일을 입력하세요';
        if (!password) newErrors.password = '비밀번호를 입력하세요';

        // 에러가 하나라도 있으면 제출 중단
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // 검사 통과 시 에러 초기화 및 데이터 전송
        setErrors({});
        onSubmit({ email, password });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {/* 라벨과 인풋을 연결하기 위해 htmlFor와 id를 일치시킵니다 */}
                <label htmlFor="email">이메일</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {/* 에러가 있으면 빨간색 문구 표시 */}
                {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            </div>

            <button type="submit">로그인</button>
        </form>
    );
}