
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'booked' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}
