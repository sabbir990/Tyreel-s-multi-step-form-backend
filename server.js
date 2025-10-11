import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;
const SMARTMOVING_BASE_URL = process.env.SMARTMOVING_BASE_URL;

app.post("/api/submit-lead", async (req, res) => {
  try {
    const obj = req.body;

    // Map your submissionCRMObj to SmartMoving expected fields
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
      files: obj.files ? [obj.files] : [], // wrap in array if single file
      inventoryList: obj.inventory_list,
      price: obj.price
    };

    console.log("Sending to SmartMoving:", submissionData);

    // Send POST request to SmartMoving API
    const response = await axios.post(
      SMARTMOVING_BASE_URL, // already includes providerKey in the URL
      submissionData,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      success: true,
      message: "Lead successfully submitted to SmartMoving!",
      data: response.data,
    });
  } catch (error) {
    console.error("Error sending to SmartMoving:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send lead to SmartMoving",
      error: error.response?.data || error.message,
    });
  }
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
