import ContentDashboard from "@src/app/content/system/admin/screens/ContentDashboard"
import ProtectedRoute from "@src/pages/ProtectedRoutes"

export default function DashboardPage(){
  return(
    <ProtectedRoute allowedRoles={'1'}>
      <ContentDashboard/>
    </ProtectedRoute>
  )
}
