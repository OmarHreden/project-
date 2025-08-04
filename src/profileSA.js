import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SuperAdminProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', password: '', latitude: 0, longitude: 0 });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/super_admin/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => {
      setProfile(res.data);
      setFormData({
        fullName: res.data.fullName,
        password: '',
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      });
    });
  }, []);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.post('http://localhost:8080/super_admin/editProfile', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.message === 'Successfully Updated') setEditMode(false);
  };

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-blue-600 text-white text-2xl flex items-center justify-center rounded-full">
          {profile.fullName.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-2xl font-bold">{profile.fullName}</h2>
          <p className="text-gray-600">{profile.email}</p>
          <p className="text-gray-600 font-medium">Level: {profile.level}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Latitude</label>
            <input
              type="number"
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Longitude</label>
            <input
              type="number"
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              disabled={!editMode}
              className="w-full border rounded-xl px-3 py-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {editMode ? (
            <>
              <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 rounded-xl">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Save</button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
