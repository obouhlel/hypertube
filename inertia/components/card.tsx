interface CardProps {
  title: string
  year: number
  rating: number
  image: string
}

export function Card({ title, year, rating, image }: CardProps) {
  return (
    <div
      className="flex items-end justify-end max-w-[300px] min-h-[400px] bg-cover bg-center bg-black rounded border-2 border-sky-100 mb-2"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: '300px auto',
        backgroundRepeat: 'no-repeat',
      }}
      aria-label={title}
    >
      <div className="w-full h-auto p-4 bg-gray-950/75">
        <h3 className="text-lg font-bold text-white max-w-full">{title}</h3>
        <div className="flex justify-between items-center">
          <p className="text-sm text-white">{year}</p>
          <p className="text-sm text-white">{rating} / 10</p>
        </div>
      </div>
    </div>
  )
}
