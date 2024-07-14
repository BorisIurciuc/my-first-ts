import { useEffect, useState } from "react";
import styles from "./weather.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IWeatherData } from "./types/weaterData";

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
  const [cityWeather, setCityWeather] = useState<IWeatherData | null>(null);
  const [isOutputVisible, setOutputisible] = useState<boolean>(false);
  const [isLoading, setIsLoaading] = useState<boolean>(false);
  const [iconImg, setIconImg] = useState<string>("");

  const formik = useFormik({
    initialValues: {
      nameCity: "",
    } as IInputCity,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values: IInputCity, {resetForm}) => {
      setIsLoaading(true);
      try {
        const key = "beefc2057d8d39b3414b9a094f53cbcc";

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${values.nameCity}&appid=${key}&units=metric`
        );
        if (res.ok) {
          const data = await res.json();
          setCityWeather(data);
          const iconName = data.weather[0].icon;
          setIconImg(`https://openweathermap.org/img/wn/${iconName}.png`);
          console.log("iconName", iconName);
        } else {
          alert("error res fetch weather date");
          setCityWeather(null);
        }
      } catch (error) {
        console.error("error fetch weather date", error);
        setCityWeather(null);
      }
      setOutputisible(true);
      setIsLoaading(false);
      resetForm()
    },
  });

  const deleteOutputWeather = () => {
    setCityWeather(null)
    setOutputisible(false);
  }
  
  useEffect(() => {}, [cityWeather]);

  console.log(iconImg);

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
          <p>{cityWeather?.main.temp}</p>
          <h3>{cityWeather?.name}</h3>

          {cityWeather?.weather.map((el) => (
            <div key={el.id}>
              <img src={iconImg} alt="iconImage" />
              <img src={iconImg} alt="iconImage" />
              <img src={iconImg} alt="iconImage" />
            </div>
          ))}
          <div className={styles.containerSaveDelete}>
            <button className={styles.btnSaveDelete}>Save</button>
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
