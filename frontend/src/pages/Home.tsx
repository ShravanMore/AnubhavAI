import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Camera, 
  Cloud, 
  History, 
  Map, 
  Users,
  Upload,
  Shield,
  Globe,
  Search
} from 'lucide-react';

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://png.pngtree.com/background/20250104/original/pngtree-artifacts-and-the-ruins-of-greece-picture-image_15514197.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.4)',
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            Preserving Heritage Through AI
          </h1>
          <p className="text-xl text-stone-100 mb-8">
            Discover, analyze, and preserve cultural artifacts with cutting-edge AI technology
          </p>
          <Link 
            to="/discover-artifacts"
            className="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors"
          >
            Start Exploring
          </Link>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Landmark size={32} />,
                title: 'Discover Artifacts',
                description: 'Upload and identify artifacts using AI technology',
                link: '/discover-artifacts'
              },
              {
                icon: <Camera size={32} />,
                title: 'AR Experience',
                description: 'Experience artifacts in their historical context',
                link: '/ar-experience'
              },
              {
                icon: <Cloud size={32} />,
                title: 'Climate Impact',
                description: 'Analyze environmental effects on artifacts',
                link: '/climate-impact'
              },
              {
                icon: <History size={32} />,
                title: 'Restoration',
                description: 'AI-powered restoration suggestions',
                link: '/restoration'
              },
              {
                icon: <Map size={32} />,
                title: 'Cultural Mapping',
                description: 'Explore cultural evolution through time',
                link: '/cultural-mapping'
              },
              {
                icon: <Users size={32} />,
                title: 'Community',
                description: 'Connect with experts and enthusiasts',
                link: '/community'
              }
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="group bg-stone-50 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-amber-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif text-stone-800 mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Landmark className="text-amber-500" size={24} />
                <span className="font-serif text-white">Anubhav AI</span>
              </div>
              <p>Preserving our cultural heritage through innovative AI technology.</p>
            </div>
            <div>
              <h4 className="text-white font-serif mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/discover-artifacts" className="hover:text-amber-500 transition-colors">Discover Artifacts</Link></li>
                <li><Link to="/ar-experience" className="hover:text-amber-500 transition-colors">AR Experience</Link></li>
                <li><Link to="/climate-impact" className="hover:text-amber-500 transition-colors">Climate Impact</Link></li>
                <li><Link to="/restoration" className="hover:text-amber-500 transition-colors">Restoration</Link></li>
                <li><Link to="/cultural-mapping" className="hover:text-amber-500 transition-colors">Cultural Mapping</Link></li>
                <li><Link to="/community" className="hover:text-amber-500 transition-colors">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-serif mb-4">Contact</h4>
              <p>info@anubhavai.com</p>
              <p>+919876545678</p>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Anubhav AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;