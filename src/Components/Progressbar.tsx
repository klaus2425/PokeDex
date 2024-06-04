type Props = {
  value: number;
  max: number;
}

const Progressbar = ({ value, max }: Props) => {
  const percentage = (value / max) * 100;
  return (
    <div className='w-full bg-gray-200 rounded-full h-4 overflow-hidden'>
      <div
        className="bg-green-500 h-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  )
}

export default Progressbar