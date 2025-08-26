export interface Business {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  distance: number;
  estimatedWait: number;
  queueCount: number;
  address: string;
  phone: string;
  email: string;        // ✅ Added
  website: string;      // ✅ Added
  image: string;
  isPremium: boolean;
  isLiveQueue: boolean;
  operatingHours: {
    [key: string]: { open: string; close: string; };
  };
  services: {
    id: string;
    name: string;
    price: number;
    duration: number;
    description: string;
  }[];
  reviews: {
    id: string;
    customerName: string;
    profilePic: string;
    rating: number;
    comment: string;
    date: string;
    serviceUsed: string;
  }[];
  amenities: string[];   // ✅ Added
}

export const serviceCategories = [
  'All Services',
  'Beauty & Wellness',
  'Restaurant',
  'Healthcare',
  'Retail',
  'Entertainment',
  'Automotive',
  'Professional Services'
];

export const mockUserLocation = {
  latitude: 18.5204,
  longitude: 73.8567,
  address: "Pune, Maharashtra"
};

export const comprehensiveMockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Glow & Glam Salon',
    category: 'Beauty & Wellness',
    rating: 4.8,
    reviewCount: 234,
    distance: 1.2,
    estimatedWait: 35,
    queueCount: 8,
    address: 'Shop 15, Phoenix Mall, Viman Nagar, Pune',
    phone: '+91 98765 43210',
    email: 'info@glowglam.com',      // ✅ Now valid
    website: 'https://glowglam.com',  // ✅ Now valid
    image: 'salon-image.jpg',
    isPremium: true,
    isLiveQueue: true,
    operatingHours: {
      'Monday': { open: '10:00', close: '20:00' },
      'Tuesday': { open: '10:00', close: '20:00' },
      'Wednesday': { open: '10:00', close: '20:00' },
      'Thursday': { open: '10:00', close: '20:00' },
      'Friday': { open: '10:00', close: '21:00' },
      'Saturday': { open: '09:00', close: '21:00' },
      'Sunday': { open: '09:00', close: '20:00' }
    },
    services: [
      { 
        id: '1', 
        name: 'Haircut & Styling', 
        price: 350, 
        duration: 45,
        description: 'Professional cut and style'
      },
      { 
        id: '2', 
        name: 'Deep Cleansing Facial', 
        price: 800, 
        duration: 75,
        description: 'Complete facial treatment'
      },
      { 
        id: '3', 
        name: 'Manicure', 
        price: 400, 
        duration: 30,
        description: 'Nail care and polish'
      },
      { 
        id: '4', 
        name: 'Pedicure', 
        price: 500, 
        duration: 45,
        description: 'Foot care treatment'
      }
    ],
    reviews: [
      {
        id: '1',
        customerName: 'Anjali K.',
        profilePic: 'A',
        rating: 4,
        comment: 'Good facial treatment, will come again',
        date: '2025-05-20',
        serviceUsed: 'Facial'
      },
      {
        id: '2',
        customerName: 'Priya S.',
        profilePic: 'P',
        rating: 5,
        comment: 'Amazing haircut and styling. Very professional staff.',
        date: '2025-08-15',
        serviceUsed: 'Haircut'
      }
    ],
    amenities: ['WiFi', 'AC', 'Parking', 'Card Payment', 'Online Booking'] // ✅ Now valid
  },
  {
    id: '2',
    name: 'Spice Garden Restaurant',
    category: 'Restaurant',
    rating: 4.4,
    reviewCount: 567,
    distance: 1.8,
    estimatedWait: 25,
    queueCount: 12,
    address: 'FC Road, Shivajinagar, Pune',
    phone: '+91 98765 43211',
    email: 'info@spicegarden.com',
    website: 'https://spicegarden.com',
    image: 'restaurant-image.jpg',
    isPremium: false,
    isLiveQueue: true,
    operatingHours: {
      'Monday': { open: '11:00', close: '23:00' },
      'Tuesday': { open: '11:00', close: '23:00' },
      'Wednesday': { open: '11:00', close: '23:00' },
      'Thursday': { open: '11:00', close: '23:00' },
      'Friday': { open: '11:00', close: '23:30' },
      'Saturday': { open: '11:00', close: '23:30' },
      'Sunday': { open: '11:00', close: '23:00' }
    },
    services: [
      { 
        id: '1', 
        name: 'Lunch Buffet', 
        price: 450, 
        duration: 90,
        description: 'All-you-can-eat lunch buffet'
      },
      { 
        id: '2', 
        name: 'Dinner (À la carte)', 
        price: 800, 
        duration: 60,
        description: 'Order from our dinner menu'
      },
      { 
        id: '3', 
        name: 'Private Dining', 
        price: 2000, 
        duration: 120,
        description: 'Private room for special occasions'
      }
    ],
    reviews: [
      {
        id: '1',
        customerName: 'Rahul K.',
        profilePic: 'R',
        rating: 4,
        comment: 'Great food and ambiance. Service could be faster.',
        date: '2025-08-18',
        serviceUsed: 'Dinner'
      }
    ],
    amenities: ['WiFi', 'AC', 'Valet Parking', 'Card Payment', 'Home Delivery']
  },
  {
    id: '3',
    name: 'Dr. Patel Clinic',
    category: 'Healthcare',
    rating: 4.9,
    reviewCount: 189,
    distance: 0.8,
    estimatedWait: 15,
    queueCount: 5,
    address: 'Model Colony, Pune',
    phone: '+91 98765 43212',
    email: 'contact@drpatelclinic.com',
    website: 'https://drpatelclinic.com',
    image: 'clinic-image.jpg',
    isPremium: true,
    isLiveQueue: true,
    operatingHours: {
      'Monday': { open: '09:00', close: '18:00' },
      'Tuesday': { open: '09:00', close: '18:00' },
      'Wednesday': { open: '09:00', close: '18:00' },
      'Thursday': { open: '09:00', close: '18:00' },
      'Friday': { open: '09:00', close: '18:00' },
      'Saturday': { open: '09:00', close: '14:00' },
      'Sunday': { open: 'Closed', close: 'Closed' }
    },
    services: [
      { 
        id: '1', 
        name: 'General Consultation', 
        price: 500, 
        duration: 30,
        description: 'General health consultation'
      },
      { 
        id: '2', 
        name: 'Health Checkup', 
        price: 1500, 
        duration: 60,
        description: 'Comprehensive health screening'
      },
      { 
        id: '3', 
        name: 'Vaccination', 
        price: 200, 
        duration: 15,
        description: 'Various vaccinations available'
      }
    ],
    reviews: [
      {
        id: '1',
        customerName: 'Anita D.',
        profilePic: 'A',
        rating: 5,
        comment: 'Very professional and caring doctor. Highly recommended.',
        date: '2025-08-19',
        serviceUsed: 'Consultation'
      }
    ],
    amenities: ['AC', 'Parking', 'Card Payment', 'Online Appointment', 'Wheelchair Access']
  }
];
