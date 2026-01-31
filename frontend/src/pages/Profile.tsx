import { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { useActivityStore } from '../store/activityStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Profile = () => {
  const { user, fetchUser } = useUserStore();
  const { activities, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchUser();
    fetchActivities();
  }, [fetchUser, fetchActivities]);

  if (!user) return <div>Loading...</div>;

  // Personal records
  const longestDistance = Math.max(...activities.map(act => act.distance), 0);
  const totalElevation = activities.reduce((sum, act) => sum + act.elevation_gain, 0);
  // Assuming pace = duration / distance (min/km)
  const bestPace = Math.min(...activities.map(act => act.duration / act.distance), Infinity) || 0;

  // Weekly mileage
  const weeklyMileage = activities.reduce((acc, act) => {
    const date = new Date(act.start_time);
    const week = `${date.getFullYear()}-W${Math.floor(date.getDate() / 7) + 1}`;
    acc[week] = (acc[week] || 0) + act.distance;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(weeklyMileage).map(([week, distance]) => ({ week, distance }));

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Profile</h1>
      <p>Email: {user.email}</p>

      <div className="my-4">
        <h2 className="text-2xl mb-2">Personal Records</h2>
        <p>Longest Distance: {longestDistance} km</p>
        <p>Best Pace: {bestPace.toFixed(2)} min/km</p>
        <p>Total Elevation: {totalElevation} m</p>
      </div>

      <div className="my-4">
        <h2 className="text-2xl mb-2">Weekly Mileage Chart</h2>
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="distance" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default Profile;