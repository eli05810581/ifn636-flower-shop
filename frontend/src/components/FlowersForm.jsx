import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const FlowersForm = ({ flowers, setFlowers, editingFlower, setEditingFlower }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  useEffect(() => {
    if (editingFlower) {
      setFormData(editingFlower);
    }
  }, [editingFlower]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingFlower) {
        const response = await axiosInstance.put(
          `/api/flowers/${editingFlower._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setFlowers(
          flowers.map((flower) =>
            flower._id === editingFlower._id ? response.data : flower
          )
        );
      } else {
        const response = await axiosInstance.post(
          '/api/flowers',
          formData,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );

        setFlowers([response.data, ...flowers]);
      }

      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
      });

      setEditingFlower(null);
    } catch (error) {
      alert('Failed to save flower.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">
        {editingFlower ? 'Edit Flower' : 'Add Flower'}
      </h1>

      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={formData.category}
        onChange={(e) =>
          setFormData({ ...formData, category: e.target.value })
        }
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingFlower ? 'Update Flower' : 'Add Flower'}
      </button>
    </form>
  );
};

export default FlowersForm;