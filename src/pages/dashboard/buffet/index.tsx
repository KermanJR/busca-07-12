import ContentDashboard from "@src/app/content/system/buffet/ContentDashboard"
import ProtectedRoute from "@src/pages/ProtectedRoutes"

export default function DashboardPage(){
  return(
    <ProtectedRoute allowedRoles={'2'}>
      <ContentDashboard/>
    </ProtectedRoute>
  )
}
