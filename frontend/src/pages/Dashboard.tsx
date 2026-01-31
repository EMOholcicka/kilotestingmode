import { useEffect } from 'react';
import { useActivityStore } from '../store/activityStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  const { activities, summaries, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const chartData = activities.map(act => ({
    date: new Date(act.start_time).toLocaleDateString(),
    distance: act.distance,
  }));

  const recentActivities = activities.slice(0, 5);

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>All Time</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Distance: {summaries.allTime.totalDistance} km</p>
            <p>Time: {summaries.allTime.totalTime} hours</p>
            <p>Elevation: {summaries.allTime.totalElevation} m</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Weekly</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Distance: {summaries.weekly.totalDistance} km</p>
            <p>Time: {summaries.weekly.totalTime} hours</p>
            <p>Elevation: {summaries.weekly.totalElevation} m</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Distance: {summaries.monthly.totalDistance} km</p>
            <p>Time: {summaries.monthly.totalTime} hours</p>
            <p>Elevation: {summaries.monthly.totalElevation} m</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Distance Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="distance" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl mb-2">Recent Activities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentActivities.map(act => (
            <Card key={act.id}>
              <CardContent className="pt-6">
                {act.type} - {act.distance} km on {new Date(act.start_time).toLocaleDateString()}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;