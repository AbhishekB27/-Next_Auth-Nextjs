import { EmailVerification } from '@/components/verify-email'
import React from 'react'
interface Props {
  params: {
    token: string
  }
}
export default function page({ params }: Props) {
  return (
    <div><EmailVerification /></div>
  )
}
