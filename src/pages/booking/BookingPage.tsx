
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useServices } from "@/hooks/useServices";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { TimeSlot } from "@/types";

export default function BookingPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const { getServiceById } = useServices();
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const service = serviceId ? getServiceById(serviceId) : undefined;

  // Redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to book an appointment",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Redirect if service not found
  useEffect(() => {
    if (!service && !serviceId) {
      navigate("/services");
    }
  }, [service, serviceId, navigate]);

  // Generate available time slots
  const getAvailableTimeSlots = (): TimeSlot[] => {
    // In a real application, this would fetch from the database based on the selected date
    // and check against existing appointments
    const times = [];
    for (let hour = 10; hour < 19; hour++) {
      // Skip lunch break
      if (hour !== 13) {
        times.push({
          time: `${hour}:00`,
          available: true
        });
        times.push({
          time: `${hour}:30`,
          available: Math.random() > 0.3 // Randomly make some slots unavailable for demo
        });
      }
    }
    return times;
  };

  const timeSlots = selectedDate ? getAvailableTimeSlots() : [];

  const handleSubmit = async () => {
    if (!currentUser || !service || !selectedDate || !selectedTime) {
      toast({
        title: "Booking Error",
        description: "Please select all required booking information",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // Format date for Firestore
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      
      // Create new appointment in Firestore
      const appointmentData = {
        userId: currentUser.uid,
        serviceId: service.id,
        serviceName: service.name,
        date: formattedDate,
        time: selectedTime,
        duration: service.duration,
        price: service.price,
        status: 'booked',
        createdAt: new Date().toISOString()
      };

      console.log("Adding appointment to Firestore:", appointmentData);
      
      // Add the document to Firestore
      const docRef = await addDoc(collection(db, "appointments"), appointmentData);
      console.log("Appointment added with ID:", docRef.id);

      toast({
        title: "Booking Successful",
        description: "Your appointment has been booked!",
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast({
        title: "Booking Failed",
        description: "There was an error booking your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!service) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="h-80 bg-gray-300 rounded w-full max-w-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Book Your Appointment</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Service Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <img 
                  src={service.imageUrl} 
                  alt={service.name} 
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold">{service.name}</h3>
                <p className="text-gray-600">{service.description}</p>
                <div className="flex justify-between text-sm text-gray-600 pt-2">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{service.duration} mins</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSign size={16} className="mr-1" />
                    <span>${service.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Booking Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Date Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Select date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      disabled={(date) => {
                        // Disable past dates, Sundays, and dates more than 30 days in the future
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const thirtyDaysFromNow = new Date();
                        thirtyDaysFromNow.setDate(today.getDate() + 30);
                        return (
                          date < today || 
                          date > thirtyDaysFromNow || 
                          date.getDay() === 0 // Sunday
                        );
                      }}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Time Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Select Time</CardTitle>
                <CardDescription>Choose your preferred appointment time</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.time}
                        variant={selectedTime === slot.time ? "default" : "outline"}
                        className={cn(
                          "h-10",
                          !slot.available && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!slot.available}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-500">Please select a date first</p>
                )}
              </CardContent>
            </Card>

            {/* Booking Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{service.duration} minutes</span>
                  </div>
                  {selectedDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{format(selectedDate, "PPP")}</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{selectedTime}</span>
                    </div>
                  )}
                  <Separator className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${service.price.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-gray-900"
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
