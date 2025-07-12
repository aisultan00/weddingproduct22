import { useParams } from "react-router-dom"
import Toypage from "../../../component/ToyPage"
import SEO from "../../../component/SEO"

function Weddingpage() {
  const { id } = useParams()
  return (
    <>
      <SEO 
        title="Үйлену тойы"
        description="Үйлену тойының онлайн шақыруы. Қонақтарды шақырыңыз және тойды ұйымдастырыңыз."
        keywords="үйлену тойы, онлайн шақыру, қонақтар, той"
      />
      <Toypage id={id}
               toytype="wedding"
      />
    </>
  )
}

export default Weddingpage