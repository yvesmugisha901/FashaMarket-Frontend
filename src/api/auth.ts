import api from './axios'
import type { AuthResponse, LoginInput, RegisterInput, User } from '@/types'

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/login', data)
    return res.data
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>('/auth/register', data)
    return res.data
  },

  me: async (): Promise<User> => {
    const res = await api.get<{ data: User }>('/auth/me')
    return res.data.data
  },
}