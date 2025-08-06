'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.email(),
  phone: z.string().min(10),
  password: z.string().min(6),
})

export default function RegisterPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...data,
        isActive: true,
        role: 'USER'
      }
      
      const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push('/login')
      } else {
        const errorData = await res.json()
        console.error('Registration failed:', errorData)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
      <input placeholder="First Name" {...register('firstName')} />
      <input placeholder="Last Name" {...register('lastName')} />
      <input placeholder="Email" {...register('email')} />
      <input placeholder="Phone" {...register('phone')} />
      <input placeholder="Password" type="password" {...register('password')} />
      <button type="submit">Register</button>
      <div className="text-red-500">
        {Object.values(errors).map((err: any, i) => (
          <p key={i}>{err.message}</p>
        ))}
      </div>
    </form>
  )
}
