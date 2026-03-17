import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import ProtectedRoute from '@/components/ProtectedRoute'
import AdminRoute from '@/components/AdminRoute'


// Pages
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ProductsPage from '@/pages/products/ProductsPage'
import ProductDetailPage from '@/pages/products/ProductDetailPage'
import CreateListingPage from '@/pages/products/CreateListingPage'
import CheckoutPage from '@/pages/orders/CheckoutPage'
import OrderDetailPage from '@/pages/orders/OrderDetailPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage'
import NotFoundPage from '@/pages/NotFoundPage'
import SettingsPage from './pages/dashboard/SettingsPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage'
import TermsPage from '@/pages/legal/TermsPage'
import PrivacyPage from '@/pages/legal/PrivacyPage'
import HowWeVerifyPage from '@/pages/legal/HowWeVerifyPage'
import PurchaseAgreementsPage from '@/pages/legal/PurchaseAgreementsPage'
import DeliveryPolicyPage from '@/pages/legal/DeliveryPolicyPage'
import ReturnPolicyPage from '@/pages/legal/ReturnPolicyPage'
import ReportProblemPage from '@/pages/legal/ReportProblemPage'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/how-we-verify" element={<HowWeVerifyPage />} />
          <Route path="/purchase-agreements" element={<PurchaseAgreementsPage />} />
          <Route path="/delivery-policy" element={<DeliveryPolicyPage />} />
          <Route path="/return-policy" element={<ReturnPolicyPage />} />
          <Route path="/report-problem" element={<ReportProblemPage />} />


          {/* Authenticated */}
          <Route element={<ProtectedRoute />}>
            <Route path="/sell" element={<CreateListingPage />} />
            <Route path="/checkout/:productId" element={<CheckoutPage />} />
            <Route path="/orders/:id" element={<OrderDetailPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Admin only */}
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}