import { Navigate } from 'react-router'
import PageLoader from '../components/PageLoader'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) return <PageLoader />
  if (!session) return <Navigate to="/login" replace />
  return children
}
