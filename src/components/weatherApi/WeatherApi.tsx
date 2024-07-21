import React, { useEffect, useState } from "react";
import styles from "./weather.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { thunkWeather, thunkIcon } from "../../features/weather/weatherAction";
import { resetWeather } from "../../features/weather/weatherSlice";
import { log } from "console";

interface IInputCity {
  nameCity: string;
}

const schema = Yup.object().shape({
  nameCity: Yup.string()
    .required("this field is required")
    .min(2, "min 2 symbols")
    .max(20, "maximum 20 symbols"),
});

export default function WeatherApi() {
  const { dataWeather, thunkIcon: iconUrl, isLoading } = useAppSelector(
    (store) => store.sliceWeather
  );
  const dispatch = useAppDispatch();
  const [isOutputVisible, setOutputVisible] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      nameCity: "",
    } as IInputCity,
    validationSchema: schema,
    validateOnChange: false,
    onSubmit: async (values: IInputCity, { resetForm }) => {
      setOutputVisible(true);
      await dispatch(thunkWeather(values.nameCity));
      resetForm();
    },
  });

  useEffect(() => {
    if (dataWeather.weather[0].icon) {
      dispatch(thunkIcon(dataWeather.weather[0].icon));
    }
  }, [dataWeather, dispatch]);

  console.log('dataWeather.weather[0].icon', dataWeather.weather[0].icon);
  console.log(thunkIcon);

  const deleteOutputWeather = () => {
    dispatch(resetWeather());
    setOutputVisible(false);
  };

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
        <button type="submit" className={styles.btnSearch}>
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
              <img src={iconUrl} alt="iconImage" />
            </div>
          ))}
          <div className={styles.containerSaveDelete}>
            <button
              type="button"
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
