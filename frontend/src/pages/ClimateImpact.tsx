
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { ReactCompareSlider } from "react-compare-slider";
import tajmahalafter50 from '../assets/tajmahalafter50years.jpg'


interface CaseStudy {
  name: string;
  currentImage: string;
  futureImage: string;
  impact: string;
  measures: string;
  status: string;
  riskData: { year: number; risk: number }[];
  factors: { factor: string; value: number }[];
}

const ClimateImpact: React.FC = () => {
  const [artifactName, setArtifactName] = useState<string>("");
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [simulatedData, setSimulatedData] = useState<{
    riskTimeline: { year: number; risk: number }[];
    factors: { factor: string; value: number }[];
  } | null>(null);

  // Log API URL on component mount
  React.useEffect(() => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    console.log("🌍 Climate Impact Component Mounted");
    console.log("🔧 Backend URL:", apiUrl);
    console.log("🔧 All env vars:", import.meta.env);
  }, []);

  const caseStudies: CaseStudy[] = [
    {
      name: "Taj Mahal, India",
      currentImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      futureImage: tajmahalafter50,
      impact: "Air pollution and acid rain are yellowing the marble surface. Extreme temperature fluctuations are causing thermal stress and micro-cracks.",
      measures: "Installation of air purifiers and implementation of strict pollution control in surrounding areas.",
      status: "Moderate Risk",
      riskData: [
        { year: 2000, risk: 20 },
        { year: 2010, risk: 35 },
        { year: 2020, risk: 50 },
        { year: 2030, risk: 65 },
      ],
      factors: [
        { factor: "Pollution", value: 85 },
        { factor: "Temperature", value: 75 },
        { factor: "Humidity", value: 60 },
      ]
    },
    {
      name: "Venice Historical Center, Italy",
      currentImage: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9",
      futureImage: "tajmahalafter50years",
      impact: "Increasing frequency of acqua alta (high water) events and rising sea levels are accelerating the deterioration of building foundations.",
      measures: "MOSE barrier system implementation and continuous monitoring of structural integrity.",
      status: "Critical Risk",
      riskData: [
        { year: 2000, risk: 40 },
        { year: 2010, risk: 55 },
        { year: 2020, risk: 70 },
        { year: 2030, risk: 85 },
      ],
      factors: [
        { factor: "Sea Level", value: 90 },
        { factor: "Humidity", value: 80 },
        { factor: "Salinity", value: 75 },
      ]
    },
  ];

  const apiUrl = import.meta.env.VITE_BACKEND_URL;
  
  console.log("🔧 Climate Impact - API URL:", apiUrl);
  
  const fetchClimateImpact = async () => {
    console.log("🌍 Starting Climate Impact Analysis...");
    console.log("📝 Artifact Name:", artifactName);
    console.log("🔗 API URL:", apiUrl);
    
    setLoading(true);
    setError(null);
    setAnalysis(null);
    setSimulatedData(null);

    try {
      const requestUrl = `${apiUrl}/climate-impact`;
      console.log("📡 Making request to:", requestUrl);
      console.log("📦 Request payload:", { artifactName });
      
      const response = await axios.post(requestUrl, {
        artifactName,
      });

      console.log("✅ Response received!");
      console.log("📊 Response status:", response.status);
      console.log("📄 Response data:", response.data);

      if (response.data.analysis) {
        const cleanedAnalysis = response.data.analysis.replace(/\*/g, "");
        console.log("✨ Analysis cleaned, length:", cleanedAnalysis.length);
        setAnalysis(cleanedAnalysis);
        
        // Simulate data extraction from analysis
        setSimulatedData({
          riskTimeline: [
            { year: 2023, risk: 40 },
            { year: 2030, risk: 55 },
            { year: 2040, risk: 70 },
            { year: 2050, risk: 85 },
          ],
          factors: [
            { factor: 'Temperature', value: 80 },
            { factor: 'Humidity', value: 65 },
            { factor: 'Pollution', value: 90 },
          ]
        });
        console.log("✅ Climate Impact Analysis Complete!");
      } else {
        console.warn("⚠️ No analysis data in response");
      }
    } catch (err: any) {
      console.error("❌ Error fetching climate impact:");
      console.error("Error message:", err.message);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      console.error("Full error:", err);
      setError("Failed to fetch climate impact analysis. Please try again.");
    } finally {
      setLoading(false);
      console.log("🏁 Climate Impact request finished");
    }
  };

  const parseAnalysis = (analysis: string | null) => {
    if (!analysis) return [];
    const sanitizedResult = analysis.replace(/\*/g, "");
    const lines = sanitizedResult.split("\n").filter((line) => line.trim() !== "");

    const sections: { title: string; content: string }[] = [];
    let currentTitle = "";
    let currentContent = "";

    lines.forEach((line) => {
      if (line.includes(":")) {
        if (currentTitle) {
          sections.push({ title: currentTitle, content: currentContent });
        }
        const [key, ...valueParts] = line.split(":");
        currentTitle = key.trim();
        currentContent = valueParts.join(":").trim();
      } else {
        currentContent += `\n${line.trim()}`;
      }
    });

    if (currentTitle) {
      sections.push({ title: currentTitle, content: currentContent });
    }

    return sections;
  };

  const getRiskColor = (status: string) => {
    const colors = {
      'High Risk': 'bg-orange-100 text-orange-800 border-orange-200',
      'Moderate Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Critical Risk': 'bg-red-100 text-red-800 border-red-200',
      'Normal Risk': 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[status as keyof typeof colors] || 'bg-blue-100 text-blue-800 border-blue-200';
  };

  const RiskMeter = ({ value }: { value: number }) => (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-400 via-yellow-500 to-red-600 transition-all duration-500" 
        style={{ width: `${value}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
        {value}% Risk Level
      </div>
    </div>
  );

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-serif mb-6">
              Climate Impact Forecaster
            </h1>
            <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
              Predictive analytics for cultural heritage preservation against climate change
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                className="w-full px-6 py-4 rounded-lg bg-stone-800 text-white placeholder-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter cultural heritage site or artifact..."
                value={artifactName}
                onChange={(e) => setArtifactName(e.target.value)}
              />
              <button
                onClick={fetchClimateImpact}
                className={`mt-4 w-full py-3 rounded-lg transition-all ${
                  loading ? 'bg-amber-800 cursor-not-allowed' : 'bg-amber-700 hover:bg-amber-600'
                } text-white font-medium`}
                disabled={loading || !artifactName.trim()}
              >
                {loading ? 'Analyzing...' : 'Assess Preservation Risks'}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Case Studies Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center">
            Historical Preservation Case Studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <ReactCompareSlider
                    itemOne={<img src={study.currentImage} className="w-full h-48 object-cover" />}
                    itemTwo={<img src={study.futureImage} className="w-full h-48 object-cover" />}
                    className="rounded-lg"
                  />
                </div>
                <div className="p-6">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 border ${getRiskColor(study.status)}`}>
                    {study.status}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{study.name}</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-stone-800 mb-2">Climate Impact:</h4>
                      <p className="text-stone-600 text-sm">{study.impact}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-stone-800 mb-2">Protective Measures:</h4>
                      <p className="text-stone-600 text-sm">{study.measures}</p>
                    </div>
                    <div className="mt-4">
                      <BarChart width={300} height={150} data={study.riskData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="risk" fill="#e11d48" />
                      </BarChart>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Analysis Section */}
        {analysis && (
          <section className="mb-20">
            <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center">
              Analysis for {artifactName}
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Text Analysis */}
              <div className="space-y-6">
                {parseAnalysis(analysis).map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-6 rounded-xl shadow-lg"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-amber-700">{section.title}</h3>
                    <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Data Visualizations */}
              <div className="space-y-8">
                {simulatedData && (
                  <>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-4">Risk Projection Timeline</h3>
                      <RiskMeter value={75} />
                      <LineChart
                        width={500}
                        height={300}
                        data={simulatedData.riskTimeline}
                        className="mt-6"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="risk" 
                          stroke="#e11d48"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <h3 className="text-xl font-semibold mb-4">Primary Threat Factors</h3>
                      <BarChart
                        width={500}
                        height={300}
                        data={simulatedData.factors}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="factor" />
                        <YAxis />
                        <Tooltip />
                        <Bar 
                          dataKey="value" 
                          fill="#059669"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Image Comparison */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Projected Impact Visualization</h3>
              <ReactCompareSlider
                itemOne={<img src={caseStudies[0].currentImage} className="w-full h-96 object-cover" />}
                itemTwo={<img src={caseStudies[0].futureImage} className="w-full h-96 object-cover" />}
                className="rounded-lg border-4 border-white"
              />
              <p className="text-sm text-stone-500 mt-3 text-center">
                Drag to compare current state with 2050 climate impact projection
              </p>
            </div>
          </section>
        )}

        {/* Error Handling */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg"
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ClimateImpact;







// // OG

// import React, { useState } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaLeaf, FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

// const ClimateImpact: React.FC = () => {
//   const [artifactName, setArtifactName] = useState<string>("");
//   const [analysis, setAnalysis] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const caseStudies = [
    
//     {
//       name: "Taj Mahal, India",
//       image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3",
//       impact: "Air pollution and acid rain are yellowing the marble surface. Extreme temperature fluctuations are causing thermal stress and micro-cracks.",
//       measures: "Installation of air purifiers and implementation of strict pollution control in surrounding areas.",
//       status: "Moderate Risk"
//     },
//     {
//       name: "Venice Historical Center, Italy",
//       image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-4.0.3",
//       impact: "Increasing frequency of acqua alta (high water) events and rising sea levels are accelerating the deterioration of building foundations.",
//       measures: "MOSE barrier system implementation and continuous monitoring of structural integrity.",
//       status: "Critical Risk"
//     },
//     {
//       name: "Angkor Wat, Cambodia",
//       image: "https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcTPFRTMROSGjNn89TE9zt-00ZcGywGZaQZWu4p3KI8x7SW4UBltxvgGCpnnWs-Hlpl0Tn-EeFyYJC2npu0DKoxUdw1j38Z8OZkddOfA0g",
//       impact: "Increased rainfall and humidity are promoting biological growth on stone surfaces. Groundwater changes are affecting structural stability.",
//       measures: "Advanced drainage systems and biological growth treatment protocols.",
//       status: "Normal Risk"
//     },
//   ];

//   const fetchClimateImpact = async () => {
//     setLoading(true);
//     setError(null);
//     setAnalysis(null);

//     try {
//       const response = await axios.post("http://localhost:5001/climate-impact", {
//         artifactName,
//       });

//       console.log(artifactName);

//       if (response.data.analysis) {
//         const cleanedAnalysis = response.data.analysis.replace(/\*/g, "");
//         setAnalysis(cleanedAnalysis);
//       } else {
//         setError("No analysis available. Please try again.");
//       }
//     } catch (err: any) {
//       console.error("Error fetching climate impact:", err.message);
//       setError("Failed to fetch climate impact analysis. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const parseAnalysis = (analysis: string | null) => {
//     if (!analysis) return [];

//     const sanitizedResult = analysis.replace(/\*/g, "");
//     const lines = sanitizedResult.split("\n").filter((line) => line.trim() !== "");

//     const sections: { title: string, content: string }[] = [];
//     let currentTitle = "";
//     let currentContent = "";

//     lines.forEach((line) => {
//       if (line.includes(":")) {
//         if (currentTitle) {
//           sections.push({ title: currentTitle, content: currentContent });
//         }
//         const [key, ...valueParts] = line.split(":");
//         currentTitle = key.trim();
//         currentContent = valueParts.join(":").trim();
//       } else {
//         currentContent += `\n${line.trim()}`;
//       }
//     });

//     if (currentTitle) {
//       sections.push({ title: currentTitle, content: currentContent });
//     }

//     return sections;
//   };

//   const structuredAnalysis = parseAnalysis(analysis);

//   const getRiskColor = (status: string) => {
//     const colors = {
//       'High Risk': 'bg-orange-100 text-orange-800 border-orange-200',
//       'Moderate Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
//       'Critical Risk': 'bg-red-100 text-red-800 border-red-200',
//       'Normal Risk': 'bg-green-100 text-black-800 border-purple-200'
//     };
//     return colors[status as keyof typeof colors] || 'bg-blue-100 text-blue-800 border-blue-200';
//   };

//   return (
//     <div>
//       {/* Hero Section */}
//       <section className="bg-stone-900 text-white py-20">
//         <div className="max-w-7xl mx-auto px-4 pt-20 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-serif mb-6 animate__animated animate__fadeIn">
//               Climate Impact Forecasting
//             </h1>
//             <p className="text-xl text-stone-300 mb-12 max-w-2xl mx-auto">
//               Predict risk and protect cultural artifacts against environmental damage.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Case Studies Section */}
//       <section className="py-16 bg-stone-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-serif text-stone-800 mb-4">Notable Case Studies</h2>
//             <p className="text-lg text-stone-600">
//               Examining climate impact on significant historical sites and artifacts
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {caseStudies.map((study, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={study.image}
//                     alt={study.name}
//                     className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
//                     <div className="absolute bottom-4 left-4 right-4">
//                       <h3 className="text-xl font-serif text-white">{study.name}</h3>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="p-6">
//                   <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 border ${getRiskColor(study.status)}`}>
//                     {study.status}
//                   </div>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="text-sm font-semibold text-stone-800 mb-2">Climate Impact:</h4>
//                       <p className="text-stone-600 text-sm">{study.impact}</p>
//                     </div>
//                     <div>
//                       <h4 className="text-sm font-semibold text-stone-800 mb-2">Protective Measures:</h4>
//                       <p className="text-stone-600 text-sm">{study.measures}</p>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <div className="p-6 bg-gray-50 min-h-screen">
//         <h1 className="text-2xl font-bold mb-4 text-center">Climate Impact Analysis</h1>

//         {/* Input Section */}
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
//           <label htmlFor="artifactName" className="block font-medium mb-2">
//             Enter Artifact Name:
//           </label>
//           <input
//             type="text"
//             id="artifactName"
//             className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
//             placeholder="e.g., Taj Mahal"
//             value={artifactName}
//             onChange={(e) => setArtifactName(e.target.value)}
//           />
//           <button
//             onClick={fetchClimateImpact}
//             className="w-full text-white py-2 rounded-lg bg-amber-700 hover:bg-amber-800"
//             disabled={loading || !artifactName.trim()}
//           >
//             {loading ? "Fetching..." : "Get Climate Impact Analysis"}
//           </button>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="mt-4 max-w-md mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//             {error}
//           </div>
//         )}

//         {/* Analysis Section with Animation */}
//         <div className="mt-6 max-w-2xl mx-auto bg-gray-100 p-6 rounded-lg shadow-md">
//           {structuredAnalysis.map((section, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: -100 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.6, delay: index * 0.3 }}
//               className="mb-6"
//             >
//               <h2 className="text-xl font-bold mb-2 text-gray-700 flex items-center">
//                 {section.title}
//               </h2>
//               <div className="p-4 bg-white text-lg rounded-lg shadow-sm">
//                 <p className="whitespace-pre-line">{section.content}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClimateImpact;








