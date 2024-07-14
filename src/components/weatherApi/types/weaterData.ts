export interface IWeatherData {
    weather: 
    [
        {
            id: number;
            main: string;
            icon: string
        } 
    ]
    main: {
        temp: number;
    };
    name: string
  }