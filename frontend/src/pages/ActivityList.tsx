import { useEffect } from 'react';
import { useActivityStore } from '../store/activityStore';
import { Link } from 'react-router-dom';

const ActivityList = () => {
  const { activities, fetchActivities } = useActivityStore();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Activities</h1>
      <Link to="/activities/new" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Create New Activity</Link>
      <ul>
        {activities.map(act => (
          <li key={act.id} className="mb-2 border p-2 rounded">
            <Link to={`/activities/${act.id}`} className="text-blue-600">
              {act.type} - {act.distance} km on {new Date(act.start_time).toLocaleDateString()}
            </Link>
            <div>
              <Link to={`/activities/${act.id}/edit`} className="text-green-600 mr-2">Edit</Link>
              <button onClick={() => { if (confirm('Are you sure?')) useActivityStore.getState().deleteActivity(act.id); }} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;