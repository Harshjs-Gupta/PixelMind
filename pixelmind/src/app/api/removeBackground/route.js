import axios from "axios";

export async function POST(req) {
  try {
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      console.error("Error: No imageUrl provided in the request.");
      return new Response("Image URL is required", {
        status: 400,
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*", // Allow all origins for testing
        },
      });
    }

    if (!process.env.REMOVE_BG_API_KEY) {
      console.error("Error: REMOVE_BG_API_KEY is not set in the environment.");
      return new Response(
        JSON.stringify({
          error: "Server configuration error. API key missing.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    console.log("Received imageUrl:", imageUrl);

    const requestData = imageUrl.startsWith("data:image")
      ? { image_file: imageUrl.split(",")[1] } // Extract base64 data after the comma
      : { image_url: imageUrl }; // Handle image URL

    // Call the Remove.bg API
    const response = await axios({
      method: "POST",
      url: "https://api.remove.bg/v1.0/removebg",
      headers: {
        "X-Api-Key": process.env.REMOVE_BG_API_KEY,
      },
      data: {
        ...requestData,
        size: "auto", // Use auto size for background removal
      },
      responseType: "arraybuffer", // Expect binary response
    });

    console.log("Remove.bg API responded with status:", response.status);

    // Return the processed image as PNG
    return new Response(response.data, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'inline; filename="background-removed.png"',
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error(
      "Error calling Remove.bg API:",
      error.response?.data || error.message,
    );

    const errorMessage =
      error.response?.data?.errors?.[0]?.message ||
      "Failed to process the image. Please ensure the URL points to a valid image format.";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: error.response?.status || 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
}
