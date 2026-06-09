import Workout from '../../pages/Workout';
import Diet from '../../pages/Diet';

function FitnessDetail({ item }) {
  if (item.type === 'fitness-diet') {
    return <Diet />;
  }
  return <Workout />;
}

export default FitnessDetail;
