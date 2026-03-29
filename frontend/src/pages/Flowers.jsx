import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/FlowerList';
import { useAuth } from '../context/AuthContext';

const Tasks = () => {
  const { user } = useAuth();
  const [flowers, setFlowers] = useState([]);
  const [editingFlower, setEditingFlower] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchFlowers = async () => {
      try {
        const response = await axiosInstance.get('/api/flowers', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setFlowers(response.data);
      } catch (error) {
        alert('Failed to fetch flowers.');
      }
    };

    fetchFlowers();
  }, [user]);

  if (!user) {
    return <div className="p-6">Please login first.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <TaskForm
        flowers={flowers}
        setFlowers={setFlowers}
        editingFlower={editingFlower}
        setEditingFlower={setEditingFlower}
      />
      <TaskList
        flowers={flowers}
        setFlowers={setFlowers}
        setEditingFlower={setEditingFlower}
      />
    </div>
  );
};

export default Tasks;