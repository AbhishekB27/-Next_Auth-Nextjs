interface Props {
    params: {
        token: string
    }
}
import { ResetPassword } from '@/components/reset-password'

export default function page({ params }: Props) {
    console.log(params)
    return (
        <div className='min-h-screen grid place-items-center'>
            <ResetPassword token={params.token} />
        </div>
    )
}
