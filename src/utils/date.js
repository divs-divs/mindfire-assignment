import moment from 'moment';

export default { 


    todayDate(){
        var today = new Date().toLocaleDateString() 
        return today
    },

    todayDateFormatted() {
        var today = this.todayDate().split("/").reverse().join("-")
        return today
    },
    
    
    dateFromat () {
        return 'DD/MM/YYYY'
    },

    dateShowFormat () {
        return 'YYYY-MM-DD'
    },


    displayDate () {
        return 'MMM DD, YYYY'
    },

    timeAgo(prevDate) {
        var diff = Number(new Date()) - prevDate;
        var minute = 60 * 1000;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var year = day * 365;
        switch (true) {
            case diff < hour:
                return Math.round(diff / minute) + ' minutes ago';
            case diff < day:
                return Math.round(diff / hour) + ' hours ago';
            case diff < month:
                return Math.round(diff / day) + ' days ago';
            case diff < year:
                return moment(prevDate).format('MMM DD, YYYY');
            default:
                return "";
        }
    }
    
}
