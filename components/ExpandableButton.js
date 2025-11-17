import { useState } from 'react'
import Button from './core/Button'

export default function ExpandableButton({ label, children }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="my-4">
      <Button onClick={() => setIsExpanded(!isExpanded)} className="mb-2">
        {label}
      </Button>
      {isExpanded && (
        <div className="mt-2 p-4 bg-gray-wash rounded-md border border-gray-detail">
          {children}
        </div>
      )}
    </div>
  )
}

