import { get, post } from './http'

export const loginApi = p => post('/api/auth/login', p)