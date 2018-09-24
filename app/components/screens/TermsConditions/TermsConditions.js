import React from 'react'
import { PolicyView } from 'components/blocks'
import {TERMS_CONDITIONS} from 'constants/policies'
const TermsConditions = () => {
  return (
    <PolicyView
      text={TERMS_CONDITIONS}
    />
  )
}

export default TermsConditions
