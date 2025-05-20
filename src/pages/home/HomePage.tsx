
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useServices } from "@/hooks/useServices";
import ServiceCard from "@/components/services/ServiceCard";

export default function HomePage() {
  const navigate = useNavigate();
  const { services } = useServices();
  const featuredServices = services.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
        <div className="h-[600px] w-full relative">
          <img 
            src="https://images.unsplash.com/photo-1621605810052-80936654d313?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3" 
            alt="Barber shop interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-start">
            <div className="container mx-auto px-4">
              <div className="max-w-lg">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Premium Men's Grooming Experience</h1>
                <p className="text-xl text-gray-200 mb-8">
                  Experience exceptional grooming services tailored for the modern gentleman.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button 
                    className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-6 text-lg"
                    onClick={() => navigate("/services")}
                  >
                    Book Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg"
                    onClick={() => navigate("/services")}
                  >
                    View Services
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h2 className="text-3xl font-bold mb-4">Welcome to SharpGroom</h2>
              <p className="text-gray-600 mb-6">
                At SharpGroom, we believe that every man deserves to look and feel his best. 
                Our skilled barbers and stylists are dedicated to providing you with a premium 
                grooming experience that combines traditional barbering techniques with modern 
                styles and trends.
              </p>
              <p className="text-gray-600 mb-6">
                From classic haircuts and hot towel shaves to beard grooming and facial treatments, 
                we offer a comprehensive range of services to meet all your grooming needs.
              </p>
              <Button 
                className="bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => navigate("/services")}
              >
                Explore Our Services
              </Button>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=2344&ixlib=rb-4.0.3" 
                alt="Barber cutting hair" 
                className="rounded-lg shadow-md h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3" 
                alt="Man getting a haircut" 
                className="rounded-lg shadow-md h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1590246814883-57014d2bdf3a?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3" 
                alt="Beard grooming" 
                className="rounded-lg shadow-md h-64 object-cover"
              />
              <img 
                src="https://images.unsplash.com/photo-1493957988430-a5f2e15f39a3?auto=format&fit=crop&q=80&w=2340&ixlib=rb-4.0.3" 
                alt="Straight razor shave" 
                className="rounded-lg shadow-md h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Featured Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular grooming services, each designed to deliver 
              exceptional results and an unforgettable experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="bg-gray-900 hover:bg-gray-800 text-white px-8"
              onClick={() => navigate("/services")}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our satisfied clients have to say about their 
              SharpGroom experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Michael Johnson</h4>
                  <p className="text-sm text-gray-500">Regular Client</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been coming to SharpGroom for over a year now and I'm always impressed with 
                the quality of service. My barber takes the time to understand exactly what I want 
                and the results are consistently excellent."
              </p>
              <div className="flex mt-4 text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">David Thompson</h4>
                  <p className="text-sm text-gray-500">New Customer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "My first experience at SharpGroom was fantastic. The atmosphere is welcoming, 
                and the staff are extremely professional. I got a haircut and beard trim, and 
                the attention to detail was impressive. I'll definitely be back!"
              </p>
              <div className="flex mt-4 text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-semibold">Robert Wilson</h4>
                  <p className="text-sm text-gray-500">Monthly Subscriber</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The online booking system is so convenient, and the service is always top-notch. 
                I've tried several different services from haircuts to facials, and I've never been 
                disappointed. Highly recommend their complete grooming package!"
              </p>
              <div className="flex mt-4 text-amber-500">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Elevate Your Grooming Experience?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our growing family of satisfied clients and experience the SharpGroom difference today.
          </p>
          <Button 
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-6 text-lg"
            onClick={() => navigate("/services")}
          >
            Book Your Appointment Now
          </Button>
        </div>
      </section>
    </div>
  );
}
