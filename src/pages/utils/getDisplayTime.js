const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

const getDisplayTime = (time) => {
    if(!time){
        return null;
    }

    const date = new Date(Number(time));
    // millisecond to second
    const diff = Math.floor((new Date() - date) / 1000);

    if(diff <= 60){
        // less than 1 min
        return 'just now';
    }else if(diff <= 3600){
        // less than 1 hour
        return `${ Math.floor(diff/60) } min`;
    }else if(diff <= 86400){
        // less than 1 day
        return `${ Math.floor(diff/3600) } h`;
    }else if(diff <= 604800){
        // less than 1 week
        return days[date.getDay()];
    }else{
        // display full date
        return `${date.toLocaleDateString()}`;
    }
};

export default getDisplayTime;