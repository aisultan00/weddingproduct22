import React from 'react'
import { useParams } from 'react-router-dom'
import Toypage from '../../../component/ToyPage'
import SEO from '../../../component/SEO'

function Betasharpage() {
  const { id } = useParams()
   return (
     <>
       <SEO 
         title="Беташар тойы"
         description="Беташар тойының онлайн шақыруы. Қонақтарды шақырыңыз және тойды ұйымдастырыңыз."
         keywords="беташар тойы, онлайн шақыру, қонақтар, той"
       />
       <Toypage id={id}
                toytype="betashar"
       />
     </>
   )
}

export default Betasharpage