'use client';

import { useState, useEffect } from 'react';
import PrivateRoute from '../components/PrivateRoute';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, UserPlus, User, Phone, DollarSign, Calendar, Activity, Plus } from 'lucide-react';


interface CallLog {
  id: string;
  customerName: string;
  phoneNumber: string;
  paymentAmount: number;
  dueDate: string;
  status: string;
  createdAt: string;
}

const Home: React.FC = () => {
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

  const { logout } = useAuth();

  useEffect(() => {
    // Fetch call logs from the API
    const fetchCallLogs = async () => {
      try {
        const token = getAuthToken();  // Get the token from localStorage
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/call/logs`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Use token in Authorization header
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
      const token = getAuthToken();  // Get the token from localStorage
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/call`, newCall, {
        headers: {
          Authorization: `Bearer ${token}`,  // Use token in Authorization header
        },
      });
  
      // Fetch updated call logs after adding a new one
      const response = await axios.get('/call/logs', {
        headers: {
          Authorization: `Bearer ${token}`,  // Use token in Authorization header
        },
      });
      setCallLogs(response.data);
  
      // Clear the form
      setNewCall({ customerName: '', phoneNumber: '', paymentAmount: 0, dueDate: '', language: '' });
    } catch (error) {
      console.error("Failed to add call:", error);
    }
  };
  

  return (
    <PrivateRoute>
      <div className="absolute top-4 right-4">
          <Button 
            onClick={logout}
            className="hover:bg-red-600 text-white"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      <div className="max-w-[80%] mx-auto p-6">
        <h1 className="text-3xl font-semibold text-center text-black">Welcome Back</h1>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="mx-auto my-4 block bg-black text-white hover:bg-gray-800">
              <Plus className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='mt-4 text-right'>
                <UserPlus className="inline-block mr-2 h-5 w-5" />
                Add New Call
              </AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the details of the new call.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Customer Name"
                  value={newCall.customerName}
                  onChange={(e) => setNewCall({ ...newCall, customerName: e.target.value })}
                  className="input bg-white border-gray-300 text-black pl-10"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Phone Number"
                  value={newCall.phoneNumber}
                  onChange={(e) => setNewCall({ ...newCall, phoneNumber: e.target.value })}
                  className="input bg-white border-gray-300 text-black pl-10"
                />
              </div>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="number"
                  placeholder="Payment Amount"
                  value={newCall.paymentAmount}
                  onChange={(e) => setNewCall({ ...newCall, paymentAmount: Number(e.target.value) })}
                  className="input bg-white border-gray-300 text-black pl-10"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={newCall.dueDate}
                  onChange={(e) => setNewCall({ ...newCall, dueDate: e.target.value })}
                  className="input bg-white border-gray-300 text-black pl-10"
                />
              </div>
              <Input
                type="text"
                placeholder="Language"
                value={newCall.language}
                onChange={(e) => setNewCall({ ...newCall, language: e.target.value })}
                className="input bg-white border-gray-300 text-black"
              />
            </div>

            <div className="mt-4 flex justify-end space-x-4">
              <AlertDialogCancel className="text-gray-600 hover:bg-gray-200">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleAddCall} className="bg-blue-500 text-white hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                Add Call
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <User className="inline mr-2 h-4 w-4" />
                Customer Name
              </TableHead>
              <TableHead>
                <Phone className="inline mr-2 h-4 w-4" />
                Phone Number
              </TableHead>
              <TableHead>
                <DollarSign className="inline mr-2 h-4 w-4" />
                Payment Amount
              </TableHead>
              <TableHead>
                <Calendar className="inline mr-2 h-4 w-4" />
                Due Date
              </TableHead>
              <TableHead>
                <Activity className="inline mr-2 h-4 w-4" />
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {callLogs.length > 0 ? (
              callLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>{log.customerName}</TableCell>
                  <TableCell>{log.phoneNumber}</TableCell>
                  <TableCell>{log.paymentAmount}</TableCell>
                  <TableCell>{log.dueDate}</TableCell>
                  <TableCell>{log.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500">
                  No call logs available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </PrivateRoute>
  );
};

export default Home;
