import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

import CrmLayout from './pages/crm/CrmLayout'
import Leads from './pages/crm/Leads'
import { Customers, Suppliers, Activities, OtherClients, Closed, TransferLeads } from './pages/crm/CrmTabs'

import HrmsLayout from './pages/hrms/HrmsLayout'
import Employees from './pages/hrms/Employees'
import Attendance from './pages/hrms/Attendance'
import {
  OrgTree,
  Journeys,
  LeaveRequests,
  LeaveApproval,
  LeaveManagement,
  Payroll,
  OffDays,
  JdLibrary,
  WarningsPip,
  Training,
  Recruitment,
  ErrorCodes,
} from './pages/hrms/HrmsPages'

import Inventory from './pages/inventory/Inventory'
import Billing from './pages/billing/Billing'
import Installation from './pages/installation/Installation'
import Calendar from './pages/calendar/Calendar'
import { Tasks, Reports, Settings } from './pages/Modules'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<Dashboard />} />

        {/* CRM */}
        <Route path="crm" element={<CrmLayout />}>
          <Route index element={<Leads />} />
          <Route path="customers" element={<Customers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="activities" element={<Activities />} />
          <Route path="other-clients" element={<OtherClients />} />
          <Route path="closed" element={<Closed />} />
          <Route path="transfer-leads" element={<TransferLeads />} />
        </Route>

        {/* HRMS */}
        <Route path="hrms" element={<HrmsLayout />}>
          <Route index element={<Employees />} />
          <Route path="org-tree" element={<OrgTree />} />
          <Route path="journeys" element={<Journeys />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route path="leave-approval" element={<LeaveApproval />} />
          <Route path="leave-management" element={<LeaveManagement />} />
          <Route path="payroll" element={<Payroll />} />
          <Route path="off-days" element={<OffDays />} />
          <Route path="jd-library" element={<JdLibrary />} />
          <Route path="warnings-pip" element={<WarningsPip />} />
          <Route path="training" element={<Training />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="error-codes" element={<ErrorCodes />} />
        </Route>

        {/* Inventory */}
        <Route path="inventory" element={<Inventory />} />
        <Route path="billing" element={<Billing />} />
        <Route path="installation" element={<Installation />} />

        {/* Other top-level modules */}
        <Route path="tasks" element={<Tasks />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
