import { useContext } from 'react'
import { WeatherContext } from '../weatherContext/WeatherContext'
import styles from './weatherCities.module.css'


export default function WeatherCities() {

    const { savedCities } = useContext(WeatherContext)

  return (
    <div className={styles.container}>
        WeatherCities
        <div>
            {savedCities.map((el) => (
                <div className={styles.outputInfo} key={el.weather[0].id } >
                    <h3>{el.name}</h3>
                    <p>{el.main.temp}</p>
                </div>
            ))}
        </div>
    </div>
  )
}
