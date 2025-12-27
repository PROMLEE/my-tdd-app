// 데이터 타입 정의
export interface UserProfileProps {
    firstName: string;
    lastName: string;
    email: string;
}

export default function UserProfileView({ firstName, lastName, email }: UserProfileProps) {
    return (
        <div>
            <h1>{firstName} {lastName}</h1>
            <p>{email}</p>
        </div>
    );
}