import React from 'react'
import { useParams } from 'react-router-dom'
import Ownercomponent from '../../../component/Ownercomponent'
import SEO from '../../../component/SEO'

function GuestsBetashar() {
  const {id} = useParams()
  return (
    <>
      <SEO 
        title="Беташар тойы - Иелер беті"
        description="Беташар тойының иелер беті. Қонақтарды бақылау және тойды басқару."
        keywords="беташар тойы, иелер беті, қонақтар, басқару"
      />
      <Ownercomponent link="betashar" id = {id}/>
    </>
  )
}

export default GuestsBetashar