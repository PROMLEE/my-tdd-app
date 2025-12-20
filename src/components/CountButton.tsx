// Props 타입을 정의하여 TypeScript의 장점을 살립니다.
interface Props {
    label: string;
    onClick: () => void;
}

export default function CountButton({ label, onClick }: Props) {
    return (
        <button type="button" onClick={onClick}>
            {label}
        </button>
    );
}