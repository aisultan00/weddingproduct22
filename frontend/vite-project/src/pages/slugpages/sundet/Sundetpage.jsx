import React from 'react'
import { useParams } from 'react-router-dom'
import Toypage from '../../../component/ToyPage'
import SEO from '../../../component/SEO'

function Sundetpage() {
   const { id } = useParams()
    return (
      <>
        <SEO 
          title="Сүндет тойы"
          description="Сүндет тойының онлайн шақыруы. Қонақтарды шақырыңыз және тойды ұйымдастырыңыз."
          keywords="сүндет тойы, онлайн шақыру, қонақтар, той"
        />
        <Toypage id={id}
                 toytype="sundet"
        />
      </>
    )
}

export default Sundetpage