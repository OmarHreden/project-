import React, { useState } from "react";
import "../Style/hotel.css";

const mockHotels = [
  {
    id: 1,
    name: "فندق السلام",
    email: "info@alsalamhotel.com",
    description: "فندق فاخر في وسط المدينة.",
    location: "وسط المدينة، القاهرة",
    latitude: 30.0444,
    longitude: 31.2357,
    images: [
      
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 2,
    name: "فندق jgj,d",
    email: "contact@luxuryhotel.com",
    description: "أجواء مريحة وخدمات ممتازة.",
    location: "مدينة نصر، القاهرة",
    latitude: 30.061,
    longitude: 31.277,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 3,
    name: "فندق السلام",
    email: "info@alsalamhotel.com",
    description: "فندق فاخر في وسط المدينة.",
    location: "وسط المدينة، القاهرة",
    latitude: 30.0444,
    longitude: 31.2357,
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e6e7e70c69?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 4,
    name: "فندق الرفاهية",
    email: "contact@luxuryhotel.com",
    description: "أجواء مريحة وخدمات ممتازة.",
    location: "مدينة نصر، القاهرة",
    latitude: 30.061,
    longitude: 31.277,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 5,
    name: "فندق السلام",
    email: "info@alsalamhotel.com",
    description: "فندق فاخر في وسط المدينة.",
    location: "وسط المدينة، القاهرة",
    latitude: 30.0444,
    longitude: 31.2357,
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e6e7e70c69?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 6,
    name: "فندق الرفاهية",
    email: "contact@luxuryhotel.com",
    description: "أجواء مريحة وخدمات ممتازة.",
    location: "مدينة نصر، القاهرة",
    latitude: 30.061,
    longitude: 31.277,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 7,
    name: "فندق السلام",
    email: "info@alsalamhotel.com",
    description: "فندق فاخر في وسط المدينة.",
    location: "وسط المدينة، القاهرة",
    latitude: 30.0444,
    longitude: 31.2357,
    images: [
      "https://images.unsplash.com/photo-1501117716987-c8e6e7e70c69?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 8,
    name: "فندق الرفاهية",
    email: "cdfdft@luxuryhotel.com",
    description: "أجواء مريحة وخدمات ممتازة.",
    location: "مدينة نصر، القاهرة",
    latitude: 30.061,
    longitude: 31.277,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=60",
    ],
  },
  {
    id: 9,
    name: "فندق النيل",
    email: "reservations@nilehotel.com",
    description: "إطلالة رائعة على نهر النيل.",
    location: "كورنيش النيل، القاهرة",
    latitude: 30.05,
    longitude: 31.2333,
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=400&q=60",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60",
    ],
  },
];

export default function HotelsManager() {
  const [hotels, setHotels] = useState(mockHotels);
  const [filteredHotels, setFilteredHotels] = useState(mockHotels); // إضافة
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [formData, setFormData] = useState(null);

  // البحث
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const handleSearch = () => {
    const filtered = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchName.toLowerCase()) &&
        hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const selectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setFormData({
      name: hotel.name || "",
      email: hotel.email || "",
      description: hotel.description || "",
      location: hotel.location || "",
      latitude: hotel.latitude || "",
      longitude: hotel.longitude || "",
      images: hotel.images || [],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!selectedHotel) return;

    const updatedHotels = hotels.map((hotel) =>
      hotel.id === selectedHotel.id ? { ...hotel, ...formData } : hotel
    );
    setHotels(updatedHotels);
    setFilteredHotels(updatedHotels); // التحديث مع النسخة المفلترة
    alert("تم تعديل بيانات الفندق (محلياً فقط)");
    setSelectedHotel(null);
  };

  const handleDelete = () => {
    if (!selectedHotel) return;
    const confirmDelete = window.confirm("هل أنت متأكد من حذف الفندق؟");
    if (!confirmDelete) return;

    const updatedHotels = hotels.filter((h) => h.id !== selectedHotel.id);
    setHotels(updatedHotels);
    setFilteredHotels(updatedHotels); // التحديث مع النسخة المفلترة
    alert("تم حذف الفندق (محلياً فقط)");
    setSelectedHotel(null);
  };

  return (
    <div className="container">
      {/* <h1 className="title">إدارة الفنادق (عرض تجريبي بدون API)</h1> */}

      {/* مربع البحث */}
      {!selectedHotel && (
        <div className="searc" style={{ marginBottom: "20px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="ابحث بالاسم"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <input
            type="text"
            placeholder="ابحث بالموقع"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            style={{ padding: "8px", marginRight: "10px" }}
          />
          <button
            onClick={handleSearch}
            className="btn btn-update"
          >
            بحث
          </button>
        </div>
      )}

      {/* قائمة الفنادق */}
      {!selectedHotel && (
        <div className="hotels-list">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hotel-card"
                onClick={() => selectHotel(hotel)}
              >
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  className="hotel-image"
                />
                <h3 className="hotel-name">{hotel.name}</h3>
                <p className="hotel-location">{hotel.location}</p>
              </div>
            ))
          ) : (
            <p>لا توجد فنادق مطابقة للبحث</p>
          )}
        </div>
      )}

      {selectedHotel && formData && (
        <div className="form-container">
          <h2 className="form-title">تعديل بيانات الفندق: {selectedHotel.name}</h2>
          <label className="label">
            الاسم:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            ايميل صاحب الفندق:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            الموقع:
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            وصف:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="textarea"
            />
          </label>
          <label className="label">
            خط العرض:
            <input
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              className="input"
            />
          </label>
          <label className="label">
            خط الطول:
            <input
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              className="input"
            />
          </label>
          <p style={{ fontWeight: "bold", marginTop: 10 }}>صور الفندق:</p>
          <div className="images-container">
            {formData.images.map((imgUrl, i) => (
              <img
                key={i}
                src={imgUrl}
                alt={`صورة ${i + 1}`}
                className="thumbnail"
              />
            ))}
          </div>
          <div className="buttons-row">
            <button
              onClick={handleUpdate}
              className="btn btn-update"
            >
              تعديل
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-delete"
            >
              حذف
            </button>
            <button
              onClick={() => setSelectedHotel(null)}
              className="btn btn-cancel"
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
