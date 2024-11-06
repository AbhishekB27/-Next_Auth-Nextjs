import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import React from 'react'

export default async function page() {
    const session = await getServerSession(authOptions)
    const user = session?.user
    return (
        <div>
            {
                session && session.user && <p>{user?.firstName}</p>
            }
        </div>
    )
}
