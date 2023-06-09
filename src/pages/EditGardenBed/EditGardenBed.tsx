// npm modules
import { useState } from "react"
import { useLocation, useNavigate } from 'react-router-dom'

// services
import * as gardenBedService from '../../services/gardenBedService'

// css
import styles from './EditGardenBed.module.css'

// types
import { GardenBedFormData } from "../../types/forms"


const EditGardenBed = () => {
  const location = useLocation()
  const [formData, setFormData] = useState(location.state)
  const navigate = useNavigate()

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleAddGardenBed = async (formData: GardenBedFormData) => {
    await gardenBedService.update(formData)
    navigate(`/gardenBeds/${formData.id}`)
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    handleAddGardenBed(formData)
  }

  return (
    <main className={styles.editgardenbedcontainer}>
      <h1 className={styles.editgardenbedh1}>Edit your Garden Bed</h1>
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

export default EditGardenBed