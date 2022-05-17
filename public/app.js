const dates = ['5/22/22', '5/12/22', '5/16/22', '5/13/22']
const today = new Date()


for (let date of dates) {
    if (today - date < 7) {
        console.log(date)
    }
}

console.log(new Date(new Date() - 604800000))