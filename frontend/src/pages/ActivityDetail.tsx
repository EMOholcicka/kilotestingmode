import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';

const ActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { activities, fetchActivities } = useActivityStore();

  useEffect(() => {
    if (!activities.length) {
      fetchActivities();
    }
  }, [activities.length, fetchActivities]);

  const activity = useMemo(() => activities.find(act => act.id === Number(id)), [activities, id]);

  if (!activity) return <div>Loading...</div>;

  const averagePace = activity.duration / activity.distance; // minutes per km, assuming duration in minutes

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">{activity.type} Activity</h1>
      <p>Date: {new Date(activity.start_time).toLocaleDateString()}</p>
      <p>Distance: {activity.distance} km</p>
      <p>Duration: {activity.duration} minutes</p>
      <p>Elevation Gain: {activity.elevation_gain} m</p>
      <p>Average Pace: {averagePace.toFixed(2)} min/km</p>

      <div className="my-4">
        <h2 className="text-2xl mb-2">Map</h2>
        <div className="bg-gray-200 h-64 w-full flex items-center justify-center">
          Map Placeholder
        </div>
      </div>

      <div className="my-4">
        <h2 className="text-2xl mb-2">Splits</h2>
        <p>Splits data not available (placeholder)</p>
      </div>

      <div className="my-4">
        <h2 className="text-2xl mb-2">Pace & HR Charts</h2>
        <p>Charts not available (placeholder)</p>
        {/* Add Recharts if data available */}
      </div>
    </div>
  );
};

export default ActivityDetail;