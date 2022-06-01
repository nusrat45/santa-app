exports.getAgeFromBirthDate = (dateString) => {
    let splitDate = dateString.split('/')
    let birth_year = splitDate[0]
    let birth_day = splitDate[1]
    let birth_month = splitDate[2]

    today_date = new Date();
    today_year = today_date.getFullYear();
    today_month = today_date.getMonth();
    today_day = today_date.getDate();
    age = today_year - birth_year;

    if ( today_month < (birth_month - 1))
    {
        age--;
    }
    if (((birth_month - 1) == today_month) && (today_day < birth_day))
    {
        age--;
    }
    return age;
}