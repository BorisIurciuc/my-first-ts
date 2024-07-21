import styles from './weatherCities.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCityWeather } from '../../features/weather/weatherSlice';

export default function WeatherCities() {
    const savedCities = useAppSelector((store) => store.sliceWeather.savedCities);
    const dispatch = useAppDispatch();

    const handleDeleteCityWeather = (cityId: number) => {
        dispatch(deleteCityWeather(cityId));
    };

    return (
        <div className={styles.container}>
        {savedCities.map((el) => (
            <div className={styles.outputInfo} key={el.weather[0].id}>
                <h3>{el.name}</h3>
                <p>{el.main.temp}</p>
                <div className={styles.containerSaveDelete}>
                    <button
                        type="button"
                        onClick={() => handleDeleteCityWeather(el.weather[0].id)}
                        className={styles.btnSaveDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}
        </div>
    );
}
