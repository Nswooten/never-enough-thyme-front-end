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
      <h4>{seed.spacingHeight}in X {seed.spacingWidth}in</h4>
    </article>
  )
}

export default SeedCard