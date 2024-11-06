import { SignInForm } from '@/components/sign-in'
import React from 'react'
interface Props {
    searchParams: {
        callbackUrl: string
    }
}

export default function page({ searchParams }: Props) {
    console.log(searchParams)
    return (
        <div>
            <SignInForm callbackUrl={searchParams?.callbackUrl} />
        </div>
    )
}
