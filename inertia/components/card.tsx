interface CardProps {
  title: string
  year: number
  rating: number
  image: string
}

export function Card({ title, year, rating, image }: CardProps) {
  return (
    <div className="max-w-[300px] border-sky-200 border-2 bg-sky-100 rounded shadow p-4 overflow-hidden">
      <div className="flex justify-center">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-auto max-w-full rounded mb-2 object-cover"
        />
      </div>
      <h3 className="text-lg font-bold text-sky-950 truncate max-w-full overflow-hidden whitespace-nowrap">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{year}</p>
      <p className="text-sm text-gray-600">{rating}</p>
    </div>
  )
}
