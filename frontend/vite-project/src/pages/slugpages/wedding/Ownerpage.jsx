import React from 'react'
import { useParams } from 'react-router-dom'
import Ownercomponent from '../../../component/Ownercomponent'
import SEO from '../../../component/SEO'

function Ownerpage() {
    const {id} = useParams()
  return (
    <>
      <SEO 
        title="Үйлену тойы - Иелер беті"
        description="Үйлену тойының иелер беті. Қонақтарды бақылау және тойды басқару."
        keywords="үйлену тойы, иелер беті, қонақтар, басқару"
      />
      <Ownercomponent link="wedding" id = {id}/>
    </>
  )
}

export default Ownerpage