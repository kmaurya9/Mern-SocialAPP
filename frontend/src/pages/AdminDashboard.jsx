import { UserData } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, isAuth } = UserData();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ total: 0, admins: 0, curators: 0, viewers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('/api/user/all');
        setUsers(data);
        
        const adminCount = data.filter(u => u.role === 'admin').length;
        const curatorCount = data.filter(u => u.role === 'curator').length;
        const viewerCount = data.filter(u => u.role === 'viewer').length;
        
        setStats({
          total: data.length,
          admins: adminCount,
          curators: curatorCount,
          viewers: viewerCount
        });
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`/api/user/role/${userId}`, { role: newRole });
      toast.success(`User role updated to ${newRole}`);
      // Refresh users list
      const { data } = await axios.get('/api/user/all');
      setUsers(data);
      
      const adminCount = data.filter(u => u.role === 'admin').length;
      const curatorCount = data.filter(u => u.role === 'curator').length;
      
      setStats({
        total: data.length,
        admins: adminCount,
        curators: curatorCount,
        viewers: data.length - adminCount - curatorCount
      });
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      await axios.delete(`/api/user/${userId}`);
      toast.success(`User ${userName} deleted successfully`);
      // Refresh users list
      const { data } = await axios.get('/api/user/all');
      setUsers(data);
      
      const adminCount = data.filter(u => u.role === 'admin').length;
      const curatorCount = data.filter(u => u.role === 'curator').length;
      
      setStats({
        total: data.length,
        admins: adminCount,
        curators: curatorCount,
        viewers: data.length - adminCount - curatorCount
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    }
  };

  // Only admins can access this page
  if (!isAuth || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-700 mb-6">Only Administrators can access this page.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform management and user administration</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-blue-600">{stats.total}</div>
            <p className="text-gray-600 mt-2">Total Users</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-green-600">{Math.floor(stats.total * 0.5)}</div>
            <p className="text-gray-600 mt-2">Active This Week</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-purple-600">{stats.curators}</div>
            <p className="text-gray-600 mt-2">Curators</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-bold text-orange-600">{stats.admins}</div>
            <p className="text-gray-600 mt-2">Admins</p>
          </div>
        </div>

        {/* Recent Users - With Numeric Right Justification */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">All Users ({stats.total})</h2>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : users.length > 0 ? (
            <div className="overflow-x-auto">
              {/* Table Header */}
              <div className="grid grid-cols-12 gap-4 font-semibold text-gray-700 pb-3 border-b-2 border-gray-300 mb-3">
                <div className="col-span-4 text-left">User Name</div>
                <div className="col-span-3 text-left">Email</div>
                <div className="col-span-1 text-right">Followers</div>
                <div className="col-span-1 text-right">Following</div>
                <div className="col-span-3 text-center">Actions</div>
              </div>

              {/* Table Rows */}
              <div className="space-y-2">
                {users.slice(0, 10).map(u => (
                  <div key={u._id} className="grid grid-cols-12 gap-4 items-center border-b pb-3 hover:bg-gray-50 p-2 rounded">
                    {/* Text Content - Left Justified */}
                    <div className="col-span-4 text-left">
                      <p className="text-gray-900 font-semibold">{u.name}</p>
                    </div>
                    <div className="col-span-3 text-left">
                      <p className="text-sm text-gray-500">{u.email}</p>
                    </div>
                    
                    {/* Numeric Content - Right Justified */}
                    <div className="col-span-1 text-right">
                      <p className="font-bold text-green-600">{u.followers?.length || 0}</p>
                    </div>
                    <div className="col-span-1 text-right">
                      <p className="font-bold text-purple-600">{u.followings?.length || 0}</p>
                    </div>

                    {/* Actions - Right Aligned */}
                    <div className="col-span-3 flex gap-2 items-center justify-end">
                      <select 
                        value={u.role} 
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                        className="px-3 py-1 bg-gray-200 rounded text-sm"
                      >
                        <option value="viewer">Viewer</option>
                        <option value="curator">Curator</option>
                        <option value="admin">Admin</option>
                      </select>
                      <button
                        onClick={() => handleDeleteUser(u._id, u.name)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No users found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
