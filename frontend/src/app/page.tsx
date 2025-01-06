/* eslint-disable react/no-unescaped-entities */
'use client';

import { Suspense, useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Bell, 
  Search,
  UserPlus,
  User,
  Phone,
  DollarSign,
  Calendar,
  Activity,
  Plus,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from '@/components/ui/input'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import axios from 'axios'
import Sidebar from '@/components/Sidebar'
import StatsGrid from '@/components/Infosnacks'
import UserGreetingFallback from '@/components/UserGreetingFallback'
import LogoutButton from '@/components/LogoutButton'
import PrivateRoute from '@/components/PrivateRoute'

interface CallLog {
  id: string;
  customerName: string;
  phoneNumber: string;
  paymentAmount: number;
  dueDate: string;
  status: string;
  createdAt: string;
}

function UserGreeting() {
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [newCall, setNewCall] = useState({
    customerName: '',
    phoneNumber: '',
    paymentAmount: 0,
    dueDate: '',
    language: '',
  });

  const getAuthToken = () => {
    return localStorage.getItem('authToken') || ''; 
  };

  useEffect(() => {
    const fetchCallLogs = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/call/logs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCallLogs(response.data);
      } catch (error) {
        console.error("Failed to fetch call logs:", error);
      }
    };    
    
    fetchCallLogs();
  }, []);

  const handleAddCall = async () => {
    try {
      const token = getAuthToken();
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/call`, newCall, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const response = await axios.get('/call/logs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCallLogs(response.data);
  
      setNewCall({ customerName: '', phoneNumber: '', paymentAmount: 0, dueDate: '', language: '' });
    } catch (error) {
      console.error("Failed to add call:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      
      <div className="flex-1 bg-gradient-to-br from-blue-950 via-blue-900 to-blue-950">
        <div className="h-16 border-b border-amber-200/10 flex items-center justify-between px-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-amber-100/80 hover:text-amber-100">
              <Search className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-amber-100/80 hover:text-amber-100">
              <Bell className="h-5 w-5" />
            </Button>
            <LogoutButton />
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-amber-100">Welcome back</h1>
            <p className="text-amber-200/60 mt-1">Here's what's happening with your calls.</p>
          </div>

          <StatsGrid stats={['Total calls', 'More data', 'More data', 'More data']} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="mb-4 bg-blue-900/40 text-amber-100 hover:bg-blue-800">
                <Plus className="h-4 w-4 mr-2" />
                New Call
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-blue-900 border-amber-200/10">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-amber-100">
                  <UserPlus className="inline-block mr-2 h-5 w-5" />
                  Add New Call
                </AlertDialogTitle>
                <AlertDialogDescription className="text-amber-200/60">
                  Fill in the details of the new call.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-200/60" />
                  <Input
                    type="text"
                    placeholder="Customer Name"
                    value={newCall.customerName}
                    onChange={(e) => setNewCall({ ...newCall, customerName: e.target.value })}
                    className="bg-blue-950/50 border-amber-200/20 text-amber-100 pl-10"
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-200/60" />
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    value={newCall.phoneNumber}
                    onChange={(e) => setNewCall({ ...newCall, phoneNumber: e.target.value })}
                    className="bg-blue-950/50 border-amber-200/20 text-amber-100 pl-10"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-200/60" />
                  <Input
                    type="number"
                    placeholder="Payment Amount"
                    value={newCall.paymentAmount}
                    onChange={(e) => setNewCall({ ...newCall, paymentAmount: Number(e.target.value) })}
                    className="bg-blue-950/50 border-amber-200/20 text-amber-100 pl-10"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-200/60" />
                  <Input
                    type="date"
                    value={newCall.dueDate}
                    onChange={(e) => setNewCall({ ...newCall, dueDate: e.target.value })}
                    className="bg-blue-950/50 border-amber-200/20 text-amber-100 pl-10"
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Language"
                  value={newCall.language}
                  onChange={(e) => setNewCall({ ...newCall, language: e.target.value })}
                  className="bg-blue-950/50 border-amber-200/20 text-amber-100"
                />
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                <AlertDialogCancel className="text-amber-200/60 hover:bg-blue-800">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAddCall} className="bg-blue-800 text-amber-100 hover:bg-blue-700">
                  Add Call
                </AlertDialogAction>
              </div>
            </AlertDialogContent>
          </AlertDialog>

          <div className="grid grid-cols-1 gap-6">
            <Card className="bg-blue-900/40 border-amber-200/10">
              <CardHeader>
                <CardTitle className="text-amber-100">Call Logs</CardTitle>
                <CardDescription className="text-amber-200/60">Recent call history and details</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-amber-200/10">
                      <TableHead className="text-amber-100">
                        <User className="inline mr-2 h-4 w-4" />
                        Customer Name
                      </TableHead>
                      <TableHead className="text-amber-100">
                        <Phone className="inline mr-2 h-4 w-4" />
                        Phone Number
                      </TableHead>
                      <TableHead className="text-amber-100">
                        <DollarSign className="inline mr-2 h-4 w-4" />
                        Payment Amount
                      </TableHead>
                      <TableHead className="text-amber-100">
                        <Calendar className="inline mr-2 h-4 w-4" />
                        Due Date
                      </TableHead>
                      <TableHead className="text-amber-100">
                        <Activity className="inline mr-2 h-4 w-4" />
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {callLogs.length > 0 ? (
                      callLogs.map((log) => (
                        <TableRow key={log.id} className="border-amber-200/10">
                          <TableCell className="text-amber-100">{log.customerName}</TableCell>
                          <TableCell className="text-amber-100">{log.phoneNumber}</TableCell>
                          <TableCell className="text-amber-100">{log.paymentAmount}</TableCell>
                          <TableCell className="text-amber-100">{log.dueDate}</TableCell>
                          <TableCell className="text-amber-100">{log.status}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-amber-200/60">
                          No call logs available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <PrivateRoute>
      <Suspense fallback={<UserGreetingFallback />}>
        <UserGreeting />
      </Suspense>
    </PrivateRoute>
  );
}