
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { collection, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Appointment } from "@/types";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { format, parseISO } from "date-fns";
import { toast } from "@/components/ui/use-toast";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Fetching appointments for user:", currentUser.uid);
        
        // Fetch real appointments from Firestore
        const appointmentsRef = collection(db, "appointments");
        const q = query(
          appointmentsRef, 
          where("userId", "==", currentUser.uid),
          orderBy("date", "asc")
        );
        
        console.log("Query created:", q);
        
        const querySnapshot = await getDocs(q);
        const appointmentList: Appointment[] = [];
        
        querySnapshot.forEach((doc) => {
          console.log("Appointment doc:", doc.id, doc.data());
          appointmentList.push({ id: doc.id, ...doc.data() } as Appointment);
        });
        
        console.log("Fetched appointments:", appointmentList);
        setAppointments(appointmentList);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load appointments");
        
        // Check if the error might be related to Firebase configuration
        if (err instanceof Error) {
          if (err.message.includes("permission-denied")) {
            setError("Permission denied. Please check Firestore rules.");
          } else if (err.message.includes("not-found")) {
            setError("Firebase collection not found. Check database setup.");
          } else if (err.message.includes("invalid-argument")) {
            setError("Invalid query. Check if all fields exist in documents.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [currentUser, navigate]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      setCancelingId(appointmentId);
      
      console.log("Cancelling appointment:", appointmentId);
      
      // Update in Firestore
      await updateDoc(doc(db, "appointments", appointmentId), {
        status: "cancelled"
      });
      
      console.log("Appointment cancelled successfully");
      
      // Update local state
      setAppointments(appointments.map(appt => 
        appt.id === appointmentId 
          ? { ...appt, status: "cancelled" as const } 
          : appt
      ));
      
      toast({
        title: "Appointment Cancelled",
        description: "Your appointment has been successfully cancelled"
      });
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      toast({
        title: "Error",
        description: "Failed to cancel appointment",
        variant: "destructive"
      });
    } finally {
      setCancelingId(null);
    }
  };

  const upcomingAppointments = appointments.filter(
    appt => appt.status === "booked"
  );
  
  const pastAppointments = appointments.filter(
    appt => appt.status === "completed"
  );
  
  const cancelledAppointments = appointments.filter(
    appt => appt.status === "cancelled"
  );

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-10"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{appointment.serviceName}</CardTitle>
        <CardDescription>
          <div className="flex items-center text-gray-500">
            <Calendar className="mr-2 h-4 w-4" />
            {format(new Date(appointment.date), "MMMM d, yyyy")} at {appointment.time}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4 text-sm">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>{appointment.duration} minutes</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="mr-1 h-4 w-4" />
            <span>${appointment.price.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      {appointment.status === "booked" && (
        <CardFooter className="justify-end">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="destructive" 
                size="sm" 
                className="mr-2"
                disabled={!!cancelingId}
              >
                {cancelingId === appointment.id ? "Cancelling..." : "Cancel"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to cancel this appointment? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => handleCancelAppointment(appointment.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Confirm Cancellation
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => navigate(`/booking/${appointment.serviceId}`)}
          >
            Reschedule
          </Button>
        </CardFooter>
      )}
    </Card>
  );

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">My Appointments</h1>
        <p className="text-gray-600 mb-8">Manage your upcoming and past appointments</p>
        
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Button 
              className="bg-amber-500 hover:bg-amber-600 text-gray-900"
              onClick={() => navigate("/services")}
            >
              Book New Appointment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="upcoming">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">
              Upcoming ({upcomingAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({pastAppointments.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({cancelledAppointments.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {upcomingAppointments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No Upcoming Appointments</h3>
                <p className="text-gray-600 mb-4">You don't have any upcoming appointments scheduled.</p>
                <Button 
                  onClick={() => navigate("/services")}
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900"
                >
                  Book an Appointment
                </Button>
              </div>
            ) : (
              <div>
                {upcomingAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {pastAppointments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No Past Appointments</h3>
                <p className="text-gray-600">You don't have any past appointments.</p>
              </div>
            ) : (
              <div>
                {pastAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cancelled">
            {cancelledAppointments.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">No Cancelled Appointments</h3>
                <p className="text-gray-600">You don't have any cancelled appointments.</p>
              </div>
            ) : (
              <div>
                {cancelledAppointments.map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
