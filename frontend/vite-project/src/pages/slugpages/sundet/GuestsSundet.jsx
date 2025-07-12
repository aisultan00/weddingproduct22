import React from 'react'
import { useParams } from 'react-router-dom'
import Ownercomponent from '../../../component/Ownercomponent'
import SEO from '../../../component/SEO'

function GuestsSundet() {
  const {id} = useParams()
  return (
    <>
      <SEO 
        title="Сүндет тойы - Иелер беті"
        description="Сүндет тойының иелер беті. Қонақтарды бақылау және тойды басқару."
        keywords="сүндет тойы, иелер беті, қонақтар, басқару"
      />
      <Ownercomponent link="sundet" id = {id}/>
    </>
  )
}

export default GuestsSundet