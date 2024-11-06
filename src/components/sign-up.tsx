'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { registerUser } from '@/lib/actions/authActions'
import { useToast } from '@/hooks/use-toast'
import { ToastAction } from './ui/toast'
import Link from 'next/link'
import { Icons } from './icons'
import { signIn } from 'next-auth/react'

const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { toast } = useToast()


  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: SignUpForm) => {
    setIsLoading(true)

    // Here you would typically send the data to your backend
    console.log(data)
    // setIsSubmitted(true)
    const result = await registerUser(data)
    if (result.status) {
      console.log(result, "result")
      toast({
        title: "Verification Email!",
        description: 'Verification email has been sent. Please check your inbox.!',
        action: <ToastAction altText="Go to SignIn">Go to SingIn</ToastAction>,
      });
      setIsLoading(false)

    } else {

      setIsLoading(false)

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: result.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
    setIsLoading(false)



  }

  // if (isSubmitted) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen bg-background">
  //       <Alert className="max-w-md">
  //         <CheckCircle2 className="h-4 w-4" />
  //         <AlertTitle>Success!</AlertTitle>
  //         <AlertDescription>
  //           Your account has been created successfully. Please check your email for verification.
  //         </AlertDescription>
  //       </Alert>
  //     </div>
  //   )
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Create your account to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="********" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account? <button onClick={() => {
              signIn()
            }} className="text-primary hover:underline">Log in</button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}