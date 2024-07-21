import styles from './weatherCities.module.css'
import { useAppSelector } from '../../app/hooks';


export default function WeatherCities() {

    const savedCities = useAppSelector(
        (store) => store.sliceWeather.savedCities
      );
    

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
