import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Car, Shield, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
              Find Your Perfect Ride
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Rent premium vehicles at unbeatable prices. From compact cars to luxury SUVs, 
              we've got the perfect vehicle for every journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/vehicles">
                <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-lg px-8">
                  Browse Vehicles
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-background/10 hover:bg-background/20 text-primary-foreground border-primary-foreground/30">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 text-8xl opacity-10 animate-pulse">🚗</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>🚙</div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Choose AutoRental?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4 animate-slide-up">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Car className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Wide Selection</h3>
              <p className="text-muted-foreground">
                Choose from our diverse fleet of well-maintained vehicles
              </p>
            </div>

            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Safe & Secure</h3>
              <p className="text-muted-foreground">
                All vehicles are insured and regularly inspected
              </p>
            </div>

            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">24/7 Support</h3>
              <p className="text-muted-foreground">
                Round-the-clock customer service for your convenience
              </p>
            </div>

            <div className="text-center space-y-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Multiple Locations</h3>
              <p className="text-muted-foreground">
                Pick up and drop off at various convenient locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Hit the Road?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us for their vehicle rental needs.
          </p>
          <Link to="/vehicles">
            <Button size="lg" className="bg-gradient-accent hover:opacity-90 text-lg px-8">
              Start Browsing
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 AutoRental Plaza. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
