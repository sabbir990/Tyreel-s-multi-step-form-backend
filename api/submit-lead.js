// api/submit-lead.js
import axios from "axios";

export default async function handler(req, res) {
  // Allow requests only from your GitHub Pages URL
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
      price: obj.price
    };

    console.log("Sending to SmartMoving:", submissionData);

    const response = await axios.post(
      process.env.SMARTMOVING_BASE_URL,
      submissionData,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json({ success: true, data: response.data });

  } catch (error) {
    console.error("Error sending to SmartMoving:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
}
