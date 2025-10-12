import axios from "axios";

export default async function handler(req, res) {
  // ✅ Always set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://sabbir990.github.io");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Must handle preflight (OPTIONS) before anything else
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Reject unsupported methods
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const obj = req.body;

    const submissionData = {
      firstName: obj.first_name,
      lastName: obj.last_name,
      email: obj.email,
      phone: obj.phone,
      contactMethod: obj.contact_method,
      laborOnly: obj.labor_only,
      laborAndTruck: obj.labor_and_truck,
      movingDate: obj.moving_date,
      movingTime: obj.moving_time,
      pickupLocation: obj.pickup_location,
      address: obj.address,
      flightsOfStairs: obj.flights_of_stairs,
      elevator: obj.elevator,
      apartment: obj.apartment,
      dropOffLocation: obj.drop_off_location,
      dropOffLocation2: obj.drop_off_location_2,
      files: obj.files ? [obj.files] : [],
      inventoryList: obj.inventory_list,
      price: obj.price,
    };

    console.log("Sending to SmartMoving:", submissionData);

    const response = await axios.post(
      process.env.SMARTMOVING_BASE_URL,
      submissionData,
      { headers: { "Content-Type": "application/json" } }
    );

    // ✅ Always return success with CORS header
    res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    console.error("Error sending to SmartMoving:", error.response?.data || error.message);

    // ✅ Even errors need the CORS header to reach frontend
    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
}
