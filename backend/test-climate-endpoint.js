const axios = require("axios");

async function testClimateEndpoint() {
  console.log("🧪 Testing Climate Impact Endpoint...\n");
  
  try {
    const response = await axios.post("http://localhost:5000/climate-impact", {
      artifactName: "Taj Mahal"
    });
    
    console.log("✅ SUCCESS - Climate Impact endpoint is working!");
    console.log("Response:", response.data.analysis.substring(0, 200) + "...\n");
  } catch (error) {
    console.log("❌ FAILED - Climate Impact endpoint error");
    console.log("Error:", error.response?.data || error.message);
    console.log("\nStatus:", error.response?.status);
    console.log("Full error:", error.response?.data || error.message);
  }
}

testClimateEndpoint();
