import { useState } from "react";
import styles from "./weather.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { WeatherContext } from "../weatherContext/WeatherContext";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { thunkWeather } from "../../features/weather/weatherAction";
import { resetWeather } from "../../features/weather/weatherSlice";

interface IInputCity {
  nameCity: string;
}


const schema = Yup.object().shape({
  nameCity: Yup.string()
    .required("this field is required")
    .min(2, "min 2 symbpls")
    .max(20, "minimum 20 sympols"),
});

export default function WeatherApi() {
  const {dataWeather, isLoading} = useAppSelector(store => store.sliceWeather)
  const dispatch = useAppDispatch();
  const [isOutputVisible, setOutputisible] = useState<boolean>(false);
  const [iconImg, setIconImg] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      nameCity: "",
    } as IInputCity,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values: IInputCity, {resetForm}) => {
          const iconName = dataWeather.weather[0].icon;
          setIconImg(`https://openweathermap.org/img/wn/${iconName}.png`);
          console.log("iconName", iconName);
          console.log("iconImg", iconImg);
      setOutputisible(true);
      // setIsLoaading(false);
      await dispatch(thunkWeather(values.nameCity))
      resetForm()
    },
  });

  const deleteOutputWeather = () => {
    dispatch(resetWeather())
    setOutputisible(false);
  }
  
  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          name="nameCity"
          placeholder="city name"
          onChange={formik.handleChange}
          value={formik.values.nameCity}
        />
        <p>{formik.errors.nameCity}</p>
        <button 
          type="submit" 
          className={styles.btnSearch}>
          search
        </button>
      </form>

      {isLoading && <div className={styles.loader}></div>}
      
      {isOutputVisible && (
        <div className={styles.outputInfo}>
          <p>{dataWeather.main.temp}</p>
          <h3>{dataWeather.name}</h3>

          {dataWeather?.weather.map((el) => (
            <div key={el.id}>
              <img src={iconImg} alt="iconImage" />
            </div>
          ))}
          <div className={styles.containerSaveDelete}>
            {/* <button 
              type="submit"
              onClick={saveCityWeather}
              className={styles.btnSaveDelete}
            >Save
            </button> */}
            <button 
                type='button' 
                onClick={deleteOutputWeather}
                className={styles.btnSaveDelete}
              >
              Delete
              </button>
          </div>
        </div>
      )}

    </div>
  );
}

// http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png
//https://api.openweathermap.org/data/2.5/weather?q=London&appid=beefc2057d8d39b3414b9a094f53cbcc&units=metric