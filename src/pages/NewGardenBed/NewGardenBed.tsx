// npm modules
import { useState } from "react"
import { useNavigate } from "react-router-dom";

// services
import * as gardenBedService from '../../services/gardenBedService'

// css
import styles from './NewGardenBed.module.css'

// types
import { GardenBedFormData } from "../../types/forms"

const NewGardenBed = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<GardenBedFormData>({
    name: '',
    height: 0,
    width: 0
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    handleAddGardenBed(formData)
  }

  const handleAddGardenBed = async (formData: GardenBedFormData) => {
    await gardenBedService.create(formData)
    navigate('/gardenBeds')
  }

  return (
    <main className={styles.newgardenbedcontainer}>
      <h1 className={styles.newgardenbedh1}>Create a new Garden Bed</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="name-input">Title</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
        />
        <label htmlFor="height-input">Height(ft)</label>
        <input
          required
          type="number"
          name="height"
          id="height-input"
          value={formData.height}
          placeholder="Height(ft)"
          onChange={handleChange}
        />
        <label htmlFor="width-input">Width(ft)</label>
        <input
          required
          type="number"
          name="width"
          id="width-input"
          value={formData.width}
          placeholder="Width(ft)"
          onChange={handleChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </main>
  )
}

export default NewGardenBed