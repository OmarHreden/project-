import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/hotel.css";

export default function HotelsManager() {
  const [hotels, setHotels] = useState([]);           // كل الفنادق من الـ API
  const [filteredHotels, setFilteredHotels] = useState([]); // الفنادق المعروضة
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // بيانات البحث
  const [searchName, setSearchName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  // جلب الفنادق مرة واحدة
  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await axios.get("API_جلب_الفنادق"); // غير هذا للـ API الخاص بك
      setHotels(res.data);
      setFilteredHotels(res.data); // عند التحميل الأول = الكل
    } catch (err) {
      setError("فشل تحميل الفنادق");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // البحث المحلي
  const handleSearch = () => {
    const filtered = hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchName.toLowerCase()) &&
      hotel.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  // عند اختيار فندق
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

  // فورم التعديل
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    location: "",
    latitude: "",
    longitude: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!selectedHotel) return;
    try {
      await axios.put(`API_تعديل_الفندق/${selectedHotel.id}`, formData);
      alert("تم تعديل الفندق بنجاح");
      setSelectedHotel(null);
      fetchHotels();
    } catch (err) {
      alert("فشل تعديل الفندق");
    }
  };

  const handleDelete = async () => {
    if (!selectedHotel) return;
    const confirmDelete = window.confirm("هل أنت متأكد من حذف الفندق؟");
    if (!confirmDelete) return;

    try {
      await axios.delete(`API_حذف_الفندق/${selectedHotel.id}`);
      alert("تم حذف الفندق");
      setSelectedHotel(null);
      fetchHotels();
    } catch (err) {
      alert("فشل حذف الفندق");
    }
  };

  return (
    <div className="container">
      <h1 className="title">إدارة الفنادق</h1>

      {/* مربع البحث */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
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
        <button onClick={handleSearch} className="btn btn-update">
          بحث
        </button>
      </div>

      {loading && <p>جارٍ تحميل الفنادق...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* قائمة الفنادق */}
      <div className="hotels-list">
        {filteredHotels.map((hotel) => (
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
        ))}
      </div>

      {/* نموذج تعديل الفندق */}
      {selectedHotel && (
        <div className="form-container">
          <h2 className="form-title">تعديل بيانات الفندق: {selectedHotel.name}</h2>

          <label className="label">
            الاسم:
            <input
              className="input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>

          <label className="label">
            ايميل صاحب الفندق:
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>

          <label className="label">
            الموقع:
            <input
              className="input"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>

          <label className="label">
            وصف:
            <textarea
              className="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </label>

          <label className="label">
            خط العرض:
            <input
              className="input"
              type="number"
              step="any"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
            />
          </label>

          <label className="label">
            خط الطول:
            <input
              className="input"
              type="number"
              step="any"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
            />
          </label>

          <p>صور الفندق:</p>
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
            <button className="btn btn-update" onClick={handleUpdate}>
              تعديل
            </button>
            <button className="btn btn-delete" onClick={handleDelete}>
              حذف
            </button>
            <button
              className="btn btn-cancel"
              onClick={() => setSelectedHotel(null)}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
