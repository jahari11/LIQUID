import React from 'react'
import { FormControlLabel } from '@mui/material'
import AddressFrom from './AddressFrom'


const Shipping = ({
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    setFieldValue
}) => {
  return (
    <div>
        <div>
            <span>Billing Info</span>
            <AddressFrom />
        </div>
    </div>
  )
}

export default Shipping