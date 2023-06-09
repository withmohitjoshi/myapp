import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
const SingleDrop = ({
  queryKey = "",
  queryFn,
  queryFnPayload = {},
  placeHolder = "Please select",
  select = "",
  label = "",
  isApiPresent = true,
  rawDataForDropdown = [],
  controllerField = {},
  error = '',
  onChange = () => { }
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const { register } = useForm({
    defaultValues: {
      search: ""
    }
  })
  const { data } = useQuery({
    queryKey: [queryKey],
    queryFn: () => queryFn({ page: 1, length: 10, ...queryFnPayload, }),
    select: (data) => data?.data?.data,
    enabled: isApiPresent
  })

  if (isApiPresent) {
    return (
      <>
        <select name={queryKey} {...controllerField} onChange={(e) => onChange(e.target.value)} onClick={() => setIsOpen(!isOpen)}>
          {!data?.length && <option style={{ textAlign: "center" }}>No recored found</option>}
          <option value={""}>{placeHolder}</option>
          {data?.length > 0 && data.map((result, index) => {
            const listValue = result[select]
            const listLabel = result[label]
            return <option value={listValue} key={index}>{listLabel}</option>
          })}
        </select>
        {error && <span>{error}</span>}
      </>
    )
  } else {
    return (
      <div className='dropdown-main'>
        <div className='dropdown' onClick={() => setIsOpen(!isOpen)}>
          <p className='dropdown-placeholder'>{placeHolder}</p>
        </div>
        
        {isOpen &&
          <ul className='dropdown-menu'>
            <div className='dropdown-menu-search'>
        <input type='search'/>
        </div>
            {rawDataForDropdown.length === 0 ? <li>Data is not provided</li> :
              <>
                <li value={""}>{placeHolder}</li>
                {rawDataForDropdown.map((result, index) => {
                  const listValue = result[select]
                  const listLabel = result[label]
                  return <li value={listValue} key={index}>{listLabel}</li>
                })}
              </>
            }
          </ul>
        }
      </div>
    )
    // return (
    //   <>
    //     <select name={queryKey} {...controllerField} onChange={(e) => onChange(e.target.value)}>
    // {rawDataForDropdown.length === 0 ? <option>Data is not provided</option> :
    //   <>
    //     <option value={""}>{placeHolder}</option>
    //     {rawDataForDropdown.map((result, index) => {
    //       const listValue = result[select]
    //       const listLabel = result[label]
    //       return <option value={listValue} key={index}>{listLabel}</option>
    //     })}
    //   </>
    //       }
    //     </select>
    //     {error && <span>{error}</span>}
    //   </>
    // )
  }
}

export default SingleDrop
