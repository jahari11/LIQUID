import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Formik } from 'formik'
import * as yup from "yup"
import { Step, StepLabel, Stepper } from '@mui/material'
import Shipping from './Shipping'


const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shippingAddress: {
    isSameAddress: true, 
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  email: "",
  phoneNumber:""
}

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];


const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state)=> state.cart.cart)
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;


  const handleFormSubmit = async (value, actions) => {
    setActiveStep(activeStep + 1);
  }

  async function makePayment(value) {

  }
  return (
    <div className='form'>
      <Stepper>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <div>
        <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema[activeStep]}>
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          })=> (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                values={values}
                errors={errors}
                touched={touched}
                handleBlur={handleBlur}
                handleChange={handleChange}
                setFieldValue={setFieldValue} />
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Checkout