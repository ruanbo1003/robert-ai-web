'use client';

import { useCustomRedirect } from "@/app/components/RedirectTo"


export default function Home() {

    const { redirectTo } = useCustomRedirect();

    const handleRedirect = () => {
        redirectTo('/login');
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <button onClick={handleRedirect}>Go to login</button>
            </div>

        </main>
    );
}

