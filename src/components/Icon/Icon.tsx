// assets
import plant from '../../assets/icons/plant.svg'
interface IconProps {
  vegetable: string;

}

const Icon = ({ vegetable }) => {
  const icons = {
    plant: plant
  }

  return (
    <img className="icon" src={icons[vegetable]} alt={`A ${vegetable} icon.`} />
  )
}

export default Icon