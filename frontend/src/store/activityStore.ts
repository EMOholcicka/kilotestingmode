import { create } from 'zustand';
import api from '../api/api';

interface Activity {
  id: number;
  type: string;
  distance: number;
  duration: number;
  elevation_gain: number;
  start_time: string;
}

interface Summaries {
  allTime: {
    totalDistance: number;
    totalTime: number;
    totalElevation: number;
  };
  weekly: {
    totalDistance: number;
    totalTime: number;
    totalElevation: number;
  };
  monthly: {
    totalDistance: number;
    totalTime: number;
    totalElevation: number;
  };
}

interface ActivityState {
  activities: Activity[];
  fetchActivities: () => Promise<void>;
  createActivity: (newActivity: Omit<Activity, 'id'>) => Promise<void>;
  updateActivity: (id: number, updatedActivity: Partial<Activity>) => Promise<void>;
  deleteActivity: (id: number) => Promise<void>;
  summaries: Summaries;
}

const calculateSummary = (acts: Activity[]) => ({
  totalDistance: acts.reduce((sum, act) => sum + act.distance, 0),
  totalTime: acts.reduce((sum, act) => sum + act.duration, 0),
  totalElevation: acts.reduce((sum, act) => sum + act.elevation_gain, 0),
});

export const useActivityStore = create<ActivityState>((set, get) => ({
  activities: [],
  summaries: {
    allTime: { totalDistance: 0, totalTime: 0, totalElevation: 0 },
    weekly: { totalDistance: 0, totalTime: 0, totalElevation: 0 },
    monthly: { totalDistance: 0, totalTime: 0, totalElevation: 0 },
  },
  fetchActivities: async () => {
    try {
      const response = await api.get('/activities');
      const activities: Activity[] = response.data;
      
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      
      const weeklyActivities = activities.filter(act => new Date(act.start_time) >= oneWeekAgo);
      const monthlyActivities = activities.filter(act => new Date(act.start_time) >= oneMonthAgo);
      
      const summaries = {
        allTime: calculateSummary(activities),
        weekly: calculateSummary(weeklyActivities),
        monthly: calculateSummary(monthlyActivities),
      };
      
      set({ activities, summaries });
    } catch (error) {
      console.error('Failed to fetch activities', error);
    }
  },
  createActivity: async (newActivity) => {
    try {
      await api.post('/activities', newActivity);
      get().fetchActivities();
    } catch (error) {
      console.error('Failed to create activity', error);
    }
  },
  updateActivity: async (id, updatedActivity) => {
    try {
      await api.put(`/activities/${id}`, updatedActivity);
      get().fetchActivities();
    } catch (error) {
      console.error('Failed to update activity', error);
    }
  },
  deleteActivity: async (id) => {
    try {
      await api.delete(`/activities/${id}`);
      get().fetchActivities();
    } catch (error) {
      console.error('Failed to delete activity', error);
    }
  },
}));