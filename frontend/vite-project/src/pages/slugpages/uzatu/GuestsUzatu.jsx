import React from 'react'
import { useParams } from 'react-router-dom'
import Ownercomponent from '../../../component/Ownercomponent'
import SEO from '../../../component/SEO'

function GuestsUzatu() {
  const {id} = useParams()
  return (
    <>
      <SEO 
        title="Ұзату тойы - Иелер беті"
        description="Ұзату тойының иелер беті. Қонақтарды бақылау және тойды басқару."
        keywords="ұзату тойы, иелер беті, қонақтар, басқару"
      />
      <Ownercomponent link="uzatus" id = {id}/>
    </>
  )
}

export default GuestsUzatu
