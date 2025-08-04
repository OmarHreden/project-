import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/hotel.css";

export default function HotelsManager() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const fetchHotels = async () => {
  setLoading(true);
  try {
    const token = localStorage.getItem("token"); 
    const res = await axios.get("http://localhost:8080/super_admin/all-hotel", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setHotels(res.data);
    setFilteredHotels(res.data);
  } catch (err) {
    setError("Download failed");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSearch = () => {
    const filtered = hotels.filter(hotel =>
      hotel.hotelName.toLowerCase().includes(searchName.toLowerCase()) &&
      hotel.address.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      hotelName: hotel.hotelName || "",
      ownerEmail: hotel.ownerEmail || "",
      description: hotel.description || "",
      address: hotel.address || "",
      latitude: hotel.latitude || "",
      longitude: hotel.longitude || "",
      imageDTOS: hotel.imageDTOS || [],
    });
  };

  const [formData, setFormData] = useState({
    hotelName: "",
    ownerEmail: "",
    description: "",
    address: "",
    latitude: "",
    longitude: "",
    imageDTOS: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleUpdate = async () => {
  if (!selectedHotel) return;
  try {
    const token = localStorage.getItem("token");
   await axios.put("http://localhost:8080/super_admin/update-hotel", {
  hotelId: selectedHotel.hotelId,
  ...formData,
});

    alert("The hotel has been successfully update");
    setSelectedHotel(null);
    fetchHotels();
  } catch (err) {
    alert("failed updating");
  }
};


  const handleDelete = async () => {
  if (!selectedHotel) return;
  const confirmDelete = window.confirm("Are you sure you want to delete the hotel?");
  if (!confirmDelete) return;
    console.log(selectedHotel.hotelId);
  try {
    const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:8080/super_admin/delete-hotel?id=${selectedHotel.hotelId}`,

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("The hotel was deleted.");
    setSelectedHotel(null);
    fetchHotels();
  } catch (err) {
    alert("Failed to delete the hotel");
  }
};



  return (
    <div className="container-hotel">
      <h1 className="title-hotel"> Hotel Management</h1>

      {/* مربع البحث */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="search name hotel"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="search address hotel "
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button onClick={handleSearch} className="btn btn-update">
          بحث
        </button>
      </div>

      {loading && <p>Loading hotels....</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* قائمة الفنادق */}
      <div className="hotels-list">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="hotel-card"
            onClick={() => selectHotel(hotel)}
          >
            <img
              src={hotel.imageDTOS[0]?.url || "/no-image.jpg"}
              alt={hotel.hotelName}
              className="hotel-image"
            />
            <h3 className="hotel-name">{hotel.hotelName}</h3>
            <p className="hotel-location">{hotel.address}</p>
          </div>
        ))}
      </div>

      {/* نموذج تعديل الفندق */}
      {selectedHotel && (
        <div className="form-container-hotel">
          <h2 className="form-title-hotel">
            Editing hotel data: {selectedHotel.hotelName}
          </h2>

          <label className="label-hotel">
            Name Hotel:
            <input
              className="input"
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleChange}
            />
          </label>

          <label className="label-hotel">
            The hotel's owner's email:
            <input
              className="input"
              type="email"
              name="ownerEmail"
              value={formData.ownerEmail}
              onChange={handleChange}
            />
          </label>

          <label className="label-hotel">
            address:
            <input
              className="input"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>

          <label className="label-hotel">
            description :
            <textarea
              className="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </label>

          <label className="label-hotel">
             latitude address hotel:
            <input
              className="input"
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </label>

          <label className="label-hotel">
             longitude address hotel:
            <input
              className="input"
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </label>

          <p>image hotel :</p>
          <div className="images-container-hotel">
            {formData.imageDTOS.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`صورة ${i + 1}`}
                className="thumbnail"
              />
            ))}
          </div>

          <div className="buttons-row-hotel">
            <button className="btn btn-update" onClick={handleUpdate}>
              update
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              delet
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => setSelectedHotel(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
