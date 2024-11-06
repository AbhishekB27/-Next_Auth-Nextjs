'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { forgotPassword } from '@/lib/actions/authActions'
import Link from 'next/link'

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type FormData = z.infer<typeof schema>

export function ForgotPasswordEmail() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {

      setIsLoading(true)
      // Simulate API call
      await forgotPassword(data.email)
      setIsLoading(false)
      setIsSuccess(true)
      // In a real application, you would send the reset email here
      console.log('Reset email sent to:', data.email)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="email">Email</Label>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      disabled={isLoading || isSuccess}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isSuccess}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <Link className='mt-2' href='/signin'>
              <Button className='w-full' type='button' variant='ghost'>Back to Login</Button>
            </Link>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        {isSuccess && (
          <Alert className="mt-4">
            <AlertDescription>
              If an account exists for {form.getValues().email}, you will receive a password reset email shortly.
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  )
}