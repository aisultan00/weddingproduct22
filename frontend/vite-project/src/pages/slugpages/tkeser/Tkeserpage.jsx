import React from 'react'
import { useParams } from 'react-router-dom'
import Toypage from '../../../component/ToyPage'
import SEO from '../../../component/SEO'

function Tkeserpage() {
   const { id } = useParams()
    return (
      <>
        <SEO 
          title="Тұсаукесер тойы"
          description="Тұсаукесер тойының онлайн шақыруы. Қонақтарды шақырыңыз және тойды ұйымдастырыңыз."
          keywords="тұсаукесер тойы, онлайн шақыру, қонақтар, той"
        />
        <Toypage id={id}
                 toytype="tkesers"
        />
      </>
    )
}

export default Tkeserpage