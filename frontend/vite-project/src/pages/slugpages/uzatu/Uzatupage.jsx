import React from 'react'
import { useParams } from 'react-router-dom'
import Toypage from '../../../component/ToyPage'
import SEO from '../../../component/SEO'

function Uzatupage() {
   const { id } = useParams()
  return (
    <>
      <SEO 
        title="Ұзату тойы"
        description="Ұзату тойының онлайн шақыруы. Қонақтарды шақырыңыз және тойды ұйымдастырыңыз."
        keywords="ұзату тойы, онлайн шақыру, қонақтар, той"
      />
      <Toypage id={id}
               toytype="uzatus"
      />
    </>
  )
}

export default Uzatupage