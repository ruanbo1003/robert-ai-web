'use client';

import { TestApi } from "@/api/test"


export default function Home() {
    const { status, data, error, isFetching } = TestApi().RequestForbidden();
    console.log('invalid auth:', status, data, error, isFetching)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>Hello World</h1>
            </div>

        </main>
    );
}
