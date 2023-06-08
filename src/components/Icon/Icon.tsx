// assets
import plant from '../../assets/icons/plant.svg'
import image1 from '../../assets/icons/image1.svg'
import image2 from '../../assets/icons/image2.svg'
import image3 from '../../assets/icons/image3.svg'
import image4 from '../../assets/icons/image4.svg'
import image5 from '../../assets/icons/image5.svg'
import image6 from '../../assets/icons/image6.svg'
import image7 from '../../assets/icons/image7.svg'
import image8 from '../../assets/icons/image8.svg'
import image9 from '../../assets/icons/image9.svg'
import image10 from '../../assets/icons/image10.svg'

interface IconProps {
  vegetable: string;

}

const Icon = ({ vegetable }:IconProps) => {
  const icons= {
    plant,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10

  }
  return (
    <img className="icon" src={icons[vegetable as keyof typeof icons]} alt={`A ${vegetable} icon.`} />
  )
}

export default Icon