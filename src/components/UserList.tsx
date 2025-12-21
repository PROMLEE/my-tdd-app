import { useEffect, useState } from 'react';

// 사용자 데이터 타입 정의
interface User {
    id: number;
    name: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 실제 API 호출 (테스트에서는 가짜 함수가 실행됨)
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
                setLoading(false); // 로딩 끝
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>불러오는 중...</p>;
    }

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}