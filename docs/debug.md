
下面代码，为啥 Hello1 正常，Hello2 不正常？
console.log 输出分别为:
Hello1: success {Hello: 'World'} null false
Hello2: undefined undefined undefined undefined


src/api/test3.tsx
``` ts
'use client';

import { useQuery } from "@tanstack/react-query"
import axios from "axios"


function TestApi3() {

    return {
        Hello1,
        Hello2,
    }

    function Hello1() {
        return useQuery({
            queryKey: ["hello2"],
            queryFn: async () => {
                const { data } = await axios.get("http://localhost:8000/api/hello", )
                return data;
            }
        })
    }

    function Hello2() {
        return useQuery({
            queryKey: ['hello3'],
            queryFn: async () => {
                const data = (await fetch('http://localhost:8000/api/hello')).json()
                return data
            },
        })
    }
}

export { TestApi3 }

```

src/app/debug/page.tsx
```ts
'use client';

import { TestApi3 } from "@/api/test3"

export default function Home() {
    const { status, data, error, isFetching } = TestApi3().Hello1();
    console.log('Hello1:', status, data, error, isFetching)

    const { status2, data2, error2, isFetching2 } = TestApi3().Hello2();
    console.log('Hello2:', status2, data2, error2, isFetching2)


    return (
        <main className="">
            <div>
                <h1>Hello World</h1>
            </div>

        </main>
    );
}

```
