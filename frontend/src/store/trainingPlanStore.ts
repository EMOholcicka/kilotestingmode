import { create } from 'zustand';
import api from '../api/api';

interface PlannedWorkout {
  id: number;
  type: string;
  distance: number;
  duration: number;
  // etc.
}

interface TrainingDay {
  id: number;
  day: string; // e.g., '2023-01-01'
  workouts: PlannedWorkout[];
}

interface TrainingPlan {
  id: number;
  week: number;
  days: TrainingDay[];
}

interface TrainingPlanState {
  trainingPlans: TrainingPlan[];
  currentPlan: TrainingPlan | null;
  fetchTrainingPlans: () => Promise<void>;
  fetchTrainingPlan: (week: number) => Promise<void>;
}

export const useTrainingPlanStore = create<TrainingPlanState>((set) => ({
  trainingPlans: [],
  currentPlan: null,
  fetchTrainingPlans: async () => {
    try {
      const response = await api.get('/training-plans');
      set({ trainingPlans: response.data });
    } catch (error) {
      console.error('Failed to fetch training plans', error);
    }
  },
  fetchTrainingPlan: async (week) => {
    try {
      const response = await api.get(`/training-plans/${week}`);
      set({ currentPlan: response.data });
    } catch (error) {
      console.error('Failed to fetch training plan', error);
    }
  },
}));