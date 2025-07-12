import React from 'react'
import { useParams } from 'react-router-dom'
import Toypage from '../../../component/ToyPage'
import SEO from '../../../component/SEO'

function Mereypage() {
   const { id } = useParams()
    return (
      <>
        <SEO 
          title="Мерей тойы"
          description="Мерей тойының онлайн шақыруы. Қонақтарды шақырыңыз және тойды ұйымдастырыңыз."
          keywords="мерей тойы, онлайн шақыру, қонақтар, той"
        />
        <Toypage id={id}
                 toytype="merey"
        />
      </>
    )
}

export default Mereypage