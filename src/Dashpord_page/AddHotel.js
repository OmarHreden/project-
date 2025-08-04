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
    <div className="form-container-ah">
     <h2>Add hotel</h2>
      <form onSubmit={handleSubmit}>
        <label className="ah"> hotel name</label>
        <input className="input-hotl" type="text" name="name" onChange={handleChange} required />

        <label className="ah">hotel  description </label>
        <textarea name="description" onChange={handleChange} required />

        <label className="ah"> hotel email </label>
        <input className="input-hotl" type="email" name="email" onChange={handleChange} required />

        <label className="ah">Address</label>
        <input className="input-hotl" type="text" name="address" onChange={handleChange} required />
        <label className="ah">longitude </label>
        <input className="input-hotl" type="text" name="longitude" onChange={handleChange} required />
        <label className="ah"> latitude</label>
        <input className="input-hotl" type="text" name="latitude" onChange={handleChange} required />
{/* 
        <label>hotel  images </label>
        <input className="input-hotl" type="file" name="images" multiple accept="image/*" onChange={handleFileChange} />

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
