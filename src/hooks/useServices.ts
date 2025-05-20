
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Service } from '@/types';

// Mock data for initial development
const MOCK_SERVICES: Service[] = [
  {
    id: "haircut-classic",
    name: "Classic Haircut",
    description: "A timeless haircut tailored to your face shape and style preference. Includes consultation, wash, and styling.",
    duration: 45,
    price: 35,
    category: "haircuts",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  },
  {
    id: "haircut-fade",
    name: "Fade Haircut",
    description: "Perfect gradual fade from skin to desired length. Modern and clean look that frames your features.",
    duration: 40,
    price: 40,
    category: "haircuts",
    imageUrl: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=2344&ixlib=rb-4.0.3"
  },
  {
    id: "beard-trim",
    name: "Beard Trim & Shape",
    description: "Expert beard trimming and shaping to enhance your facial features. Includes hot towel and beard oil treatment.",
    duration: 30,
    price: 25,
    category: "beard",
    imageUrl: "https://images.unsplash.com/photo-1621605810052-80936654d313?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  },
  {
    id: "beard-grooming",
    name: "Beard Grooming Package",
    description: "Complete beard care service including trim, shape, deep conditioning, hot towel treatment, and styling.",
    duration: 45,
    price: 40,
    category: "beard",
    imageUrl: "https://images.unsplash.com/photo-1590246814883-57014d2bdf3a?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  },
  {
    id: "haircolor-basic",
    name: "Hair Coloring",
    description: "Professional hair coloring service to cover grays or add dimension with natural-looking results.",
    duration: 90,
    price: 70,
    category: "color",
    imageUrl: "https://images.unsplash.com/photo-1534297635766-a262cdcb8ee4?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  },
  {
    id: "facial-classic",
    name: "Classic Facial",
    description: "Revitalizing facial treatment targeted to your skin type. Includes cleansing, exfoliation, and hydration.",
    duration: 60,
    price: 60,
    category: "facial",
    imageUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  },
  {
    id: "shave-straight",
    name: "Traditional Straight Razor Shave",
    description: "Luxurious traditional straight razor shave with hot towel preparation and soothing aftershave balm.",
    duration: 45,
    price: 45,
    category: "shave",
    imageUrl: "https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  },
  {
    id: "package-grooming",
    name: "Complete Grooming Package",
    description: "Ultimate grooming experience including haircut, beard service, facial, and complimentary beverage.",
    duration: 120,
    price: 120,
    category: "package",
    imageUrl: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3"
  }
];

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // In a real implementation, we would fetch from Firestore
        // const servicesCollection = collection(db, 'services');
        // const servicesSnapshot = await getDocs(servicesCollection);
        // const servicesList = servicesSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // })) as Service[];
        
        // For development, use mock data
        setServices(MOCK_SERVICES);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const getServiceById = (id: string): Service | undefined => {
    return services.find(service => service.id === id);
  };

  const getServicesByCategory = (category: string): Service[] => {
    if (category === 'all') return services;
    return services.filter(service => service.category === category);
  };

  return { services, loading, error, getServiceById, getServicesByCategory };
};
