import { useState } from 'react'
import './App.css'
import Header from './header'
import TeamList from './TeamList'

function App() {
  var tab_array = [true,false,false,false];
  return (
    <>
      <Header />
      <TeamList />
    </>
  )
}

export default App
