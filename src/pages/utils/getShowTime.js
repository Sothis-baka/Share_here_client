const getShowTime = (inputDate) => {
    const timeInS = (new Date().getTime() - inputDate) / 1000;
    let timeShowed;

    if(timeInS < 60){
        timeShowed = Math.floor(timeInS) + 's';
    }else if(timeInS < 3600){
        timeShowed = Math.floor(timeInS / 60) + 'm';
    }else if(timeInS < 86400){
        timeShowed = Math.floor(timeInS / 3600) + 'h';
    }else if(timeInS < 172800){
        timeShowed = 'yesterday'
    }else{
        timeShowed = new Date(Number(inputDate)).toLocaleDateString();
    }

    return timeShowed;
};

export default getShowTime;