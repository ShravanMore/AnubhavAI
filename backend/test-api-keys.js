const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// API Keys from .env
const GOOGLE_GEN_AI_KEY = process.env.GOOGLE_GEN_AI_KEY;
const GOOGLE_RESTORATION_API_KEY = process.env.GOOGLE_RESTORATION_API_KEY;
const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
const COMET_API_KEY = process.env.COMET_API_KEY;
const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

console.log("🔍 Testing API Keys...\n");

// Test 1: Google Gemini AI (for Discover Artifacts & Climate Impact)
async function testGoogleGeminiAI() {
  console.log("1️⃣ Testing GOOGLE_GEN_AI_KEY (Gemini 2.5 Flash)...");
  try {
    const genAI = new GoogleGenerativeAI(GOOGLE_GEN_AI_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent("Say 'API Working' in 2 words");
    const response = await result.response;
    console.log("   ✅ WORKING - Response:", response.text().substring(0, 50));
    console.log("   📍 Used in: /analyze (Discover Artifacts), /climate-impact\n");
    return true;
  } catch (error) {
    console.log("   ❌ FAILED -", error.message);
    console.log("   📍 Used in: /analyze (Discover Artifacts), /climate-impact\n");
    return false;
  }
}

// Test 2: Google Restoration API Key
async function testGoogleRestorationAPI() {
  console.log("2️⃣ Testing GOOGLE_RESTORATION_API_KEY (Gemini 2.5 Flash Image)...");
  try {
    // Create a simple test image (1x1 pixel)
    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    const requestBody = {
      contents: [{
        parts: [
          { text: "Describe this image in one word" },
          {
            inline_data: {
              mime_type: "image/png",
              data: testImageBase64
            }
          }
        ]
      }]
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GOOGLE_RESTORATION_API_KEY}`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log("   ✅ WORKING - API responded successfully");
    console.log("   📍 Currently NOT USED (switched to Comet API)\n");
    return true;
  } catch (error) {
    console.log("   ❌ FAILED -", error.response?.data?.error?.message || error.message);
    console.log("   📍 Currently NOT USED (switched to Comet API)\n");
    return false;
  }
}

// Test 3: Stability AI (for AR Experience)
async function testStabilityAI() {
  console.log("3️⃣ Testing STABILITY_API_KEY (Stable Fast 3D)...");
  try {
    // Just test authentication with a HEAD request or simple validation
    const response = await axios.get("https://api.stability.ai/v2beta/user/account", {
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
      },
      validateStatus: () => true
    });

    if (response.status === 200 || response.status === 401) {
      if (response.status === 200) {
        console.log("   ✅ WORKING - Account verified");
      } else {
        console.log("   ⚠️  AUTHENTICATION FAILED - Invalid API key");
      }
    }
    console.log("   📍 Used in: /api/convert (AR Experience - 2D to 3D conversion)\n");
    return response.status === 200;
  } catch (error) {
    console.log("   ❌ FAILED -", error.message);
    console.log("   📍 Used in: /api/convert (AR Experience - 2D to 3D conversion)\n");
    return false;
  }
}

// Test 4: Comet API (for Restoration)
async function testCometAPI() {
  console.log("4️⃣ Testing COMET_API_KEY (Gemini 2.5 Flash Image via Comet)...");
  try {
    const testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    const requestBody = {
      contents: [{
        role: "user",
        parts: [
          { text: "Describe this image" },
          {
            inline_data: {
              mime_type: "image/png",
              data: testImageBase64
            }
          }
        ]
      }]
    };

    const response = await axios.post(
      'https://api.cometapi.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent',
      requestBody,
      {
        headers: {
          'Authorization': `Bearer ${COMET_API_KEY}`,
          'Content-Type': 'application/json'
        },
        validateStatus: () => true
      }
    );

    if (response.status === 200) {
      console.log("   ✅ WORKING - API responded successfully");
    } else {
      console.log("   ⚠️  FAILED - Status:", response.status, response.data?.error?.message || "");
    }
    console.log("   📍 Used in: /reconstruct (Restoration feature)\n");
    return response.status === 200;
  } catch (error) {
    console.log("   ❌ FAILED -", error.response?.data?.error?.message || error.message);
    console.log("   📍 Used in: /reconstruct (Restoration feature)\n");
    return false;
  }
}

// Test 5: Cloudinary
async function testCloudinary() {
  console.log("5️⃣ Testing CLOUDINARY credentials...");
  try {
    const cloudinary = require("cloudinary").v2;
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: CLOUD_API_KEY,
      api_secret: CLOUD_API_SECRET,
    });

    // Test by fetching account details
    const response = await axios.get(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`,
      {
        auth: {
          username: CLOUD_API_KEY,
          password: CLOUD_API_SECRET
        },
        validateStatus: () => true
      }
    );

    if (response.status === 200) {
      console.log("   ✅ WORKING - Cloudinary authenticated");
    } else {
      console.log("   ⚠️  FAILED - Status:", response.status);
    }
    console.log("   📍 Used in: Image hosting/storage (currently in code but may not be actively used)\n");
    return response.status === 200;
  } catch (error) {
    console.log("   ❌ FAILED -", error.message);
    console.log("   📍 Used in: Image hosting/storage\n");
    return false;
  }
}

// Run all tests
async function runAllTests() {
  const results = {
    googleGemini: await testGoogleGeminiAI(),
    googleRestoration: await testGoogleRestorationAPI(),
    stability: await testStabilityAI(),
    comet: await testCometAPI(),
    cloudinary: await testCloudinary()
  };

  console.log("=" .repeat(60));
  console.log("📊 SUMMARY");
  console.log("=" .repeat(60));
  console.log(`✅ Google Gemini AI (Discover/Climate): ${results.googleGemini ? "WORKING" : "FAILED"}`);
  console.log(`${results.googleRestoration ? "✅" : "⚠️ "} Google Restoration API: ${results.googleRestoration ? "WORKING (Not Used)" : "FAILED (Not Used)"}`);
  console.log(`${results.stability ? "✅" : "❌"} Stability AI (AR Experience): ${results.stability ? "WORKING" : "FAILED"}`);
  console.log(`${results.comet ? "✅" : "❌"} Comet API (Restoration): ${results.comet ? "WORKING" : "FAILED"}`);
  console.log(`${results.cloudinary ? "✅" : "❌"} Cloudinary: ${results.cloudinary ? "WORKING" : "FAILED"}`);
  console.log("=" .repeat(60));
}

runAllTests();
