'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { CheckCircle, XCircle, Loader2, LoaderCircleIcon, Loader, Loader2Icon, LoaderPinwheel } from 'lucide-react'
import { activateUser } from '@/lib/actions/authActions'

export function EmailVerification() {
  const params = useParams()
  const router = useRouter()
  const [verificationState, setVerificationState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const verifyEmail = async () => {
    setVerificationState('loading')
    const token = params.token as string
    try {
      const result = await activateUser(token)
      console.log(result, "result")
      if (result === 'success') {
        setVerificationState('success')
        setMessage('Your email has been successfully verified!')
      } else if (result === 'alreadyActivated') {
        setVerificationState('success')
        setMessage('This email has already been verified.')
      }
      else {
        setVerificationState('error')
        setMessage('Invalid or expired token. Please request a new verification email.')
      }
    } catch (error) {
      setVerificationState('error')
      setMessage('An error occurred during verification. Please try again.')
    }
  }

  const handleReturnHome = () => {
    router.push('/')
  }

  const handleResendEmail = async () => {
    try {

      if (0) {
        setMessage('A new verification email has been sent. Please check your inbox.')
      } else {
        setMessage('Failed to resend verification email. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Email Verification</CardTitle>
          <CardDescription className="text-center">
            Click the button below to verify your email address
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          {verificationState === 'loading' && (
            <Loader className="h-10 w-10 animate-spin text-primary" />
          )}
          {verificationState === 'success' && (
            <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-900/20">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
              <AlertTitle className="text-green-800 dark:text-green-300">Success</AlertTitle>
              <AlertDescription className="text-green-700 dark:text-green-400">
                {message}
              </AlertDescription>
            </Alert>

          )}
          {verificationState === 'error' && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {verificationState === 'idle' && (
            <Button onClick={verifyEmail} className="w-full">
              Verify Email
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant='secondary' onClick={handleReturnHome} className="w-full font-medium">
            Return to Home
          </Button>
          {verificationState === 'error' && (
            <Button

              // onClick={handleResendEmail}

              variant="outline" className="w-full relative overflow-hidden before:content-['Comming_Soon...'] before:overflow-hidden before:grid before:place-items-center before:absolute before:bg-inherit before:bottom-0 before:w-full before:h-[0%] hover:before:h-[100%] before:z-50 before:transition-all ">
              Resend Verification Email
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}