import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useActivityStore } from '../store/activityStore';

const ActivityForm = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { activities, createActivity, updateActivity, fetchActivities } = useActivityStore();

  const isEdit = !!id;
  const existingActivity = isEdit ? activities.find(act => act.id === Number(id)) : null;

  const [formData, setFormData] = useState({
    type: existingActivity?.type || 'run',
    distance: existingActivity?.distance || 0,
    duration: existingActivity?.duration || 0,
    elevation_gain: existingActivity?.elevation_gain || 0,
    start_time: existingActivity?.start_time || new Date().toISOString(),
  });

  useEffect(() => {
    if (isEdit && !existingActivity) {
      fetchActivities();
    }
  }, [isEdit, existingActivity, fetchActivities]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'type' ? value : Number(value) || value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      updateActivity(Number(id), formData);
    } else {
      createActivity(formData);
    }
    navigate('/activities');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">{isEdit ? 'Edit Activity' : 'Create Activity'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} className="border p-2 w-full">
            <option value="run">Run</option>
            <option value="ride">Ride</option>
            <option value="walk">Walk</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Distance (km)</label>
          <input type="number" name="distance" value={formData.distance} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Duration (minutes)</label>
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Elevation Gain (m)</label>
          <input type="number" name="elevation_gain" value={formData.elevation_gain} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Start Time</label>
          <input type="datetime-local" name="start_time" value={formData.start_time.slice(0,16)} onChange={handleChange} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default ActivityForm;