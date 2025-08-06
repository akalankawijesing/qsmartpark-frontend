'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password is required' }),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginForm) => {
    setErrorMessage('')
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      sessionStorage.setItem('token', response.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage('Invalid email or password.')
      } else {
        setErrorMessage('Something went wrong. Try again.')
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-2 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full p-2 border rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}
