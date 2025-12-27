import { useEffect, useState } from 'react';
// import UserProfileView from './UserProfileView';

export default function UserProfileContainer() {
    const [user,] = useState(null);

    useEffect(() => {
        // ... fetch 및 데이터 가공 로직 (혹은 Custom Hook 사용)
        // 여기서는 생략합니다.
    }, []);

    if (!user) return <div>로딩 중...</div>;

    // 가공된 데이터를 UI 컴포넌트에 주입
    // return <UserProfileView {...user} />;
}