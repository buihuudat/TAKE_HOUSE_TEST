import type { Dispatch, SetStateAction } from 'react'

import React, { useState } from 'react'

interface IFilterProps {
  setStatuses: (statuses: string[]) => void
}

const Filter = ({ setStatuses }: IFilterProps) => {
  const [statusSelected, setStatusSelected] = useState('all')

  const handleChangeStatus = (status: string) => {
    if (status === 'all') {
      setStatuses(['completed', 'pending'])
    } else {
      setStatuses([status])
    }
    setStatusSelected(status)
  }
  return (
    <div className="flex flex-row gap-2">
      {['all', 'pending', 'completed'].map((item) => {
        return (
          <button
            onClick={() => handleChangeStatus(item)}
            className={`border-[#E2E8F0  ] rounded-full border px-6 py-3 text-sm font-bold capitalize
 ${statusSelected === item ? 'bg-[#334155] text-white' : 'text-[#334155]'}`}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default Filter
