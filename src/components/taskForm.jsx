import React from 'react'
import Button from './button'

export default function TaskForm({toggleForm}) {

  const handleSubmit = () => {
    toggleForm();
  }
  return (
    <div className='bg-blue-100 w-3/4  border-2 z-50 p-4'>
        <Button children={'Submit'} onClick={handleSubmit} />
    </div>
  )
}
