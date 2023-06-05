// assets

// components

// types
import { Seed } from "../../types/models"

interface SeedCardProps {
  seed: Seed;
  // handleVote: (formData: VoteManagerFormData) => Promise<void>;
}

const SeedCard = (props: SeedCardProps): JSX.Element => {
  const { seed } = props

  return (
    <article>
      <h1>{seed.name}</h1>
      <h2>{seed.spacingHeight} X {seed.spacingWidth}</h2>
    </article>
  )
}

export default SeedCard