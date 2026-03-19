import React, { useState, ChangeEvent, useRef } from "react";
import { FaInfoCircle, FaUpload, FaSpinner, FaTrash, FaCamera } from "react-icons/fa";


const DiscoverArtifact: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [capturing, setCapturing] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const resultSectionRef = useRef<HTMLDivElement | null>(null);

  const [isReading, setIsReading] = useState<boolean>(false);

  const readAloud = (text: string) => {
    if ("speechSynthesis" in window) {
      if (isReading) {
        window.speechSynthesis.cancel();
        setIsReading(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsReading(false);
        utterance.onerror = () => setIsReading(false);
        setIsReading(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert("Sorry, your browser does not support text-to-speech.");
    }
  };
  



  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setCapturing(false);
  };

const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleAnalyze = async () => {
    if (!image) {
      alert("Please upload or capture an image first.");
      return;
    }
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append("image", image);
  
    try {
      const response = await fetch(`${apiUrl}/analyze`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
  
        // Ensure the scroll happens after the state update and render.
        setTimeout(() => {
          resultSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // Small delay to wait for re-render
      } else {
        setError("Error processing the image.");
      }
    } catch (error) {
      setError("An error occurred while analyzing the image.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const parseResult = (result: string | null) => {
    if (!result) return null;

    const sanitizedResult = result.replace(/\*/g, "");
    const lines = sanitizedResult.split("\n").filter((line) => line.trim() !== "");

    return lines.map((line) => {
      const [key, ...valueParts] = line.split(":");
      return { key: key.trim(), value: valueParts.join(":").trim() };
    });
  };

  const structuredResult = parseResult(result);

  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((i) => i !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  // Capture image from camera
  const startCamera = () => {
    setCapturing(true);
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err);
        setError("Could not access the camera.");
      });
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const capturedImage = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
            setImage(capturedImage);
          }
        }, "image/jpeg");
        setCapturing(false);
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif mb-6">Discover Artifacts</h1>
            <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
              Upload images of artifacts to unlock their history using our advanced AI recognition technology.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-lg p-12 text-center">
              {image ? (
                <div className="space-y-4">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="max-h-64 mx-auto"
                  />
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className={`bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loading && (
                        <FaSpinner className="animate-spin mr-2 text-white" />
                      )}
                      {loading ? "Analyzing..." : "Analyze Artifact"}
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FaTrash className="" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block cursor-pointer">
                    <span className="bg-amber-700 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-amber-800 transition-colors">
                      <FaUpload className="mr-2" />
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
                    Supported formats: JPG
                  </p>
                </div>
              )}

              {/* Capture Image Button */}
              {!capturing && !image && (
                <button
                  onClick={startCamera}
                  className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors w-[100%]"
                >
                  <FaCamera className="mr-2" />
                  Capture Artifact Image
                </button>
              )}

              {/* Video Stream and Capture Button */}
              {capturing && (
                <div className="mt-6">
                  <video
                    ref={videoRef}
                    autoPlay
                    width="100%"
                    height="auto"
                    className="border-2 border-stone-300 rounded-lg"
                  />
                  <canvas
                    ref={canvasRef}
                    width={640}
                    height={480}
                    style={{ display: "none" }}
                  />
                  <div className="flex justify-center gap-4 mt-4">
                    <button
                      onClick={captureImage}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Capture
                    </button>
                    <button
                      onClick={handleRemoveImage}
                      className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {structuredResult && (
        <section ref={resultSectionRef} className="py-6 bg-stone-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif mb-4 text-center">Analysis Result</h2>
          <div className="text-center mb-8">
          <button
            onClick={() =>
              structuredResult &&
              readAloud(
                structuredResult.map((item) => `${item.key}: ${item.value}`).join(". ")
              )
            }
            className={`px-4 py-2 text-white rounded-lg ${
              isReading ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            } transition`}
          >
            {isReading ? "Stop Reading" : "Read Aloud"}
          </button>

          </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {structuredResult
                .filter((item) => item.value.trim() !== "") // Filter out empty boxes
                .map((item, index) => {
                  const isExpanded = expandedItems.includes(index);
                  const words = item.value.split(" ");
                  const isLongText = words.length > 60;
                  const previewText = words.slice(0, 60).join(" ");

                  return (
                    <div
                      key={index}
                      className="bg-stone-800 p-6 rounded-lg shadow-lg flex flex-col items-start space-y-4 transition-transform transform hover:scale-105 hover:shadow-2xl"
                    >
                      <div className="flex items-start space-x-4">
                        <FaInfoCircle className="text-amber-500 text-2xl flex-shrink-0 transform transition-transform hover:scale-125" />
                        <h3 className="text-lg font-semibold text-stone-100">{item.key}</h3>
                      </div>
                      <p className="text-stone-300 transition-all duration-300 ease-in-out">
                        {isExpanded || !isLongText ? item.value : `${previewText}...`}
                      </p>
                      {isLongText && (
                        <button
                          onClick={() => toggleExpand(index)}
                          className="text-amber-500 text-sm font-semibold focus:outline-none mt-2 transform transition-all hover:scale-110"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </div>
                  );
                  
                })}
            </div>
          </div>
        </section>
      )}

      {error && (
        <div className="bg-red-500 text-white text-center py-4 mt-4">
          {error}
        </div>
      )}
    </>
  );
};

export default DiscoverArtifact;










