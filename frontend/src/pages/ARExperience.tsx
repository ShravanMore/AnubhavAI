import React, { useState, useEffect } from "react";
import { Camera, Compass, Cuboid as Cube, Layers, Upload, X } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import "@google/model-viewer";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': any;
    }
  }
}

const ARExperience: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glbFile, setGlbFile] = useState<File | null>(null);
  const [popupVideo, setPopupVideo] = useState<string | null>(null);
  const [selectedPrebuiltModel, setSelectedPrebuiltModel] = useState<{ path: string; name: string } | null>(null);

  const features = [
    {
      icon: <Camera className="text-amber-700" size={24} />,
      title: '3D Scanning',
      description: 'Scan artifacts to create detailed 3D models for preservation and study'
    },
    {
      icon: <Cube className="text-amber-700" size={24} />,
      title: 'Virtual Display',
      description: 'View artifacts in your space through augmented reality'
    },
    {
      icon: <Compass className="text-amber-700" size={24} />,
      title: 'Historical Context',
      description: 'Experience artifacts in their original historical settings'
    }
  ];

  const artifacts = [
    {
      video: 'https://www.youtube.com/embed/Bx2S7JpdOp4?si=48RLgUXiJ6H8cN-x',
      title: 'Taj Mahal',
      period: 'Classical Period',
      available: true
    },
    {
      video: 'https://www.youtube.com/embed/v6kGTbNy5H0?si=gf6SBhB9SU1CXP3X',
      title: 'Ephesus Artifacts',
      period: 'Imperial Rome',
      available: true
    },
    {
      video: 'https://www.youtube.com/embed/VtI9debZPGU?si=eZPb0y77AG9q_id4',
      title: 'Karnak Temple Egypt',
      period: 'Middle Ages',
      available: true
    }
  ];

  // Pre-built GLB models with paths and names
  const prebuiltModels = [
    { path: 'models/humayunstomb.glb', name: 'Humayun\'s Tomb' },
    { path: 'models/raigad.glb', name: 'Raigad' },
    { path: 'models/vishwanathtemple.glb', name: 'Vishwanath Temple' },
    { path: 'models/qutubminar.glb', name: 'Qutub Minar' },
    { path: 'models/konark-temple.glb', name: 'Konark Temple' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setIsConverting(false);
    setProgress(0);
  };

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const startConversion = async () => {
    if (!selectedImage) return;
    
    setIsConverting(true);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      const response = await fetch(`${apiUrl}/api/convert`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        const glbUrl = `${apiUrl}${data.glb_url}`;
        const glbResponse = await fetch(glbUrl);
        const blob = await glbResponse.blob();
        const file = new File([blob], 'model.glb', { type: 'model/gltf-binary' });
        setGlbFile(file);
        setProgress(100);
      } else {
        console.error('Conversion failed:', data.error);
        alert(`Conversion failed: ${data.error}`);
        setIsConverting(false);
        setProgress(0);
      }
    } catch (error) {
      console.error('Error during conversion:', error);
      alert('Error during conversion. Please try again.');
      setIsConverting(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isConverting && progress < 100) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 99) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 100);  // Increment by 1 every 100ms for smoother, dynamic progress
    }
    return () => clearInterval(timer);
  }, [isConverting, progress]);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      model-viewer {
        --progress-bar-height: 0px;
        background-color: transparent;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleGlbUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGlbFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen text-stone-800">
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-serif mb-6">3D & AR Experience</h1>
            <p className="text-lg md:text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
              Step into history with our immersive AR technology. Upload your image and explore 3D models with ease.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section */}
      <div className="container mx-auto p-4 md:p-8 bg-stone-50 shadow-2xl rounded-xl">
        <div className="mb-6 px-4 md:px-10">
          <label className="block cursor-pointer">
            <span className="bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors w-full md:w-[20%]">
              <Upload className="mr-2" />
              Upload Image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>

        {imagePreview && (
          <div className="mb-6 px-4 md:px-10">
            <div className="relative inline-block">
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                title="Remove image"
              >
                <X size={20} />
              </button>
              <img
                src={imagePreview}
                alt="Preview"
                className="h-48 w-48 md:h-64 md:w-64 object-contain rounded-lg border border-stone-300 shadow-lg"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 mb-6 px-4 md:px-10">
          {imagePreview && !isConverting && (
            <button
              className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-full md:w-auto"
              onClick={startConversion}
            >
              Convert to 3D
            </button>
          )}
        </div>

        {isConverting && (
          <div className="mb-6 px-4 md:px-10">
            <ProgressBar animated variant="warning" now={progress} />
            <p className="text-lg md:text-xl text-stone-600 mt-2 text-center">
              Converting: {Math.round(progress)}%
            </p>
          </div>
        )}

        {progress === 100 && glbFile && (
          <div className="mt-6 bg-stone-100 p-4 md:p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-stone-800">3D Model Ready!</h2>
            <p className="text-base md:text-lg mb-4 text-stone-600">Your 3D model has been generated successfully. You can view it below or download it.</p>
            <button
              className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors w-full md:w-auto"
              onClick={() => {
                // Create download link
                const url = URL.createObjectURL(glbFile);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'model.glb';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
            >
              Download 3D GLB File
            </button>
          </div>
        )}

        {/* GLB Viewer */}
        <div className="mt-10 bg-white p-4 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-stone-800">GLB Model Viewer</h3>

          <label className="block cursor-pointer mb-6">
            <span className="bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors w-full md:w-[20%]">
              <Upload className="mr-2" />
              Upload GLB file
              <input
                type="file"
                accept=".glb"
                onChange={handleGlbUpload}
                className="hidden"
              />
            </span>
          </label>

          {glbFile && (
            <model-viewer
              src={URL.createObjectURL(glbFile)}
              alt="Preview of the uploaded 3D model"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{
                width: "100%",
                height: "300px",
                backgroundColor: "#f5f5f4",
                borderRadius: "0.5rem"
              }}
              className="md:h-[500px]"
            />
          )}
        </div>

        {/* Pre-built GLB Models Section (below GLB viewer, above features) */}
        <div className="mt-10 bg-white p-4 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-xl md:text-2xl font-semibold mb-6 text-stone-800">Pre-built 3D Models</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8">
            {prebuiltModels.map((model, index) => (
              <div 
                key={index} 
                className="bg-stone-100 rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedPrebuiltModel(model)}
              >
                <model-viewer
                  src={model.path}
                  alt={`Pre-built 3D model: ${model.name}`}
                  camera-controls
                  auto-rotate
                  shadow-intensity="1"
                  style={{
                    width: "100%",
                    height: "200px",
                    backgroundColor: "#f5f5f4"
                  }}
                  className="md:h-[300px]"
                />
                <p className="text-center py-2 text-stone-800">{model.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
            Advanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg md:text-xl font-serif text-stone-800 mb-2">{feature.title}</h3>
                <p className="text-stone-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Artifacts */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
            Available in AR
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artifacts.map((artifact, index) => (
              <div key={index} className="bg-stone-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <iframe
                    src={artifact.video}
                    title={artifact.title}
                    className="w-full h-48"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  {artifact.available && (
                    <div className="absolute top-4 right-4 bg-amber-700 text-white text-sm px-3 py-1 rounded-full">
                      AR Ready
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg md:text-xl font-serif text-stone-800 mb-2">{artifact.title}</h3>
                  <p className="text-stone-600 mb-4">{artifact.period}</p>
                  <button
                    className="w-full bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
                    onClick={() => setPopupVideo(artifact.video)}
                  >
                    View in AR
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Screen Popup for Videos */}
      {popupVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg overflow-hidden">
            <button
              className="absolute top-4 right-4 text-black bg-gray-300 hover:bg-gray-400 rounded-full p-2"
              onClick={() => setPopupVideo(null)}
            >
              ✕
            </button>
            <iframe
              src={popupVideo}
              title="Full Screen Video"
              className="w-full h-64 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Full-Screen Popup for Selected Prebuilt Model */}
      {selectedPrebuiltModel && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg overflow-hidden">
            <button
              className="absolute z-50 top-4 right-4 text-black bg-gray-300 hover:bg-gray-400 rounded-full p-2"
              onClick={() => setSelectedPrebuiltModel(null)}
            >
              ✕
            </button>
            <model-viewer
              src={selectedPrebuiltModel.path}
              alt={`Full view of ${selectedPrebuiltModel.name}`}
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{
                width: "100%",
                height: "500px",
                backgroundColor: "#f5f5f4"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ARExperience;











// import React, { useState, useEffect } from "react";
// import { Camera, Compass, Cuboid as Cube, Layers, Upload, X } from 'lucide-react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import "@google/model-viewer";

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'model-viewer': any;
//     }
//   }
// }

// const ARExperience: React.FC = () => {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [isConverting, setIsConverting] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [glbFile, setGlbFile] = useState<File | null>(null);
//   const [popupVideo, setPopupVideo] = useState<string | null>(null);

//   const features = [
//     {
//       icon: <Camera className="text-amber-700" size={24} />,
//       title: '3D Scanning',
//       description: 'Scan artifacts to create detailed 3D models for preservation and study'
//     },
//     {
//       icon: <Cube className="text-amber-700" size={24} />,
//       title: 'Virtual Display',
//       description: 'View artifacts in your space through augmented reality'
//     },
//     {
//       icon: <Compass className="text-amber-700" size={24} />,
//       title: 'Historical Context',
//       description: 'Experience artifacts in their original historical settings'
//     }
//   ];

//   const artifacts = [
//     {
//       video: 'https://www.youtube.com/embed/Bx2S7JpdOp4?si=48RLgUXiJ6H8cN-x',
//       title: 'Taj Mahal',
//       period: 'Classical Period',
//       available: true
//     },
//     {
//       video: 'https://www.youtube.com/embed/v6kGTbNy5H0?si=gf6SBhB9SU1CXP3X',
//       title: 'Ephesus Artifacts',
//       period: 'Imperial Rome',
//       available: true
//     },
//     {
//       video: 'https://www.youtube.com/embed/VtI9debZPGU?si=eZPb0y77AG9q_id4',
//       title: 'Karnak Temple Egypt',
//       period: 'Middle Ages',
//       available: true
//     }
//   ];

//    // Pre-built GLB models with paths and names
//   const prebuiltModels = [
//     { path: 'models/humayunstomb.glb', name: 'Humayun\'s Tomb' },
//     { path: 'models/raigad.glb', name: 'Raigad' },
//     { path: 'models/vishwanathtemple.glb', name: 'Vishwanath Temple' },
//     { path: 'models/qutubminar.glb', name: 'Qutub Minar' },
//     { path: 'models/tajmahal.glb', name: 'Taj Mahal' }
//   ];

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setSelectedImage(null);
//     setImagePreview(null);
//     setIsConverting(false);
//     setProgress(0);
//   };

//   const apiUrl = import.meta.env.VITE_BACKEND_URL;

//   const startConversion = async () => {
//     if (!selectedImage) return;
    
//     setIsConverting(true);
//     setProgress(0);
    
//     try {
//       const formData = new FormData();
//       formData.append('image', selectedImage);
      
//       const response = await fetch(`${apiUrl}/api/convert`, {
//         method: 'POST',
//         body: formData,
//       });
      
//       const data = await response.json();
      
//       if (data.success) {
//         const glbUrl = `${apiUrl}${data.glb_url}`;
//         const glbResponse = await fetch(glbUrl);
//         const blob = await glbResponse.blob();
//         const file = new File([blob], 'model.glb', { type: 'model/gltf-binary' });
//         setGlbFile(file);
//         setProgress(100);
//       } else {
//         console.error('Conversion failed:', data.error);
//         alert(`Conversion failed: ${data.error}`);
//         setIsConverting(false);
//         setProgress(0);
//       }
//     } catch (error) {
//       console.error('Error during conversion:', error);
//       alert('Error during conversion. Please try again.');
//       setIsConverting(false);
//       setProgress(0);
//     }
//   };

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (isConverting && progress < 100) {
//       timer = setInterval(() => {
//         setProgress(prev => {
//           if (prev >= 99) {
//             clearInterval(timer);
//             return prev;
//           }
//           return prev + 1;
//         });
//       }, 100);  // Increment by 1 every 100ms for smoother, dynamic progress
//     }
//     return () => clearInterval(timer);
//   }, [isConverting, progress]);

//   useEffect(() => {
//     const style = document.createElement('style');
//     style.textContent = `
//       model-viewer {
//         --progress-bar-height: 0px;
//         background-color: transparent;
//       }
//     `;
//     document.head.appendChild(style);
//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   const handleGlbUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setGlbFile(e.target.files[0]);
//     }
//   };

//   return (
//     <div className="bg-stone-50 min-h-screen text-stone-800">
//       {/* Hero Section */}
//       <section className="bg-stone-900 text-white py-12 md:py-20">
//         <div className="max-w-7xl mx-auto px-4 pt-12 md:pt-20 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-3xl md:text-4xl font-serif mb-6">3D & AR Experience</h1>
//             <p className="text-lg md:text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
//               Step into history with our immersive AR technology. Upload your image and explore 3D models with ease.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Section */}
//       <div className="container mx-auto p-4 md:p-8 bg-stone-50 shadow-2xl rounded-xl">
//         <div className="mb-6 px-4 md:px-10">
//           <label className="block cursor-pointer">
//             <span className="bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors w-full md:w-[20%]">
//               <Upload className="mr-2" />
//               Upload Image
//             </span>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="hidden"
//             />
//           </label>
//         </div>

//         {imagePreview && (
//           <div className="mb-6 px-4 md:px-10">
//             <div className="relative inline-block">
//               <button
//                 onClick={removeImage}
//                 className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
//                 title="Remove image"
//               >
//                 <X size={20} />
//               </button>
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="h-48 w-48 md:h-64 md:w-64 object-contain rounded-lg border border-stone-300 shadow-lg"
//               />
//             </div>
//           </div>
//         )}

//         <div className="flex items-center gap-4 mb-6 px-4 md:px-10">
//           {imagePreview && !isConverting && (
//             <button
//               className="bg-amber-700 hover:bg-amber-800 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-full md:w-auto"
//               onClick={startConversion}
//             >
//               Convert to 3D
//             </button>
//           )}
//         </div>

//         {isConverting && (
//           <div className="mb-6 px-4 md:px-10">
//             <ProgressBar animated variant="warning" now={progress} />
//             <p className="text-lg md:text-xl text-stone-600 mt-2 text-center">
//               Converting: {Math.round(progress)}%
//             </p>
//           </div>
//         )}

//         {progress === 100 && glbFile && (
//           <div className="mt-6 bg-stone-100 p-4 md:p-6 rounded-lg shadow-xl">
//             <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-stone-800">3D Model Ready!</h2>
//             <p className="text-base md:text-lg mb-4 text-stone-600">Your 3D model has been generated successfully. You can view it below or download it.</p>
//             <button
//               className="bg-amber-700 text-white px-6 py-2 rounded-lg hover:bg-amber-800 transition-colors w-full md:w-auto"
//               onClick={() => {
//                 // Create download link
//                 const url = URL.createObjectURL(glbFile);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = 'model.glb';
//                 document.body.appendChild(a);
//                 a.click();
//                 document.body.removeChild(a);
//                 URL.revokeObjectURL(url);
//               }}
//             >
//               Download 3D GLB File
//             </button>
//           </div>
//         )}

//         {/* GLB Viewer */}
//         <div className="mt-10 bg-white p-4 md:p-8 rounded-lg shadow-lg">
//           <h3 className="text-xl md:text-2xl font-semibold mb-6 text-stone-800">GLB Model Viewer</h3>

//           <label className="block cursor-pointer mb-6">
//             <span className="bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors w-full md:w-[20%]">
//               <Upload className="mr-2" />
//               Upload GLB file
//               <input
//                 type="file"
//                 accept=".glb"
//                 onChange={handleGlbUpload}
//                 className="hidden"
//               />
//             </span>
//           </label>

//           {glbFile && (
//             <model-viewer
//               src={URL.createObjectURL(glbFile)}
//               alt="Preview of the uploaded 3D model"
//               camera-controls
//               auto-rotate
//               shadow-intensity="1"
//               style={{
//                 width: "100%",
//                 height: "300px",
//                 backgroundColor: "#f5f5f4",
//                 borderRadius: "0.5rem"
//               }}
//               className="md:h-[500px]"
//             />
//           )}
//         </div>

//          {/* Pre-built GLB Models Section (below GLB viewer, above features) */}
//         <div className="mt-10 bg-white p-4 md:p-8 rounded-lg shadow-lg">
//           <h3 className="text-xl md:text-2xl font-semibold mb-6 text-stone-800">Pre-built 3D Models</h3>
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
//             {prebuiltModels.map((model, index) => (
//               <div key={index} className="bg-stone-100 rounded-lg overflow-hidden shadow-md">
//                 <model-viewer
//                   src={model.path}
//                   alt={`Pre-built 3D model: ${model.name}`}
//                   camera-controls
//                   auto-rotate
//                   shadow-intensity="1"
//                   style={{
//                     width: "100%",
//                     height: "200px",
//                     backgroundColor: "#f5f5f4"
//                   }}
//                   className="md:h-[300px]"
//                 />
//                 <p className="text-center py-2 text-stone-800">{model.name}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="py-12 md:py-16 bg-stone-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
//             Advanced Features
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div key={index} className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
//                 <div className="mb-4">{feature.icon}</div>
//                 <h3 className="text-lg md:text-xl font-serif text-stone-800 mb-2">{feature.title}</h3>
//                 <p className="text-stone-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Available Artifacts */}
//       <section className="py-12 md:py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-2xl md:text-3xl font-serif text-center text-stone-800 mb-12">
//             Available in AR
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {artifacts.map((artifact, index) => (
//               <div key={index} className="bg-stone-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
//                 <div className="relative">
//                   <iframe
//                     src={artifact.video}
//                     title={artifact.title}
//                     className="w-full h-48"
//                     frameBorder="0"
//                     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                     allowFullScreen
//                   ></iframe>
//                   {artifact.available && (
//                     <div className="absolute top-4 right-4 bg-amber-700 text-white text-sm px-3 py-1 rounded-full">
//                       AR Ready
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-lg md:text-xl font-serif text-stone-800 mb-2">{artifact.title}</h3>
//                   <p className="text-stone-600 mb-4">{artifact.period}</p>
//                   <button
//                     className="w-full bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
//                     onClick={() => setPopupVideo(artifact.video)}
//                   >
//                     View in AR
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Full-Screen Popup */}
//       {popupVideo && (
//         <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//           <div className="relative w-11/12 md:w-3/4 lg:w-1/2 bg-white rounded-lg overflow-hidden">
//             <button
//               className="absolute top-4 right-4 text-black bg-gray-300 hover:bg-gray-400 rounded-full p-2"
//               onClick={() => setPopupVideo(null)}
//             >
//               ✕
//             </button>
//             <iframe
//               src={popupVideo}
//               title="Full Screen Video"
//               className="w-full h-64 md:h-96"
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ARExperience;