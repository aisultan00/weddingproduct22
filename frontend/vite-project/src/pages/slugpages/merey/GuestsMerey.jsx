import React from 'react'
import { useParams } from 'react-router-dom'
import Ownercomponent from '../../../component/Ownercomponent'
import SEO from '../../../component/SEO'

function GuestsMerey() {
  const {id} = useParams()
  return (
    <>
      <SEO 
        title="Мерей тойы - Иелер беті"
        description="Мерей тойының иелер беті. Қонақтарды бақылау және тойды басқару."
        keywords="мерей тойы, иелер беті, қонақтар, басқару"
      />
      <Ownercomponent link="merey" id = {id}/>
    </>
  )
}

export default GuestsMerey