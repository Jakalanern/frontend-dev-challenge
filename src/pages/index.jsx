import styles from '../styles/Home.module.css'
import Nav from '../components/Nav'
import School from '../components/School'
import { useEffect, useState } from 'react'
import { getPreciseDistance } from 'geolib'
import Search from '../components/Search'

export default function Home() {
  const [filteredSchools, setFilteredSchools] = useState([])
  const [schoolData, setSchoolData] = useState([])
  const [searchField, setSearchField] = useState('')

  useEffect(() => {
    // Here we fetch the school data
    fetch('https://api.sendbeacon.com/team/schools')
      // Recieve the response and parse it as JSON
      .then((res) => res.json())
      .then((data) => {
        if (navigator.geolocation) {
          // Here we request the users location
          navigator.geolocation.getCurrentPosition(
            // If we get location, run this function
            (position) => {
              sortSchoolsByDistance(data, position)
            },
            // If we don't get location, run this function instead
            () => {
              // Since we don't have location here, sort the schools alphabetically by name and assign to the state variable
              sortSchoolsAlphabetically(data)
            },
            (err) => {
              // If any errors occur inside this function, log it
              console.log(`getCurrentPosition error: ${err}`)
            }
          )
        }
      })
      .catch((err) => {
        // If any fetch errors occur, log it
        console.log(`fetch() error: ${err}`)
      })
  }, [])

  // Function that handles search
  const handleSearch = (e) => {
    // on each input change we store the search inputs' value to state
    setSearchField(e.target.value)
    // Then we assign a new state variable called filteredSchools, which will represent our schoolData state filtered specifically by if the NAME of the school includes the string(s) in the search bar
    setFilteredSchools(
      schoolData.filter((school) => {
        // You can uncomment the line below to also include the state the school is located in in the search by adding an OR operator. I left it as searching just school names as requested in the README of this challenge
        return school.name.toLowerCase().includes(searchField.toLowerCase())
        // || school.state.toLowerCase().includes(searchField.toLowerCase())
      })
    )
  }

  // Function that handles sorting our school data by position
  const sortSchoolsByDistance = (data, position) => {
    // For each school, calculate distance from user in meters using 'getPreciseDistance' from the 'geolib' library
    // Then assign each school a new property called 'distance'
    data.schools.forEach(
      (school) =>
        (school.distance = getPreciseDistance(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          {
            latitude: school.coordinates.lat,
            longitude: school.coordinates.long,
          }
        ))
    )
    // Then sort each school by the new distance property from closest to furthest and store in the state variable
    setSchoolData(
      data.schools.sort(
        (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
      )
    )
  }

  // Function that handles sorting our school data alphabetically
  const sortSchoolsAlphabetically = (data) => {
    setSchoolData(data.schools.sort((a, b) => (a.name[0] < b.name[0] ? -1 : 1)))
  }

  return (
    <div className={styles.mainContainer}>
      {/* Render a simple Nav component that includes the company name, icon, and some styles */}
      <Nav />
      <section className={styles.schoolSelectionContainer}>
        <h1>Pick Your School</h1>
        <section className={styles.schoolSelection}>
          {/* Render our search component that takes the handleSearch function as a prop. Includes some styles and the search icon */}
          <Search handleSearch={handleSearch} />
          {/* A span with styles used to create the shadow scrolling effect */}
          <span className={styles.shadowTop}></span>
          <div className={styles.schools}>
            {/* Below we map through schoolData and render our school component with each elements unique name and the state it's located in. We also assign each element a unique key using the id's provided in the API */}
            {/* If the user is currently searching, we instead map through our filtered array of schools */}
            {schoolData && searchField === ''
              ? schoolData.map((s) => (
                  <School key={s.id} name={s.name} state={s.state} />
                ))
              : filteredSchools.map((s) => (
                  <School key={s.id} name={s.name} state={s.state} />
                ))}
          </div>
        </section>
      </section>
    </div>
  )
}
