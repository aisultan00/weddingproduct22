import React from 'react'
import { useParams } from 'react-router-dom'
import Ownercomponent from '../../../component/Ownercomponent'
import SEO from '../../../component/SEO'

function GuestsTkeser() {
  const {id} = useParams()
  return (
    <>
      <SEO 
        title="Тұсаукесер тойы - Иелер беті"
        description="Тұсаукесер тойының иелер беті. Қонақтарды бақылау және тойды басқару."
        keywords="тұсаукесер тойы, иелер беті, қонақтар, басқару"
      />
      <Ownercomponent link="tkesers" id = {id}/>
    </>
  )
}

export default GuestsTkeser