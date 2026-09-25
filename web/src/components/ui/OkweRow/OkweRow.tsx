type OkweRowProps = {
  /** How many of the six counters are open (outlined); the rest are filled. */
  open?: number
}

/** The brand mark: six counters in a row, three sown and three open. */
const OkweRow = ({ open = 3 }: OkweRowProps) => (
  <span className="okwe-row">
    {Array.from({ length: 6 }, (_, i) => (
      <i key={i} className={i >= 6 - open ? 'is-open' : undefined} />
    ))}
  </span>
)

export default OkweRow
