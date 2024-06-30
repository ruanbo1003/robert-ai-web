import { useRouter } from 'next/navigation';

export function useCustomRedirect() {
    const router = useRouter();

    const redirectTo = (path) => {
        router.push(path)
    };

    const redirectToLogin = () => {
        router.push('/login')
    }

    return { redirectTo, redirectToLogin };
}
