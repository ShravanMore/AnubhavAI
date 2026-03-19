import React, { useState } from 'react';
import { 
  Users, 
  Upload, 
  Globe, 
  Trophy, 
  MessageSquare, 
  Blocks, 
  GraduationCap,
  Star,
  Award,
  Gem,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  Send,
  Heart,
  MessageCircle,
  Share2,
  Wallet,
  Coins,
  Box,
  Target,
  BookOpen,
  Users2,
  ArrowRight,
  Calendar,
  Zap,
  BookMarked,
  Medal,
  Gift
} from 'lucide-react';

import { MapPin, Tag, ExternalLink, Filter, Search, CalendarDays } from 'lucide-react';

import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}




interface Post {
  id: number;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  verified: boolean;
  liked?: boolean;
}

interface NFT {
  id: number;
  name: string;
  image: string;
  price: string;
  purchaseDate: string;
}

interface Transaction {
  id: number;
  type: string;
  amount: string;
  date: string;
  status: string;
}

function Community() {
  const [selectedTab, setSelectedTab] = useState('collaboration');
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [walletAddress, setWalletAddress] = useState(null);


  const [walletInfo, setWalletInfo] = useState({
    balance: "0",
    nftsOwned: 0,
    contributions: 0,
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setWalletInfo({
          balance: "0.8284 sepoliaETH",
          nftsOwned: 2,
          contributions: 25,
        });
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
      }
    } else {
      alert("Metamask is not installed. Please install it to connect.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setWalletInfo({
      balance: "0",
      nftsOwned: 0,
      contributions: 0,
    });
  };


  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Manas Patil",
      avatar: "data:image/jpeg;base64,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",
      content: "Just finished 3D scanning the newly discovered Roman artifacts! Check out the preliminary results.",
      image: "https://images.unsplash.com/photo-1666714050233-330632ee32d5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9tYW4lMjBhcnR8ZW58MHx8MHx8fDA%3D",
      likes: 24,
      comments: 8,
      timestamp: "2h ago",
      verified: true, 
      liked: false
    },
    {
      id: 2,
      author: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1",
      content: "Working on the digital restoration of a 15th-century manuscript. The AI suggestions are incredibly helpful!",
      image: "https://images.unsplash.com/photo-1662651188528-3967d0448847?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1hbnVzY3JpcHR8ZW58MHx8MHx8fDA%3D",
      likes: 18,
      comments: 5,
      timestamp: "4h ago",
      verified: true,
      liked: false
    },
    {
      id: 3,
      author: "Dr. Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1",
      content: "Exciting breakthrough in our latest excavation! Found evidence of ancient trading routes.",
      image: "https://www.shutterstock.com/image-photo/vetren-bulgaria-august-18-2022-600nw-2220085355.jpg",
      likes: 42,
      comments: 15,
      timestamp: "6h ago",
      verified: true,
      liked: false
    },
    {
      id: 4,
      author: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1",
      content: "New research paper on AI-assisted artifact dating methodology is now available. Link in comments!",
      likes: 31,
      comments: 12,
      timestamp: "8h ago",
      verified: true,
      liked: false
    },
    {
      id: 5,
      author: "Emily Zhang",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1",
      content: "Virtual reconstruction of the ancient temple is complete! Here's a sneak peek.",
      image: "https://plus.unsplash.com/premium_photo-1672287578309-2a2115000688?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXJ0aWZhY3R8ZW58MHx8MHx8fDA%3D",
      likes: 56,
      comments: 23,
      timestamp: "12h ago",
      verified: true,
      liked: false
    }
  ]);

  const [ownedNFTs] = useState<NFT[]>([
    {
      id: 1,
      name: "Ancient Greek Vase #124",
      image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/250551/540832/main-image",
      price: "0.45 ETH",
      purchaseDate: "2024-03-15"
    },
    {
      id: 2,
      name: "The Greek Prince",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXxpRnRObHJ0S1pwSXx8ZW58MHx8fHx8",
      price: "0.32 ETH",
      purchaseDate: "2024-03-10"
    },
    {
      id: 3,
      name: "Medieval Manuscript #89",
      image: "https://britishlibrary.typepad.co.uk/.a/6a00d8341c464853ef017c31a4b5af970b-500wi",
      price: "0.28 ETH",
      purchaseDate: "2024-03-05"
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "Purchase",
      amount: "0.45 ETH",
      date: "2024-03-15",
      status: "Completed"
    },
    {
      id: 2,
      type: "Purchase",
      amount: "0.32 ETH",
      date: "2024-03-10",
      status: "Completed"
    },
    {
      id: 3,
      type: "Sale",
      amount: "0.50 ETH",
      date: "2024-03-01",
      status: "Completed"
    }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSubmitPost = () => {
    if (newPost.trim() === '') return;

    const newPostObj: Post = {
      id: posts.length + 1,
      author: "Jatin",
      avatar: "https://plus.unsplash.com/premium_photo-1682096073176-7cd124ea0a7f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwcGVvcGxlfGVufDB8fDB8fHww",
      content: newPost,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      verified: true,
      liked: false
    };

    if (selectedImage) {
      newPostObj.image = URL.createObjectURL(selectedImage);
    }

    setPosts([newPostObj, ...posts]);
    setNewPost('');
    setSelectedImage(null);
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  const handleComment = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments + 1
        };
      }
      return post;
    }));
  };

  const renderGamification = () => (
    <div className="space-y-8">
      
  
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={20} />
            <select className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none">
              <option value="">All Locations</option>
              <option value="london">London</option>
              <option value="paris">Paris</option>
              <option value="new-york">New York</option>
              <option value="tokyo">Tokyo</option>
            </select>
          </div>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={20} />
            <select className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none">
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="next-month">Next Month</option>
            </select>
          </div>
        </div>
      </div>
  
      {/* Featured Events */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
          <Calendar className="text-amber-700" />
          Featured Events
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Ancient Egypt: New Discoveries Exhibition",
              image: "https://images.unsplash.com/photo-1562679299-266edbefd6d7?ixlib=rb-4.0.3",
              date: "May 15-30, 2024",
              location: "British Museum, London",
              type: "Exhibition",
              price: "Rs.200",
              attendees: 1200
            },
            {
              title: "Digital Archaeology Workshop",
              image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVqXtqN3TYrd8Bu1Qf-aVE4mKvVHV0RxrbPA&s",
              date: "June 5, 2024",
              location: "Elephanta Caves",
              type: "Workshop",
              price: "RS.450",
              attendees: 50
            }
          ].map((event, index) => (
            <div key={index} className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-amber-700 text-white px-3 py-1 rounded-full text-sm">
                  {event.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif text-stone-800 mb-4">{event.title}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Clock size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Tag size={16} />
                    <span>{event.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Users size={16} />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
                <button className="w-full bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-2">
                  Register Now
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Upcoming Events */}
      <div className="space-y-6">
        <h2 className="text-2xl font-serif text-stone-800 flex items-center gap-2">
          <Globe className="text-amber-700" />
          Upcoming Events
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Roman Art Conservation Lecture",
              date: "June 15, 2024",
              time: "14:00 - 16:00",
              location: "Metropolitan Museum of Art, New York",
              type: "Lecture",
              price: "$15",
              speaker: "Dr. Sarah Johnson"
            },
            {
              title: "Asian Ceramics Through Ages",
              date: "June 20, 2024",
              time: "10:00 - 18:00",
              location: "National Museum, Tokyo",
              type: "Exhibition",
              price: "¥1,500",
              curator: "Prof. Tanaka Hiroshi"
            },
            {
              title: "Medieval Manuscripts Workshop",
              date: "June 25, 2024",
              time: "11:00 - 15:00",
              location: "Vatican Museums, Rome",
              type: "Workshop",
              price: "€30",
              instructor: "Dr. Marco Rossi"
            }
          ].map((event, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-stone-800">{event.title}</h3>
                  <div className="flex items-center gap-2 text-stone-600">
                    <CalendarDays size={16} />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Tag size={16} />
                    <span>{event.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Users size={16} />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  

  const renderMentorship = () => (
    <div className="space-y-8">
      {/* Featured Mentors */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-serif text-stone-800 mb-6 flex items-center gap-2">
          <GraduationCap className="text-amber-700" />
          Featured Mentors
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Dr. Porwal",
              specialty: "Archaeological Conservation",
              experience: "15+ years",
              image: "https://images.jdmagicbox.com/v2/comp/mumbai/f9/022pxx22.xx22.180216200920.c1f9/catalogue/dr-ashwin-porwal-healing-hands-clinic-kemps-corner-mumbai-proctologist-doctors-j5u5kk89e7.jpg",
              availability: "Available",
              rating: 4.9,
              students: 45
            },
            {
              name: "Prof. Michael Chang",
              specialty: "Digital Preservation",
              experience: "12+ years",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1",
              availability: "Available",
              rating: 4.8,
              students: 38
            },
            {
              name: "Dr. Emma Martinez",
              specialty: "Cultural Heritage",
              experience: "10+ years",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1",
              availability: "Limited",
              rating: 4.7,
              students: 32
            }
          ].map((mentor, index) => (
            <div key={index} className="bg-stone-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4 bg-amber-700 text-white text-sm px-3 py-1 rounded-full">
                  {mentor.availability}
                </div>
              </div>
              <div className="p-6">
                <h4 className="font-semibold text-lg mb-2">{mentor.name}</h4>
                <p className="text-amber-700 font-medium mb-2">{mentor.specialty}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-stone-600">
                    <Clock size={16} />
                    <span>{mentor.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Star size={16} className="text-amber-500" />
                    <span>{mentor.rating} rating</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-600">
                    <Users size={16} />
                    <span>{mentor.students} students</span>
                  </div>
                </div>
                <button className="w-full bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare size={18} />
                  Request Mentorship
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-serif text-stone-800 mb-6 flex items-center gap-2">
          <BookMarked className="text-amber-700" />
          Learning Paths
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: "Artifact Documentation",
              level: "Beginner",
              duration: "4 weeks",
              enrolled: 128,
              modules: ["Basic Photography", "Documentation Standards", "Digital Archiving"],
              certificate: true
            },
            {
              title: "Digital Conservation",
              level: "Intermediate",
              duration: "6 weeks",
              enrolled: 85,
              modules: ["3D Scanning", "Digital Restoration", "Preservation Techniques"],
              certificate: true
            },
            {
              title: "Cultural Heritage Management",
              level: "Advanced",
              duration: "8 weeks",
              enrolled: 64,
              modules: ["Heritage Laws", "Collection Management", "Risk Assessment"],
              certificate: true
            },
            {
              title: "AI in Archaeology",
              level: "Advanced",
              duration: "6 weeks",
              enrolled: 92,
              modules: ["Machine Learning Basics", "Pattern Recognition", "Data Analysis"],
              certificate: true
            }
          ].map((path, index) => (
            <div key={index} className="border border-stone-200 rounded-lg p-6 hover:border-amber-500 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1">{path.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-stone-600">
                    <span>{path.level}</span>
                    <span>•</span>
                    <span>{path.duration}</span>
                    <span>•</span>
                    <span>{path.enrolled} enrolled</span>
                  </div>
                </div>
                {path.certificate && (
                  <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                    Certificate
                  </div>
                )}
              </div>
              <div className="space-y-2 mb-4">
                {path.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="flex items-center gap-2 text-stone-600">
                    <CheckCircle2 size={16} className="text-amber-700" />
                    <span>{module}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center justify-center gap-2">
                <Zap size={18} />
                Start Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCollaborationTools = () => (
    <div className="space-y-8">
      {/* Create Post Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-serif text-stone-800 mb-4">Create Post</h3>
        <div className="space-y-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your discoveries and insights..."
            className="w-full p-4 border border-stone-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-amber-700 hover:text-amber-800">
              <ImageIcon size={20} />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <button 
              onClick={handleSubmitPost}
              disabled={!newPost.trim()}
              className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Post
            </button>
          </div>
          {selectedImage && (
            <div className="relative inline-block">
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="max-h-40 rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={post.avatar}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{post.author}</h4>
                  {post.verified && (
                    <CheckCircle2 className="text-amber-700" size={16} />
                  )}
                </div>
                <p className="text-stone-500 text-sm">{post.timestamp}</p>
              </div>
            </div>
            <p className="mb-4 text-stone-800">{post.content}</p>
            {post.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full max-h-96 object-cover"
                />
              </div>
            )}
            <div className="flex items-center gap-6 text-stone-600">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 transition-colors ${
                  post.liked ? 'text-amber-700' : 'hover:text-amber-700'
                }`}
              >
                <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              <button 
                onClick={() => handleComment(post.id)}
                className="flex items-center gap-2 hover:text-amber-700 transition-colors"
              >
                <MessageCircle size={20} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-amber-700 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBlockchain = () => (
    <div className="space-y-8">
      {/* Wallet Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-serif text-stone-800 flex items-center gap-2">
            <Wallet className="text-amber-700" />
            Your Wallet
          </h3>
          <button
            onClick={walletAddress ? disconnectWallet : connectWallet}
            className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors"
          >
            {walletAddress ? "Disconnect Wallet" : "Connect Wallet"}
          </button>
        </div>
        {walletAddress && (
          <div className="text-stone-700 font-medium">
            <p>Wallet Address:</p>
            <p className="text-sm text-stone-500">{walletAddress}</p>
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-stone-50 p-4 rounded-lg">
            <h4 className="text-sm text-stone-600 mb-1">Balance</h4>
            <div className="flex items-center gap-2">
              <Coins className="text-amber-700" size={20} />
              <span className="font-semibold">{walletInfo.balance}</span>
            </div>
          </div>
          <div className="bg-stone-50 p-4 rounded-lg">
            <h4 className="text-sm text-stone-600 mb-1">NFTs Owned</h4>
            <div className="flex items-center gap-2">
              <Box className="text-amber-700" size={20} />
              <span className="font-semibold">{walletInfo.nftsOwned}</span>
            </div>
          </div>
          <div className="bg-stone-50 p-4 rounded-lg">
            <h4 className="text-sm text-stone-600 mb-1">Contributions</h4>
            <div className="flex items-center gap-2">
              <Star className="text-amber-700" size={20} />
              <span className="font-semibold">{walletInfo.contributions}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Owned NFTs */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-serif text-stone-800 mb-6 flex items-center gap-2">
          <Box className="text-amber-700" />
          Your NFT Collection
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              id: 1,
              image: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/250551/540832/main-image",
              name: "Artifact NFT #1",
              price: "0.1 ETH",
              purchaseDate: "21-01-2025",
            },
            {
              id: 2,
              image: "https://britishlibrary.typepad.co.uk/.a/6a00d8341c464853ef017c31a4b5af970b-500wi",
              name: "Artifact NFT #2",
              price: "0.2 ETH",
              purchaseDate: "24-01-2025",
            },
          ].map((nft) => (
            <div
              key={nft.id}
              className="bg-stone-50 rounded-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">{nft.name}</h4>
                <div className="flex justify-between items-center text-stone-600">
                  <span>{nft.price}</span>
                  <span className="text-sm">{nft.purchaseDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-serif text-stone-800 mb-6 flex items-center gap-2">
          <Clock className="text-amber-700" />
          Your Rewards
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-stone-200">
                <th className="pb-4 font-semibold text-stone-600">For Artifact</th>
                <th className="pb-4 font-semibold text-stone-600">Amount</th>
                <th className="pb-4 font-semibold text-stone-600">Date</th>
                <th className="pb-4 font-semibold text-stone-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 1,
                  type: "Greek Ancient Vase",
                  amount: "0.5 ETH",
                  date: "2024-01-10",
                  status: "Completed",
                },
                {
                  id: 2,
                  type: "Roman Manuscript",
                  amount: "1.0 ETH",
                  date: "2024-01-15",
                  status: "Completed",
                },
              ].map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-stone-100 hover:bg-stone-50"
                >
                  <td className="py-4">{tx.type}</td>
                  <td className="py-4 text-amber-700 font-medium">{tx.amount}</td>
                  <td className="py-4 text-stone-600">{tx.date}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
    

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-6">Join Our Community</h1>
            <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
              Collaborate, learn, and contribute to cultural preservation through blockchain-verified participation
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-lg border border-stone-200 p-1 bg-white shadow-md">
              {[
                { id: 'collaboration', icon: <Users size={20} />, label: 'Collaboration' },
                { id: 'blockchain', icon: <Blocks size={20} />, label: 'Blockchain' },
                { id: 'gamification', icon: <MapPin size={20} />, label: 'Events' },
                { id: 'mentorship', icon: <GraduationCap size={20} />, label: 'Mentorship' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-md transition-colors ${
                    selectedTab === tab.id
                      ? 'bg-amber-700 text-white'
                      : 'text-stone-600 hover:text-amber-700'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {selectedTab === 'collaboration' && renderCollaborationTools()}
            {selectedTab === 'blockchain' && renderBlockchain()}
            {selectedTab === 'gamification' && renderGamification()}
            {selectedTab === 'mentorship' && renderMentorship()}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Community;



