// Fully working restoration page
import React, { useState } from "react";
import axios from "axios";
import { Upload, Loader2 } from 'lucide-react';

// Add loading state types
type LoadingState = 'idle' | 'uploading' | 'processing' | 'complete' | 'error';

const Restoration: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [restoredImageUrl, setRestoredImageUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setError("Image size should be less than 10MB");
        return;
      }
      
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setRestoredImageUrl(null);
      setError(null);
      setLoadingState('idle');
    }
  };

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleRestore = async () => {
    if (!image) return;

    setLoadingState('uploading');
    setError(null);
    setProgress(0);

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(`${apiUrl}/reconstruct`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 100));
          setProgress(percentCompleted);
        },
        validateStatus: (status) => status < 500,
      });

      setLoadingState('processing');

      if (response.data.success) {
        setRestoredImageUrl(`${apiUrl}${response.data.restoredImageUrl}`);
        setLoadingState('complete');
        console.log("Restoration successful:", response.data);
      } else {
        throw new Error(response.data.error || "Failed to restore image");
      }
    } catch (err: any) {
      console.error("Restoration error:", err);
      setError(
        err.response?.data?.error || 
        err.response?.data?.details || 
        "Failed to process the request. Please try again."
      );
      setLoadingState('error');
    }
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif mb-6">AI Artifact Restoration</h1>
          <p className="text-xl text-stone-300 mb-12">
            Restore damaged or tarnished artifacts to their original glory using AI
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-8">
            {/* Image Upload */}
            <div className="text-center">
              <label className="block cursor-pointer">
                <span className="bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors mx-auto w-64">
                  <Upload className="mr-2" />
                  Upload Artifact Image
                </span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              <p className="mt-2 text-sm text-stone-500">
                Supported formats: JPG, PNG
              </p>
            </div>

            {/* Image Preview & Results */}
            {(previewUrl || restoredImageUrl) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Original Image */}
                {previewUrl && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Original Image</h3>
                    <div className="border border-stone-200 rounded-lg overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Original"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Restored Image */}
                {restoredImageUrl && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">Restored Image</h3>
                    <div className="border border-stone-200 rounded-lg overflow-hidden">
                      <img
                        src={restoredImageUrl}
                        alt="Restored"
                        className="w-full h-64 object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Restore Button */}
            {image && loadingState === 'idle' && (
              <button
                onClick={handleRestore}
                className="bg-amber-700 text-white px-8 py-3 rounded-lg hover:bg-amber-800 transition-colors w-full"
              >
                Restore Artifact
              </button>
            )}

            {/* Loading State */}
            {loadingState !== 'idle' && loadingState !== 'complete' && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="animate-spin" />
                <div className="text-sm text-stone-600">
                  {loadingState === 'uploading' ? (
                    <span>Uploading image... {progress}%</span>
                  ) : (
                    <span>Restoring image using AI...</span>
                  )}
                </div>
                <div className="w-64 h-2 bg-stone-200 rounded-full">
                  <div 
                    className="h-full bg-amber-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-center">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restoration;









// // Fully working restoration page
// import React, { useState } from "react";
// import axios from "axios";


// const Reconstruction: React.FC = () => {
//   const [image, setImage] = useState<File | null>(null);
//   const [reconstructedImageUrl, setReconstructedImageUrl] = useState<string | null>(null);
//   const [colorFlag, setColorFlag] = useState<boolean>(true);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const file = event.target.files[0];
//       setImage(file);
//       setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the uploaded image
//     }
//   };

//   const apiUrl = import.meta.env.VITE_BACKEND_URL;

//   const handleSubmit = async () => {
//     if (!image) {
//       alert("Please upload an image first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", image);
//     formData.append("color_flag", colorFlag.toString());

//     try {
//       setLoading(true);
//       const response = await axios.post(`${apiUrl}/reconstruct`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setReconstructedImageUrl(response.data.data["2k"].url);
//     } catch (error) {
//       console.error("Error reconstructing image:", error);
//       alert("Failed to reconstruct the image. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="bg-stone-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-serif mb-6">AI-Powered Restoration</h1>
//             <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
//               Digitally restore and preserve cultural artifacts
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <div className="bg-stone-50 min-h-screen py-16">
//         <div className="max-w-4xl mx-auto bg-white/90 shadow-lg rounded-lg p-8">
//           <h2 className="text-3xl font-serif text-stone-800 text-center mb-8">Image Reconstruction</h2>
//           <div className="mb-6">
//             <input
//               type="file"
//               accept="image/jpeg, image/png, image/webp"
//               onChange={handleFileChange}
//               className="border border-stone-300 rounded p-2 w-full"
//             />
//           </div>
//           <div className="flex items-center justify-between mb-6">
//             <label className="text-stone-800 font-medium">Recolor the image?</label>
//             <input
//               type="checkbox"
//               checked={colorFlag}
//               onChange={(e) => setColorFlag(e.target.checked)}
//               className="w-5 h-5 accent-amber-700"
//             />
//           </div>
//           <button
//             onClick={handleSubmit}
//             className={`w-full py-3 px-6 bg-amber-700 text-white font-bold rounded hover:bg-amber-800 transition ${
//               loading ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Reconstructing..." : "Reconstruct"}
//           </button>

//           {/* Image Display Section */}
//           {(previewUrl || reconstructedImageUrl) && (
//             <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-8">
//               {/* Uploaded Image */}
//               {previewUrl && (
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-medium text-stone-800 mb-4">Uploaded Image</h3>
//                   <div className="w-64 h-64 border border-stone-300 rounded overflow-hidden">
//                     <img
//                       src={previewUrl}
//                       alt="Uploaded"
//                       className="object-contain w-full h-full"
//                     />
//                   </div>
//                 </div>
//               )}

//               {/* Reconstructed Image */}
//               {reconstructedImageUrl && (
//                 <div className="flex flex-col items-center">
//                   <h3 className="text-lg font-medium text-stone-800 mb-4">Reconstructed Image</h3>
//                   <div className="w-64 h-64 border border-stone-300 rounded overflow-hidden">
//                     <img
//                       src={reconstructedImageUrl}
//                       alt="Reconstructed"
//                       className="object-contain w-full h-full"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Reconstruction;
