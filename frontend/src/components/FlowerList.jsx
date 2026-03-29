import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const FlowerList = ({ flowers, setFlowers, setEditingFlower }) => {
  const { user } = useAuth();

  const handleDelete = async (flowerId) => {
    try {
      await axiosInstance.delete(`/api/flowers/${flowerId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setFlowers(flowers.filter((flower) => flower._id !== flowerId));
    } catch (error) {
      alert('Failed to delete flower.');
    }
  };

  return (
    <div>
      {flowers.map((flower) => (
        <div key={flower._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold text-lg">{flower.name}</h2>
          <p>{flower.description}</p>
          <p className="text-sm text-gray-500">Price: ${flower.price}</p>
          <p className="text-sm text-gray-500">Category: {flower.category}</p>

          <div className="mt-2">
            <button
              onClick={() => setEditingFlower(flower)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit Flower
            </button>

            <button
              onClick={() => handleDelete(flower._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Flower
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlowerList;