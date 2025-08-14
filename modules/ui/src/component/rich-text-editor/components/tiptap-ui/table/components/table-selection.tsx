import { useState } from 'react'

interface TableSelectorProps {
  onSelect: (rows: number, cols: number) => void
  maxRows?: number
  maxCols?: number
}

export function TableSelector({ onSelect, maxRows = 10, maxCols = 10 }: TableSelectorProps) {
  const [hoveredCell, setHoveredCell] = useState({ row: 0, col: 0 })

  const handleMouseEnter = (row: number, col: number) => {
    setHoveredCell({ row, col })
  }

  return (
    <div className='p-2'>
      <div className='mb-2 text-center text-sm text-gray-500'>
        {hoveredCell.row + 1} × {hoveredCell.col + 1}
      </div>

      <div className='mb-2 grid grid-cols-10 gap-1'>
        {Array.from({ length: maxRows }).map((_, rowIndex) =>
          Array.from({ length: maxCols }).map((_, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`h-6 w-6 cursor-pointer border ${
                rowIndex <= hoveredCell.row && colIndex <= hoveredCell.col
                  ? 'border-blue-400 bg-blue-200'
                  : 'border-gray-300 bg-gray-100'
              }`}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onClick={() => {
                onSelect(rowIndex + 1, colIndex + 1)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
