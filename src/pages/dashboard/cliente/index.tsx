import ContentDashboard from "@src/app/content/system/client/screens/ContentDashboard"
import ProtectedRoute from "@src/pages/ProtectedRoutes"

export default function DashboardPage(){
  return(
    <ProtectedRoute allowedRoles={'3'}>
      <ContentDashboard/>
    </ProtectedRoute>
 )
}
