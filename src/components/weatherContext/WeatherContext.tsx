import React, { createContext, ReactNode, useState } from 'react'

interface IWeatherData {
    weather: {
        id: number;
        main: string;
        icon: string;
    }[];
    main: {
        temp: number;
    };
    name: string;
}

interface IWeatherContext {
    cityWeather: IWeatherData;
    savedCities: IWeatherData[];
    setCityWeather: React.Dispatch<React.SetStateAction<IWeatherData>>
    saveCityWeather: () => void;
}

interface IWeatherProviderProps {
    children: ReactNode
}

const initialContext: IWeatherContext = {
    cityWeather: {
        weather: [{ id: 0, main: '', icon: '' }],
        main: { temp: 0 },
        name: ''
    },
    savedCities: [],
    setCityWeather: () => {},
    saveCityWeather: () => {},
}

export const WeatherContext = createContext<IWeatherContext>(initialContext)

export function WeatherProvider({children}: IWeatherProviderProps) {

const [cityWeather, setCityWeather] = useState<IWeatherData>({
    weather: [{ id: 0, main: '', icon: '' }],
    main: { temp: 0 },
    name: '',
});

const [savedCities, setSavedCities] = useState<IWeatherData[]>([]);

const saveCityWeather = () => {
  setSavedCities((prev) => [...prev, cityWeather]);
};

    return (
        <WeatherContext.Provider value={{cityWeather, savedCities, setCityWeather, saveCityWeather }}>
            {children}
        </WeatherContext.Provider>
    )
}
