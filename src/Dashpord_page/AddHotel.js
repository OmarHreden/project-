import React, { useState } from 'react';
import axios from 'axios';
import '../Style/Add_hotel.css'; // سنضع التنسيق هنا

function AddHotel() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address:'',
    longitude:"",
    latitude:"",
    email: '',
    // images: []
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     setFormData({ ...formData, images: files });

//     // توليد معاينة للصور
//     const previews = files.map(file => URL.createObjectURL(file));
//     setPreviewImages(previews);
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = new FormData();
    // data.append('name', formData.name);
    // data.append('description', formData.description);
    // data.append('email', formData.email);
    // data.append('address', formData.address);
    // data.append('longitude', formData.longitude);
    // data.append('latitude', formData.latitude);
    // formData.images.forEach((file) => {
    //   data.append('images', file);
    // });
    
    try {
    const res = await axios.post('http://localhost:8080/super_admin/create-hotel', formData);
          
        
        alert('تمت الإضافة بنجاح!');
        // console.log(data);
    } catch (err) {
      alert('حدث خطأ في الإرسال!');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
     <h2>Add hotel</h2>
      <form onSubmit={handleSubmit}>
        <label> hotel name</label>
        <input type="text" name="name" onChange={handleChange} required />

        <label>hotel  description </label>
        <textarea name="description" onChange={handleChange} required />

        <label> hotel email </label>
        <input type="email" name="email" onChange={handleChange} required />

        <label>Address</label>
        <input type="text" name="address" onChange={handleChange} required />
        <label>longitude </label>
        <input type="text" name="longitude" onChange={handleChange} required />
        <label> latitude</label>
        <input type="text" name="latitude" onChange={handleChange} required />
{/* 
        <label>hotel  images </label>
        <input type="file" name="images" multiple accept="image/*" onChange={handleFileChange} />

        <div className="preview-container">
          {previewImages.map((src, i) => (
            <img key={i} src={src} alt={`preview ${i}`} className="preview-image" />
          ))}
        </div> */}

        <button type="submit">add </button>
      </form>
    </div>
  );
}

export default AddHotel;
