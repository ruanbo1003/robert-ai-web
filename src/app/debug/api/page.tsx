'use client';

import { TestApi } from "@/api/test"


export default function Home() {
    const { status, data: helloData, error, isFetching } = TestApi().Hello();
    console.log('hello1:', status, helloData, error, isFetching, typeof helloData)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1>{ helloData?.Hello }</h1>
            </div>

        </main>
    );
}
