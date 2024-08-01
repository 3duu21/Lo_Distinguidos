import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import SectionMaps from '../../components/SectionMaps/SectionMaps'
import Contact from '../../components/Contact/Contact'

const Home = () => {

  const [category, setCategory] = useState("All")

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <SectionMaps />
      <Contact />
    </div>
  )
}

export default Home