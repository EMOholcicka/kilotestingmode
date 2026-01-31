import { useEffect, useState } from 'react';
import { useTrainingPlanStore } from '../store/trainingPlanStore';
import { useActivityStore } from '../store/activityStore';

const TrainingPlan = () => {
  const { trainingPlans, currentPlan, fetchTrainingPlans, fetchTrainingPlan } = useTrainingPlanStore();
  const { activities, fetchActivities } = useActivityStore();
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  useEffect(() => {
    fetchTrainingPlans();
    fetchActivities();
  }, [fetchTrainingPlans, fetchActivities]);

  useEffect(() => {
    if (selectedWeek !== null) {
      fetchTrainingPlan(selectedWeek);
    }
  }, [selectedWeek, fetchTrainingPlan]);

  const getCompletedForDay = (day: string) => {
    return activities.filter(act => new Date(act.start_time).toISOString().split('T')[0] === day);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Training Plans</h1>
      <select onChange={(e) => setSelectedWeek(Number(e.target.value))} className="border p-2 mb-4">
        <option>Select Week</option>
        {trainingPlans.map(plan => (
          <option key={plan.id} value={plan.week}>Week {plan.week}</option>
        ))}
      </select>

      {currentPlan && (
        <div>
          <h2 className="text-2xl mb-2">Week {currentPlan.week}</h2>
          {currentPlan.days.map(day => {
            const completed = getCompletedForDay(day.day);
            return (
              <div key={day.id} className="mb-4 border p-4 rounded">
                <h3 className="text-xl">{day.day}</h3>
                <div>
                  <h4>Planned Workouts</h4>
                  <ul>
                    {day.workouts.map(workout => (
                      <li key={workout.id}>{workout.type} - {workout.distance} km</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Completed Activities</h4>
                  <ul>
                    {completed.map(act => (
                      <li key={act.id}>{act.type} - {act.distance} km</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TrainingPlan;