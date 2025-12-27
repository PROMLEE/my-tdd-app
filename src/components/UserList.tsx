import { useEffect, useState } from 'react';

interface User {
    id: number;
    name: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    // [추가] 에러 메시지를 저장할 상태
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('서버 에러가 발생했습니다.');
                }
                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                // [추가] 에러 발생 시 상태 업데이트
                setError('에러가 발생했습니다.');
                setLoading(false);
            });
    }, []);

    if (loading) return <p>불러오는 중...</p>;

    // [추가] 에러 메시지가 있으면 표시
    if (error) return <p>{error}</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}